import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home').then(m => m.Home)
    },
    {
        path: 'documentation',
        loadChildren: () => import('./pages/documentation/documentation.routes').then(m => m.documentationRoutes)
    },
    {
        path: 'components',
        redirectTo: '/documentation/components'
    },
    {
        path: 'mcp',
        loadComponent: () => import('./pages/mcp/mcp').then(m => m.MCP)
    }
];
