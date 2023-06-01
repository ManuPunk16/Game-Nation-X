import { Component, OnInit } from '@angular/core';
import { AuthServiceTsService } from 'src/app/services/auth.service.ts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor (public authService: AuthServiceTsService,) {

  }

  ngOnInit(): void {

  }

}
