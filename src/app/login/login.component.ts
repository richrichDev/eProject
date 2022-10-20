import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: boolean = false;
  loginForm!: FormGroup;

  constructor
  (
    private formBuilder: FormBuilder,
    public router: Router,
  ) 
  { 

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, Validators.required],
    });
  }

  login()
  {
    if (this.loginForm.valid) {
      this.error = false;
      let u = JSON.parse(localStorage.getItem("operator")!);
      if(this.loginForm.value.username == u.username && this.loginForm.value.password == u.password)  //login success
      {
        this.router.navigate(['/customers']);
      }
      else //login fail
      {
        alert("Wrong username or password");
      }
    }
    else
    {
      this.error = true;
    }
  }


}
