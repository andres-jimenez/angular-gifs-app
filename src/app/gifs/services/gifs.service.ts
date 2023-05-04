import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/search-response.interfaces';

const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs';
const GIPHY_API_KEY = 'obM986at7NXrFSTIDOLIjqe0RZcFiT9c';

@Injectable({ providedIn: 'root' })
export class GifsService {
  private _tagsHistory: string[] = [];

  public gifsList: Gif[] = [];

  constructor(private http: HttpClient) {
    this.loadHistoryFromLocalStorage();
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string): void {
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this.tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveHistoryToLocalStorage();
  }

  private saveHistoryToLocalStorage(): void {
    localStorage.setItem('tags-history', JSON.stringify(this._tagsHistory));
  }

  private loadHistoryFromLocalStorage(): void {
    const history = localStorage.getItem('tags-history');

    if (!history) return;

    this._tagsHistory = JSON.parse(history);

    if (this._tagsHistory.length < 1) return;

    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag: string): void {
    if (tag.length < 1) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', GIPHY_API_KEY)
      .set('q', tag)
      .set('limit', 10);

    this.http
      .get<SearchResponse>(`${GIPHY_API_URL}/search`, { params })
      .subscribe((response) => {
        this.gifsList = response.data;
      });
  }
}
