import { validateSync } from 'class-validator';
import { FieldsErrors, IValidatorFields } from './validator-fields.interface';

export abstract class ClassValidatorFields<PropsValidated> implements IValidatorFields<PropsValidated>  {
  errors: FieldsErrors = null;
  validatedData: PropsValidated = null;

  validate (data: any): boolean {
    const errors = validateSync(data);

    if (errors.length) {
      this.errors = {};
      errors.forEach(error => {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints);
      });
      return false;
    }

    this.validatedData = data;
    return true;
  }
}
