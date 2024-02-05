import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FoobarComponent } from './foobar/foobar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FoobarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'validator-test';
}
