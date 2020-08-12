import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})

export class MainComponent {
  config = {position: 'top'};
  items = [];
  items$ = new BehaviorSubject(this.items);

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.config.position = 'bottom'; // 1 вариант НЕ СРАБОТАЕТ при ChangeDetectionStrategy.OnPush в дочернем компоненте
  }

  onClickPush(){
    this.config = {position: 'left'} // 2 вариант СРАБОТАЕТ при ChangeDetectionStrategy.OnPush в дочернем компоненте
  }

  addAsync() {
    this.items.push({ title: Math.random() })
    this.items$.next(this.items);
  }
}