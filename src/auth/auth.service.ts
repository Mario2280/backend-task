import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Account } from 'src/user/models/user.model';
import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private readonly userRepository: Repository<Account>,
    private readonly jwtService: JwtService,
  ) {}

  async register({ email, password, username }) {
    const emailAlreadyExists = await this.userRepository.exist({
      where: { email, username },
    });
    if (emailAlreadyExists)
      throw new HttpException(
        'User with email or already exists',
        HttpStatus.CONFLICT,
      );

    const usernameAlreadyExists = await this.userRepository.exist({
      where: { username },
    });
    if (usernameAlreadyExists)
      throw new HttpException(
        'User with username already exists',
        HttpStatus.CONFLICT,
      );

    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);

    const user = this.userRepository.create({
      username,
      email,
      friends: [],
      listOfGoodDeeds: [],
      passwordHash,
    });
    await this.userRepository.save(user);

    return { email };
  }

  async login(email: string) {
    const access_token = await this.jwtService.signAsync(
      { email },
      { expiresIn: '2 days' },
    );
    return {
      access_token,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Неверный логин или пароль');
    }

    const isCorrectPassword = compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new Error('Неверный пароль');
    }

    return { email: user.email };
  }

  async getUser(JWTToken: string) {
    const isCorrectToken = this.jwtService.verify(JWTToken);
    const data: any = this.jwtService.decode(JWTToken);
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });
    return {
      user,
      isCorrectToken,
    };
  }
}
