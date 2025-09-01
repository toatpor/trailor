import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// This is the constraint class that contains the actual validation logic.
@ValidatorConstraint({ name: 'NotGreater' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, _args: ValidationArguments) {
    if (String(value).length < 4) return false;
    // const [relatedPropertyName] = args.constraints;
    // const relatedValue = (args.object as any)[relatedPropertyName];
    return new Date().getFullYear() - value >= 18;
  }

  defaultMessage(_args: ValidationArguments) {
    // const [relatedPropertyName] = args.constraints;
    return `age should greater or equal 18`;
  }
}

// This is the decorator function that you will use in your DTOs.
export function NotGreater(
  // property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [], // The property to compare against (e.g., 'password')
      validator: MatchConstraint,
    });
  };
}
