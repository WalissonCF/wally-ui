import { Component } from '@angular/core';

import { Breadcrumb, BreadcrumbItem } from '../../components/breadcrumb/breadcrumb';

@Component({
  selector: 'wally-mcp',
  imports: [Breadcrumb],
  templateUrl: './mcp.html',
  styleUrl: './mcp.css'
})
export class MCP {
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'MCP Server' }
  ];
}
