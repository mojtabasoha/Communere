import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/pages/home.component').then((m) => m.HomeComponent),
  },
];
