import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './button.component.html'
})
export class ButtonComponent {
    title = signal('Button Component');
    clickCount = signal(0);

    onClick() {
        this.clickCount.update(count => count + 1);
        console.log(`${this.title()} clicado ${this.clickCount()} vezes`);
    }
}