import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDialogueBoxComponent } from './update-dialogue-box.component';

describe('UpdateDialogueBoxComponent', () => {
  let component: UpdateDialogueBoxComponent;
  let fixture: ComponentFixture<UpdateDialogueBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDialogueBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDialogueBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
