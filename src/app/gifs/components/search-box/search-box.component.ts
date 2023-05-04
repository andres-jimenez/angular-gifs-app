import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <input
      class="form-control"
      type="text"
      placeholder="Buscar GIFs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    />
  `,
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  searchTag(): void {
    const tag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(tag);
    this.tagInput.nativeElement.value = '';
  }
}
