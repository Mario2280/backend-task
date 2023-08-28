import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsPostgresBigInt', async: false })
export class IsPostgresBigInt implements ValidatorConstraintInterface {
  validate(num: number) {
    return !(
      BigInt(num) > BigInt('9223372036854775807') ||
      BigInt(num) < BigInt('-9223372036854775808')
    );
  }
  defaultMessage(args: ValidationArguments) {
    return `${(args.object as any).id} or ${
      (args.object as any).friendId
    } is out of range!`;
  }
}
