import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home').then(m => m.Home)
    },
    {
        path: 'components',
        loadChildren: () => import('./pages/components/components.routes').then(m => m.componentsRoutes)
    }
];
