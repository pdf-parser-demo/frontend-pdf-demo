import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DataPreviewComponent } from './pages/data-preview/data-preview.component';

export const routes: Routes = [
    {path:'home', component: HomeComponent, pathMatch: 'full'},
    {path:'preview', component: DataPreviewComponent, pathMatch: 'full'},
    {path:'**', component: HomeComponent, pathMatch: 'full'}
];
