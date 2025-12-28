import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboboxDocsComponent } from './combobox-docs.component';

describe('ComboboxDocsComponent', () => {
  let component: ComboboxDocsComponent;
  let fixture: ComponentFixture<ComboboxDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboboxDocsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComboboxDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
