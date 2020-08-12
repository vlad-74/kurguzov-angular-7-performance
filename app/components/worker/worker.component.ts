import {Component} from '@angular/core';
import { WebworkerService } from './webworker.service';
import { FIBONACCI_SCRIPT } from './fibonacci.script';

@Component({
  selector: 'app-second',
  templateUrl: './worker.component.html',
})

export class WorkerComponent  {

  constructor(private workerService: WebworkerService) {}

  public itog = 45;
  itogWithWorker: number;
  timeWithWorker: number;
  itogWithoutWorker: number;
  timeWithoutWorker: number;

  ngOnInit() { }

  calcFibWithWorker(){
    this.itogWithWorker = null;
    this.timeWithWorker = null; 
    const input = {
      host: window.location.host,
      itog: this.itog,
      path: window.location.pathname,
      protocol: window.location.protocol,
      worker: true
    };
    
    this.workerService.run(FIBONACCI_SCRIPT, input)
      .then( (result) => {
        this.itogWithWorker = result.res;
        this.timeWithWorker = result.time; 
      })
      .catch(console.error);
  }

  calcFibWithoutWorker(){
    this.itogWithoutWorker = null
    this.timeWithoutWorker = null
     const input = {
      host: window.location.host,
      itog: this.itog,
      path: window.location.pathname,
      protocol: window.location.protocol,
      worker: false
    };

    const result = FIBONACCI_SCRIPT(input);

    this.itogWithoutWorker = result.res
    this.timeWithoutWorker = result.time
  }
 
}