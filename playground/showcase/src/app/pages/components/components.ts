import { Component } from '@angular/core';
import { Breadcrumb, BreadcrumbItem } from '../../components/breadcrumb/breadcrumb';

@Component({
  selector: 'wally-components',
  imports: [Breadcrumb],
  templateUrl: './components.html',
  styleUrl: './components.css'
})
export class Components {
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Components' }
  ];
}
