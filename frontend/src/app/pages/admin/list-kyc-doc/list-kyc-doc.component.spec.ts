import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListKycDocComponent } from './list-kyc-doc.component';

describe('ListKycDocComponent', () => {
  let component: ListKycDocComponent;
  let fixture: ComponentFixture<ListKycDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListKycDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListKycDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
