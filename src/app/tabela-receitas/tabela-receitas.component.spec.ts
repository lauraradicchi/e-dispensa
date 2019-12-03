import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaReceitasComponent } from './tabela-receitas.component';

describe('TabelaReceitasComponent', () => {
  let component: TabelaReceitasComponent;
  let fixture: ComponentFixture<TabelaReceitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaReceitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaReceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
