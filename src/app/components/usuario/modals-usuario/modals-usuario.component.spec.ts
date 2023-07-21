import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsUsuarioComponent } from './modals-usuario.component';

describe('ModalsUsuarioComponent', () => {
  let component: ModalsUsuarioComponent;
  let fixture: ComponentFixture<ModalsUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalsUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalsUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
