import { Component } from '@angular/core';

import { Breadcrumb, BreadcrumbItem } from '../../../components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-breadcrumb-docs',
  imports: [
    Breadcrumb
  ],
  templateUrl: './breadcrumb-docs.html',
  styleUrl: './breadcrumb-docs.css'
})
export class BreadcrumbDocs {
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Components', url: '/components' },
    { label: 'Breadcrumb' }
  ];

  exampleBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Components', url: '/components' },
    { label: 'Breadcrumb' }
  ];

  simpleBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Components' }
  ];
}