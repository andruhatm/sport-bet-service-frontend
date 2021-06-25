import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  templateUrl: './personal-cabinet.page.html',
  styleUrls: ['./personal-cabinet.page.css']
})

export class PersonalCabinetPage implements OnInit {
  constructor(
    private readonly title: Title
  ) {
    this.title.setTitle('Личный кабинет');
  }

  ngOnInit(): void {}

}
