import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceTsService } from './services/auth.service.ts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'game-nation-x';

  constructor (
    public _loginDialog: MatDialog,
    public authService: AuthServiceTsService
  ){

  }

  ngOnInit(): void {

  }
}
