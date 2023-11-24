import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {Item} from "./item/Item";
import {ItemComponent} from "./item/item.component";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzInputModule,
    NzButtonModule,
    NzButtonModule,
    ItemComponent,
    NzSpaceModule,
    NzRadioModule,
    FormsModule],
  template: `
  <div class="container">
      <h1>My To Do List</h1>
      <label for="input">What would you like to do today?</label>
        <nz-space nzAlign="center" nzSize="large">
          <input
            nz-input
            nzSize="large"
            id="input"
            #input
            placeholder="add new task"
            (keyup.enter)="addItems(input.value); input.value = '' "
          >
          <button
            nz-button
            nzSize="large"
            nzType="primary"
            (click)="addItems(input.value); input.value=''"
          >Add</button>
        </nz-space>
        <nz-radio-group [(ngModel)]="filter">
          <label nz-radio-button nzValue="all"><span>All</span></label>
          <label nz-radio-button nzValue="active"><span>Active</span></label>
          <label nz-radio-button nzValue="done"><span>Done</span></label>
        </nz-radio-group>

      <h2>
        {{items.length}}
        <span *ngIf="items.length === 1; else elseBlock">item</span>
        <ng-template #elseBlock >items</ng-template>
      </h2>
        <ul>
          <li *ngFor="let i of items">
            <app-item (remove)="remove(i)" [item]="i" ></app-item>
          </li>
        </ul>
  </div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Todos'

  filter: 'all' | 'active' | 'done' = 'all'

  allItems = [
    { description: "eat", done: true },
    { description: "sleep", done: false },
    { description: "play", done: false },
    { description: "laugh", done: false },
  ];

  get items (){
    if(this.filter === 'all'){
      return this.allItems
    }
    return this.allItems.filter(item =>
      this.filter === 'done' ? item.done : !item.done)
  }

  addItems (description : string) {
    if(description !== ''){
      this.allItems.unshift({description, done: false})
    }
  }

  remove(item: Item){
    this.allItems.splice(this.allItems.indexOf(item), 1)
  }

}
