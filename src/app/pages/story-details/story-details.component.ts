import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { StoryService } from '../../api/story.service';

@Component({
  selector: 'app-story-details',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule
  ],
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.css']
})
export class StoryDetailsComponent implements OnInit {

  story: any;

  constructor(
    private route: ActivatedRoute,
    private storyService: StoryService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.storyService.getStoryById(id).subscribe(res => {
      // API sometimes returns array
      this.story = Array.isArray(res) ? res[0] : res;
    });
  }

  getImage(img: string): string {
    return `https://ik.imagekit.io/dev24/${img}`;
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/no-image.png';
  }
}
