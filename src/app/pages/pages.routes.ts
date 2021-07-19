import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ProductoComponent } from './producto/producto.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { ProveedorComponent } from './proveedor/proveedor.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            // { path: 'inicio', component: HomeComponent },
            { path: 'productos', component: ProductoComponent },
            { path: 'categoria', component: CategoriaComponent },
            { path: 'subcategoria', component: SubcategoriaComponent },
            { path: 'proveedor', component: ProveedorComponent },
            { path: '', redirectTo: '/login', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
