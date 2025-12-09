import { Page, Locator, expect } from '@playwright/test';

export class Results {
  readonly page: Page;
  readonly resultsList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.resultsList = page.locator('[data-tag="journey-list-cards"]');
  }

  async waitForResults() {
    await expect(this.resultsList).toBeVisible();
    await this.page
      .locator('[data-tag="connection-card"]')
      .first()
      .waitFor({ state: 'visible', timeout: 15000 })
      .catch(() => {
        // it's ok if no results are found - empty results is valid
      });
  }

  async waitForResultsToStabilize() {
    await expect(this.resultsList).toBeVisible();
    await this.page
      .locator('[data-tag="connection-card"]')
      .first()
      .waitFor({ state: 'visible', timeout: 15000 })
      .catch(() => {
        // same - it's ok if no results are found - empty results is valid
      });
    let previousCount = 0;
    let stableCount = 0;
    while (stableCount < 2) {
      await this.page.waitForLoadState('networkidle');
      const currentCount = await this.page
        .locator('[data-tag="connection-card"]')
        .count();
      if (currentCount === previousCount) {
        stableCount++;
      } else {
        stableCount = 0;
        previousCount = currentCount;
      }
    }
  }

  async selectFirstTicket() {
    const firstTicket = this.page
      .locator('[data-tag="connection-card"]')
      .first();
    await firstTicket.locator('[data-tag="footer-price-button"]').click();
  }
}

// TODO add nadler in case of time frame selected, check unique ids correspond filter
