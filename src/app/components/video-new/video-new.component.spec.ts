import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoNewComponent } from './video-new.component';

describe('VideoNewComponent', () => {
  let component: VideoNewComponent;
  let fixture: ComponentFixture<VideoNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoNewComponent]
    });
    fixture = TestBed.createComponent(VideoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
