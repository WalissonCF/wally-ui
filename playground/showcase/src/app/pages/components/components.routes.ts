import { Routes } from '@angular/router';

export const componentsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components').then(m => m.Components)
    },
    {
        path: 'button',
        loadComponent: () => import('./button/button').then(m => m.ButtonDocs)
    }
];
