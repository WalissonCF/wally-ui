import { Component, signal, WritableSignal } from '@angular/core';

import { Breadcrumb, BreadcrumbItem } from '../../../components/breadcrumb/breadcrumb';
import { Button } from '../../../components/button/button';

@Component({
  selector: 'app-button-docs',
  imports: [
    Button,
    Breadcrumb
  ],
  templateUrl: './button-docs.html',
  styleUrl: './button-docs.css'
})
export class ButtonDocs {
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Components', url: '/components' },
    { label: 'Button' }
  ];

  clickMessage: WritableSignal<string> = signal<string>('');

  handleClick(): void {
    this.clickMessage.set('Button clicked!');
  }
}
