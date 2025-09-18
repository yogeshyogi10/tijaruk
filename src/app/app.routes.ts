import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Service } from './pages/service/service';
import { Contact } from './pages/contact/contact';
import { Servicedetail } from './pages/servicedetail/servicedetail';

export const routes: Routes = [
    {path:'', component: Home},
    {path:'about', component: About},
    {path:'services', component:Service},
    {path:'services/import-export',component:Service},
    {path:'services/business-setup',component:Service},
    {path:'services/enterpreneur',component:Service},
    {path:'services/branding',component:Service},
    {path:'services/automation',component:Service},
    {path:'services/global-marketing',component:Service},
    {path:'contact', component:Contact}
];
