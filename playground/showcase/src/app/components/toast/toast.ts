import { Component } from '@angular/core';

import { ToastContainer } from './toast-container/toast-container';

@Component({
  selector: 'wally-toast',
  imports: [ToastContainer],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
  // standalone: true, (If your application is lower than Angular 19, uncomment this line)
})
export class Toast {
}
