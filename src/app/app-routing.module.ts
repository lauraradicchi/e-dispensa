
import { Routes, RouterModule } from '@angular/router';
import{ ReceitasComponent } from './receitas/receitas.component';
import{ HomeComponent} from './home/home.component';


const appRoutes: Routes = [
  {path: '',component:HomeComponent, pathMatch:'full'},
  {path:'receita',component:ReceitasComponent, pathMatch:'full'}
];
export const routes = RouterModule.forRoot(appRoutes, { useHash: true });

