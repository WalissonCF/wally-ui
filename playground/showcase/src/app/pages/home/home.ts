import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

import { AiChat } from '../../components/ai/ai-chat/ai-chat';

@Component({
  selector: 'wally-home',
  imports: [RouterModule, AiChat],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}
