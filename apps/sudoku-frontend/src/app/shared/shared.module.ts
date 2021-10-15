import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './components/demo/demo.component';
import { DemoDirective } from './directives/demo.directive';
import { DemoPipe } from './pipes/demo.pipe';

@NgModule({
  declarations: [
    DemoComponent,
    DemoDirective,
    DemoPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
