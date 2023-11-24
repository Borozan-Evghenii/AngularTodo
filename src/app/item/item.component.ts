import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule } from '@angular/common';
import {NzWaveModule} from "ng-zorro-antd/core/wave";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {Item} from "./Item";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, NzWaveModule, NzButtonModule, NzIconModule, NzSpaceModule, NzCheckboxModule],
  template: `
    <div class="item">
        <label
          nz-checkbox
          [nzChecked]="item.done"
          (change)="item.done = !item.done"
        >{{item.description}}</label>

      <div
        nz-space
        nzAlign="center"
        *ngIf="!editable"
      >
        <button
          *nzSpaceItem
          nz-button
          nzType="primary"
          (click)="editable = !editable"
        >
          <span nz-icon nzType="edit" nzTheme="outline"></span>
        </button>
        <button
          *nzSpaceItem
          nz-button
          nzType="default"
          (click)="remove.emit()"
        >
          <span nz-icon nzType="delete" nzTheme="outline"></span>
        </button>
      </div>

      <div *ngIf="editable">
        <input
            placeholder="edit item"
            #editValue
            [value]="item.description"
            (keyup.enter)="saveItem(editValue.value)"
        />
        <nz-space>
          <button *nzSpaceItem nz-button nzType="primary" (click)="editable = !editable" >
            Cancel
          </button>
          <button *nzSpaceItem nz-button nzType="default" (click)="saveItem(editValue.value)">
            Save
          </button>
        </nz-space>
      </div>
    </div>
  `,
  styles: `.item{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
`
})
export class ItemComponent {
  editable = false
  @Input({required: true}) item!: Item
  @Output() remove = new EventEmitter<Item>()

  saveItem(description: string) {
    if(!description) return
    this.editable = false
    this.item.description = description
  }
}
