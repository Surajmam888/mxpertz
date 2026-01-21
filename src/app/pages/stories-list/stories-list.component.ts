import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { StoryService } from '../../api/story.service';
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
  standalone: true,
  selector: 'app-stories-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
],
  templateUrl: './stories-list.component.html',
  styleUrls: ['./stories-list.component.css']
})
export class StoriesListComponent implements OnInit {

  stories: any[] = [];
  filteredStories: any[] = [];

  activeFilter: string = 'ALL';

  constructor(
    private storyService: StoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storyService.getStories().subscribe({
      next: (res) => {
        this.stories = res;
        this.filteredStories = res; // show all initially
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });
  }

  openStory(id: string) {
    this.router.navigate(['/story', id]);
  }

  filterStories(status: string) {
    this.activeFilter = status;
    this.filteredStories = this.stories.filter(
      story => story?.Status === status
    );
  }

  clearFilter() {
    this.activeFilter = 'ALL';
    this.filteredStories = this.stories;
  }

  getImage(story: any): string {
    return story?.Image?.length
      ? `https://ik.imagekit.io/dev24/${story.Image[0]}`
      : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  }
}
