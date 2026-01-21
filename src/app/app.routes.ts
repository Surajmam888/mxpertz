import { Routes } from '@angular/router';
import { StoriesListComponent } from './pages/stories-list/stories-list.component';
import { StoryDetailsComponent } from './pages/story-details/story-details.component';

export const routes: Routes = [
  { path: '', component: StoriesListComponent },
  { path: 'story/:id', component: StoryDetailsComponent }
];
