import { Page } from '@playwright/test';
import { SearchBar } from '../components/SearchBar';

export class HomePage {
  readonly page: Page;
  readonly searchBar: SearchBar;

  constructor(page: Page) {
    this.page = page;
    this.searchBar = new SearchBar(page);
  }

  async goto() {
    await this.page.goto('/');
  }
}
