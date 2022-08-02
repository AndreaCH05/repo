import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl | any) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if(checkControl !== null  ){
          
          if (checkControl.errors && !checkControl.errors?.['matching']) {
              return null;
            }
            
            if (control?.value !== checkControl.value && controls !== null) {
                controls.get(checkControlName).setErrors({ matching: true });
                return { matching: true };
            } else {
                return null;
            }

        }
            else {
                return null;
            }
    };
  }
}
