import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';

interface UpdateUserDto {
  email?: string;
  username?: string;
  password?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async removeAccount(userId: number) {
    await this.userRepository.query(
      `update account set friends = array_remove(friends, $1)`,
      [userId],
    );
    await this.userRepository.delete({ id: userId });
  }
  async updateUser(id: number, props: UpdateUserDto) {
    const condidate = await this.userRepository.findOne({ where: { id } });
    if (!condidate) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (props.email) {
      const emailAlreadyTaken = await this.userRepository.exist({
        where: { email: props.email },
      });
      if (emailAlreadyTaken)
        throw new HttpException(
          'User with email already exists',
          HttpStatus.CONFLICT,
        );
      condidate.email = props.email;
    }
    if (props.username) {
      const nameAlreadyTaken = await this.userRepository.exist({
        where: { username: props.username },
      });
      if (nameAlreadyTaken)
        throw new HttpException(
          'User with username already exists',
          HttpStatus.CONFLICT,
        );
      condidate.username = props.username;
    }
    if (props.password) {
      const salt = await genSalt(10);
      const passwordHash = await hash(props.password, salt);
      condidate.passwordHash = passwordHash;
    }
    await this.userRepository.save(condidate);
  }

  async removeFriend(id: number, friendId: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    user.friends = user.friends.filter((id) => id != friendId);
    await this.userRepository.save(user);
  }
  async addFriend(id: number, friendId: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    user.friends.push(friendId);
    await this.userRepository.save(user);
  }
}
