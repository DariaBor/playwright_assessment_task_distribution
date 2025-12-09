import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { Results } from '../../components/Results';
import { FilterSection } from '../../components/FilterSection';
import { acceptCookiesIfPresent } from '../../utils/helpers';
import { searchTestData } from '../../fixtures/testData';

test.describe('Filters Regression Tests', () => {
  let home: HomePage;
  let results: Results;
  let filters: FilterSection;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    results = new Results(page);
    filters = new FilterSection(page);

    await home.goto();
    await page.waitForLoadState('networkidle');
    await acceptCookiesIfPresent(page);

    await home.searchBar.search(
      searchTestData.departure,
      searchTestData.arrival,
      searchTestData.date
    );
    await page.waitForLoadState('networkidle');
    await results.waitForResultsToStabilize();
  });

  test('001: Direct Only filter', async ({ page }) => {
    const initialResults = await page
      .locator('[data-tag="connection-card"]')
      .count();
    expect(initialResults).toBeGreaterThan(0);

    await filters.directOnly.check();
    await page.waitForLoadState('networkidle');

    const filteredResults = await page
      .locator('[data-tag="connection-card"]')
      .count();

    expect(filteredResults).toBeLessThanOrEqual(initialResults);
  });

  test('002: Check results are updated after period filter select', async ({
    page,
  }) => {
    const initialResults = await page
      .locator('[data-tag="connection-card"]')
      .count();
    expect(initialResults).toBeGreaterThan(0);

    await filters.dawn.check();
    await page.waitForTimeout(500);
    const dawnResults = await page
      .locator('[data-tag="connection-card"]')
      .count();
    expect(dawnResults).toBeLessThanOrEqual(initialResults);

    await filters.dawn.uncheck();
    await page.waitForTimeout(500);
    await filters.morning.check();
    await page.waitForTimeout(500);
    const morningResults = await page
      .locator('[data-tag="connection-card"]')
      .count();
    expect(morningResults).toBeLessThanOrEqual(initialResults);

    await filters.morning.uncheck();
    await page.waitForTimeout(500);
    await filters.afternoon.check();
    await page.waitForTimeout(500);
    const afternoonResults = await page
      .locator('[data-tag="connection-card"]')
      .count();
    expect(afternoonResults).toBeLessThanOrEqual(initialResults);

    await filters.afternoon.uncheck();
    await page.waitForTimeout(500);
    await filters.night.check();
    await page.waitForTimeout(500);
    const nightResults = await page
      .locator('[data-tag="connection-card"]')
      .count();
    expect(nightResults).toBeLessThanOrEqual(initialResults);
  });

  test('003: Combine multiple period filters', async ({ page }) => {
    const initialResults = await page
      .locator('[data-tag="connection-card"]')
      .count();
    expect(initialResults).toBeGreaterThan(0);

    await filters.dawn.check();
    await filters.morning.check();
    await page.waitForTimeout(500);

    const combinedDawnMorning = await page
      .locator('[data-tag="connection-card"]')
      .count();
    expect(combinedDawnMorning).toBeLessThanOrEqual(initialResults);

    await filters.afternoon.check();
    await page.waitForTimeout(500);

    const combinedThree = await page
      .locator('[data-tag="connection-card"]')
      .count();
    expect(combinedThree).toBeLessThanOrEqual(initialResults);

    await filters.night.check();
    await page.waitForTimeout(500);

    const allPeriods = await page
      .locator('[data-tag="connection-card"]')
      .count();
    expect(allPeriods).toBeLessThanOrEqual(initialResults);
  });

  test('004: Clear filters: resets all checkboxes and results to original', async ({
    page,
  }) => {
    const initialResults = await page
      .locator('[data-tag="connection-card"]')
      .count();
    expect(initialResults).toBeGreaterThan(0);

    await filters.directOnly.check();
    await filters.dawn.check();
    await filters.morning.check();
    await page.waitForTimeout(500);

    const filteredResults = await page
      .locator('[data-tag="connection-card"]')
      .count();
    expect(filteredResults).toBeLessThanOrEqual(initialResults);

    await expect(filters.directOnly).toBeChecked();
    await expect(filters.dawn).toBeChecked();
    await expect(filters.morning).toBeChecked();

    await filters.clearFilters();
    await page.waitForTimeout(500);

    await expect(filters.directOnly).not.toBeChecked();
    await expect(filters.dawn).not.toBeChecked();
    await expect(filters.morning).not.toBeChecked();
    await expect(filters.afternoon).not.toBeChecked();
    await expect(filters.night).not.toBeChecked();

    const resetResults = await page
      .locator('[data-tag="connection-card"]')
      .count();
    expect(resetResults).toBe(initialResults);
  });
});
