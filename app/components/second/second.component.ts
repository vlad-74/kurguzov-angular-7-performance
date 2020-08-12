import {Component, OnInit, NgZone, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
})

export class SecondComponent  {
  progress: number = 0;
  label: string;

  constructor(private _ngZone: NgZone) {}

  // Цикл внутри Angular зоны
  // поэтому UI - progress -  обновляется после каждого цикла setTimeout
  processWithinAngularZone() {
    this.label = 'inside';
    this.progress = 0;
    this._increaseProgress(() => console.log('Inside Done!'));
  }

  // Цикл за пределами Angular зоны
   // поэтому UI - progress - НЕ обновляется после каждого цикла setTimeout
  processOutsideOfAngularZone() {
    this.label = 'outside';
    this.progress = 0;
    this._ngZone.runOutsideAngular(() => {
      this._increaseProgress(() => {
        // повторно входим в зону Angular и отображение done И progress 100%
        this._ngZone.run(() => { console.log('Outside Done!'); });
      });
    });
  }

  _increaseProgress(doneCallback: () => void) {
    this.progress += 1;
    // console - всегда показывает
    console.log(`Current progress: ${this.progress}%`);

    if (this.progress < 100) {
      window.setTimeout(
        () => this._increaseProgress(doneCallback) // НЕ ВИДНО В processOutsideOfAngularZone 
      , 10);
    } else {
      doneCallback();
    }
  }
}

