import { Component } from '@angular/core';
import { Carousel } from '../../components/carousel/carousel';

@Component({
  selector: 'wally-home',
  imports: [Carousel],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}
