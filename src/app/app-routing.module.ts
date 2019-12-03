
import { Routes, RouterModule } from '@angular/router';
import{ ReceitasComponent } from './receitas/receitas.component';
import{ HomeComponent} from './home/home.component';
import { TabelaReceitasComponent } from './tabela-receitas/tabela-receitas.component';


const appRoutes: Routes = [
  {path: '',component:HomeComponent, pathMatch:'full'},
  {path:'receita',component:ReceitasComponent, pathMatch:'full'},
  {path:'receita/tabelaReceitas', component:TabelaReceitasComponent, pathMatch:'full'}
];
export const routes = RouterModule.forRoot(appRoutes, { useHash: true });

