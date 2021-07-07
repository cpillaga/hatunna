import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { FormaPagoComponent } from './forma-pago/forma-pago.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            // { path: 'inicio', component: HomeComponent },
            { path: 'empresa', component: EmpresaComponent },
            { path: 'presentacion', component: PresentacionComponent },
            { path: 'formaPago', component: FormaPagoComponent },
            { path: '', redirectTo: '/login', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
