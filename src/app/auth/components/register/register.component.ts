import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  private readonly USERNAME_PATTERN = '^(?=[a-zA-Z0-9._]{4,30}$)(?!.*[_.]{2})[^_.].*[^_.]$';
  private readonly PASSWORD_PATTERN = '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}';

  registerForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern(this.USERNAME_PATTERN)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern(this.PASSWORD_PATTERN)]]
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  get f() { return this.registerForm.controls; }

  register() {
    this.authService.register(
      {
        username: this.f.username.value,
        email: this.f.email.value,
        password: this.f.password.value
      }
    )
    .subscribe(success => {
      if (success) {
        this.router.navigate(['/login']);
      }
    });
  }

}
