import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AbstractControlOptions, FormsModule, ValidationErrors, Validators } from '@angular/forms';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-foobar',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './foobar.component.html',
  styleUrl: './foobar.component.css'
})
export class FoobarComponent {
  foodForm = new FormGroup({
    favoriteFood: new FormControl('', [Validators.required, this.favoriteFoodValidator]),
    kindOfFood: new FormControl('', Validators.required),
  }, { validators: this.customValidator } as AbstractControlOptions);

  constructor() {
    let favoriteFoodControl = this.foodForm.get('favoriteFood');
    let kindOfFoodControl = this.foodForm.get('kindOfFood');

    if (favoriteFoodControl && kindOfFoodControl) {
      favoriteFoodControl.valueChanges.subscribe((value) => {
        if (kindOfFoodControl!.value !== '') {
          kindOfFoodControl!.setValue('');
        }

        if (value === 'pizza') {
          this.foodForm.get('kindOfFood')!.setValue('pepperoni');
        }
      });
    }
  }

  favoriteFoodValidator(control: FormControl): ValidationErrors | null {
    if (control.value === 'pizza') {
      return null;
    }

    return { invalidFavoriteFood: true };
  }

  customValidator(group: FormGroup): ValidationErrors | null {
    const favoriteFoodControl = group.get('favoriteFood');
    const kindOfFoodControl = group.get('kindOfFood');
    if (favoriteFoodControl && kindOfFoodControl) {
      if (favoriteFoodControl.value === 'pizza' &&
        kindOfFoodControl.value === 'pepperoni') {
        return null;
      }
    }

    return { invalidKindOfFood: true };
  }

  validateForm() {
    console.log(this.foodForm.valid);
  }
}
