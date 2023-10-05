import { faker } from '@faker-js/faker';
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator";
import { ClassValidatorFields } from "../../class-validator-fields";

type StubProps = {
  name: string;
  price: number;
};

class StubRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;

  constructor (data: StubProps) {
    Object.assign(this, data);
  }
}

class StubClassValidatorFields extends ClassValidatorFields<StubRules> {
  validate (data: any): boolean {
    return super.validate(new StubRules(data));
  }
}

describe('ClassValidatorFields integration tests', () => {
  it('should validate with errors', () => {
    const validator = new StubClassValidatorFields();

    expect(validator.validate(null)).toBeFalsy();
    expect(validator.errors).toStrictEqual({
      name: [
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters'
      ],
      price: [
        'price must not be less than 0',
        'price should not be empty',
        'price must be a number conforming to the specified constraints'
      ]
    });
  });

  it('should validate without errors', () => {
    const validator = new StubClassValidatorFields();
    const data = new StubRules({
      name: faker.person.fullName(),
      price: faker.number.int({ min: 0 }),
    });

    expect(validator.validate(data)).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(data);
    expect(validator.errors).toBeNull();
  });

  it('should validate with error price must not be less than 0 ', () => {
    const validator = new StubClassValidatorFields();
    const data = new StubRules({
      name: faker.person.fullName(),
      price: faker.number.int({ min: -999, max: -1 }),
    });

    expect(validator.validate(data)).toBeFalsy();
    expect(validator.validatedData).toBeNull();
    expect(validator.errors).toStrictEqual({
      price: [
        'price must not be less than 0',
      ]
    });
  });
});
