import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

import { Breadcrumb, BreadcrumbItem } from '../../components/breadcrumb/breadcrumb';

@Component({
  selector: 'wally-documentation',
  imports: [
    Breadcrumb,
    RouterModule
  ],
  templateUrl: './documentation.html',
  styleUrl: './documentation.css'
})
export class Documentation {
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Documentation' }
  ];
}