import { Component, input, InputSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'wally-breadcrumb',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './breadcrumb.html',
})
export class Breadcrumb {
  items: InputSignal<BreadcrumbItem[]> = input<BreadcrumbItem[]>([]);
}