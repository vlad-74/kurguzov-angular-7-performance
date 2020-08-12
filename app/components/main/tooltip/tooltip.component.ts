import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TooltipComponent implements OnInit, OnDestroy {
  @Input() items: Observable<any[]>;
  @Input() config;

  count = 0;

  get runChangeDetection() {
    console.log('Checking the view ' + this.count++);
    return 'Checking the view ' + this.count;
  }

  _items: any[];

  constructor(private cdr: ChangeDetectorRef) {
    setTimeout(() => {
      this.count = 99
      this.cdr.detectChanges();
      /*
        detectChanges() говорит Angular запустить обнаружение изменений в компоненте и его потомках.
        СРАБОТАЕТ runChangeDetection
      */
    }, 2000);
  }

  ngOnInit() {
    this.items.subscribe(items => {this._items = items; this.cdr.detectChanges();});
    /* 
    ИЛИ без this.items.subscribe но с | async в HTML 
    <div *ngFor="let item of items | async">async - {{item.title}}</div>
    */
  } 

  add() { console.log('this.count++;') } 
  /*
  Когда мы жмем на кнопку, Angular запускает цикл обнаружения изменений и представление обновляется, как и ожидалось.
  Правило применяется только к событиям DOM 
  Aсинхронные операциии НЕ БУДУТ ТРИГГЕРОМ для обновления
  */

  ngOnDestroy() { this.cdr.detach();  }

}