import * as libClassValidator from 'class-validator';
import { ClassValidatorFields } from "../../class-validator-fields";

type StubProps = {
  field: string
}

class StubClassValidatorFields extends ClassValidatorFields<StubProps> { }

describe('ClassValidatorFields unit tests', () => {
  it('should initialize errors and validatedData variables with null', () => {
    const sut = new StubClassValidatorFields();

    expect(sut.errors).toBeNull();
    expect(sut.validatedData).toBeNull();
  });

  it('should validate with errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync');
    spyValidateSync.mockReturnValue([
      { property: 'field', constraints: { isRequired: 'test error' } },
    ]);
    const sut = new StubClassValidatorFields();

    expect(sut.validate(null)).toBeFalsy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(sut.validatedData).toBeNull();
    expect(sut.errors).toStrictEqual({ field: ['test error'] });
  });

  it('should validate without errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync');
    spyValidateSync.mockReturnValue([]);
    const data = { field: 'value' };
    const sut = new StubClassValidatorFields();

    expect(sut.validate(data)).toBeTruthy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(sut.validatedData).toStrictEqual(data);
    expect(sut.errors).toBeNull();
  });
});
