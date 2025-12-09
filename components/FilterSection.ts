import { Page, Locator } from '@playwright/test';

export class FilterSection {
  readonly page: Page;
  readonly directOnly: Locator;
  readonly dawn: Locator;
  readonly morning: Locator;
  readonly afternoon: Locator;
  readonly night: Locator;
  readonly clearButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.directOnly = page.locator('input[type="checkbox"][data-tag="checkbox-directOnly"]');
    this.dawn = page.locator('input[type="checkbox"][data-tag="checkbox-dawn"]');
    this.morning = page.locator('input[type="checkbox"][data-tag="checkbox-morning"]');
    this.afternoon = page.locator('input[type="checkbox"][data-tag="checkbox-afternoon"]');
    this.night = page.locator('input[type="checkbox"][data-tag="checkbox-night"]');
    this.clearButton = page.locator(
      '.connection-filters__section button:has-text("Clear filters")'
    ); // same issue, data-tag is needed
  }

  async selectDepartureStation(stationName: string) {
    await this.page.locator(`label:has-text("${stationName}") input[type="checkbox"]`).check();
  }

  async selectArrivalStation(stationName: string) {
    await this.page.locator(`label:has-text("${stationName}") input[type="checkbox"]`).check();
  }

  async clearFilters() {
    await this.clearButton.click();
  }
}
