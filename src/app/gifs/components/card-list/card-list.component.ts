import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/search-response.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent {
  @Input()
  public gifsList: Gif[] = [];
}
