import { Routes } from '@angular/router';

export const componentsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components').then(m => m.Components)
    },
    {
        path: 'button',
        loadComponent: () => import('./button/button-docs').then(m => m.ButtonDocs)
    },
    {
        path: 'breadcrumb',
        loadComponent: () => import('./breadcrumb/breadcrumb-docs').then(m => m.BreadcrumbDocs)
    }
];
