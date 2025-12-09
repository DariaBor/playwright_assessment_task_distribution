import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { Results } from '../../components/Results';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { passengerFactory } from '../../fixtures/dataFactory';
import { acceptCookiesIfPresent } from '../../utils/helpers';
import { searchTestDataAlternative } from '../../fixtures/testData';

test('001: E2E: Search -> Select Ticket -> Checkout', async ({ page }) => {
  const home = new HomePage(page);
  const results = new Results(page);
  const checkout = new CheckoutPage(page);

  await home.goto();
  await page.waitForLoadState('networkidle');
  await acceptCookiesIfPresent(page);

  await home.searchBar.search(
    searchTestDataAlternative.departure,
    searchTestDataAlternative.arrival,
    searchTestDataAlternative.date
  );

  await page.waitForLoadState('networkidle');
  await results.waitForResults();
  await results.selectFirstTicket();
  await page.waitForLoadState('networkidle');
  await acceptCookiesIfPresent(page);

  const passenger = passengerFactory();
  await checkout.fillPassengerDetails(
    passenger.name,
    passenger.surname,
    passenger.email
  );
  await checkout.verifyExtrasVisible();
  await checkout.selectPaymentMethod('google_pay');
  await checkout.acceptTacAgreement();
  // to be continued
});
