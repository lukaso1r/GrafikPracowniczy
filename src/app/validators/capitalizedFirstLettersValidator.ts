import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function capitalizedFirstLettersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const tekst = control.value as string;

    let errorMessage: string = '';

    // Check if tekst is a non-null string before accessing its properties
    if (typeof tekst === 'string' && tekst.length > 0) {
      if (tekst[0] !== tekst[0].toUpperCase()) {
        errorMessage = 'Słowa powinny rozpoczynać się wielkimi literami, a reszta liter powinna być mała.';
      } else {
        for (let i = 1; i < tekst.length; i++) {
          if (tekst[i - 1] === ' ') {
            if (tekst[i] !== tekst[i].toUpperCase()) {
              errorMessage = 'Słowa powinny rozpoczynać się wielkimi literami, a reszta liter powinna być mała.';
            }
          } else {
            if (tekst[i] !== tekst[i].toLowerCase()) {
              errorMessage = 'Słowa powinny rozpoczynać się wielkimi literami, a reszta liter powinna być mała.';
            }
          }
        }
      }
    }

    return errorMessage ? { capitalizedFirstLettersError: errorMessage } : null;
  };
}
