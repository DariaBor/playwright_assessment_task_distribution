import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly passengerNameInput: Locator;
  readonly passengerEmailInput: Locator;
  readonly passengerSurnameInput: Locator;
  readonly passengerConfirmEmailInput: Locator;
  readonly tacAccept: Locator;
  readonly marketingCheckbox: Locator;
  readonly payButton: Locator;
  readonly extras: { [key: string]: Locator };
  readonly paymentMethods: { [key: string]: Locator };

  constructor(page: Page) {
    this.page = page;
    this.passengerNameInput = page.locator('[data-tag="passenger-first-name"]');
    this.passengerSurnameInput = page.locator(
      '[data-tag="passenger-last-name"]'
    );
    this.passengerEmailInput = page.locator('[data-tag="contact-email"]');
    this.passengerConfirmEmailInput = page.locator(
      '[data-tag="contact-confirm-email"]'
    );
    this.tacAccept = page.locator('label[data-tag="terms-and-privacy-checkbox"]');
    this.marketingCheckbox = page.locator(
      'label[data-tag="marketing-materials-checkbox"]'
    );
    this.payButton = page.locator('[data-tag="default-pay-button"]');

    this.extras = {
      mobility: page.locator('[data-tag="extras-card-help"]'),
      sport: page.locator('[data-tag="extras-card-bicycle"]'),
      luggage: page.locator('[data-tag="extras-card-luggage"]'),
    };

    this.paymentMethods = {
      credit_card: page.locator('[data-tag="ui-radio-credit_card"]'),
      google_pay: page.locator('[data-tag="ui-radio-google_pay"]'),
    };
  }

  async fillPassengerDetails(name: string, surname: string, email: string) {
    await this.passengerNameInput.fill(name);
    await this.passengerSurnameInput.fill(surname);
    await this.passengerEmailInput.fill(email);
    await this.passengerConfirmEmailInput.fill(email);
  }

  async verifyExtrasVisible() {
    await Promise.all(
      Object.values(this.extras).map((locator) => expect(locator).toBeVisible())
    );
  }

  async selectPaymentMethod(method: string) {
    // in case new payment methods appear it will be nadled properly
    const paymentLocator = this.paymentMethods[method];
    if (paymentLocator) {
      await paymentLocator.click();
    }
  }
  async acceptTacAgreement() {
    await this.tacAccept.click();
    await expect(this.tacAccept).toHaveClass(/ui-checkbox--checked/);
  }
  async pay() {
    await this.payButton.click();
  }
}
