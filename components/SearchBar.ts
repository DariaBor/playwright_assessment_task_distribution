import { Page, Locator } from '@playwright/test';

export class SearchBar {
  readonly page: Page;
  readonly fromDropdown: Locator;
  readonly toDropdown: Locator;
  readonly oneWayRadio: Locator;
  readonly returnRadio: Locator;
  readonly departureDate: Locator;
  readonly returnDate: Locator;
  readonly searchButton: Locator;
  readonly passengerDropdown: Locator;
  readonly autocomplete: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fromDropdown = page.locator('[data-tag="departure"]');
    this.toDropdown = page.locator('[data-tag="arrival"]');
    this.autocomplete = page.locator('[data-tag="autocomplete-option"]');
    this.oneWayRadio = page.locator('[data-tag="ui-radio-oneWay"]');
    this.returnRadio = page.locator('[data-tag="ui-radio-return"]');
    this.departureDate = page
      .locator('[data-tag="date-picker-input"]')
      .filter({ has: page.getByText('Departure date') });
    this.returnDate = page
      .locator('[data-tag="date-picker-input"]')
      .filter({ has: page.getByText('Return date') });
    this.searchButton = page.locator(
      '.search-form__submit-button button[type="submit"]'
    ); // not perfect, data-tag attribute is needed
    this.passengerDropdown = page.locator('[data-tag="passenger-dropdown"]');
  }

  async search(from: string, to: string, date: string, isReturn = false) {
    await this.selectLocation(this.fromDropdown, from);
    await this.selectLocation(this.toDropdown, to);

    if (isReturn) {
      await this.returnRadio.check();
    } else {
      await this.oneWayRadio.check();
    }

    await this.selectDate(this.departureDate, date);
    await this.searchButton.click();
  }

  private async selectDate(datePicker: Locator, date: string) {
    await datePicker.click();
    await this.page
      .locator('.ui-calendar__tiles')
      .first()
      .waitFor({ state: 'visible', timeout: 5000 });
    const button = this.page
      .locator(`button.tile:has(.tile__day[aria-label*="${date}"])`)
      .first();
    await button.waitFor({ state: 'visible', timeout: 5000 });
    await button.click();
  }

  private async selectLocation(dropdown: Locator, locationName: string) {
    await dropdown.click();
    await this.page
      .locator('[data-tag="autocomplete-options"]')
      .locator(`[data-tag="autocomplete-option"]:has-text("${locationName}")`)
      .first()
      .click();
  }
}
