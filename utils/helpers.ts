import { Page } from '@playwright/test';

export async function acceptCookiesIfPresent(page: Page) {
  const cookieButton = page.locator('[data-tag="cookies-consent-apply"]');
  const isCookieVisible = await cookieButton.isVisible().catch(() => false);
  if (isCookieVisible) {
    await cookieButton.click();
    await page.waitForTimeout(500);
  }
}
