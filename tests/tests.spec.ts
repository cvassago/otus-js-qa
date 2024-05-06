import {test, expect} from "@playwright/test";

test.describe('computer-database.gatling.io tests', async () => {
	test('Header is link to main page', async ({page}) => {
		const computerName = 'APEXC';

		await page.goto('computers');

		await page.locator('#searchbox').fill(computerName);
		await page.locator('#searchsubmit').click();

		const tableRows = page.locator('table.computers > tbody > tr');
		await expect(tableRows).toHaveCount(1);
		await expect(tableRows).toContainText(computerName);
	});

	test('Form add new computer', async ({page}) => {
		await page.goto('computers');
		await page.locator('#add').click();
		await page.waitForURL('computers/new');

		await page.locator('#name').fill('computer name');
		await page.locator('#introduced').fill('2024-05-05');
		await page.locator('#discontinued').fill('2024-05-06');
		await page.locator('#company').selectOption('1');
		await page.locator('input[type="submit"]').click();

		await expect(page.locator('.alert-message')).toContainText('Done');
	});

	test('double click on column header sort data descending', async ({page}) => {
		await page.goto('computers');

		await page.locator('.col-name > a').dblclick();

		const firstRow = page.locator('table.computers > tbody > tr:first-child');
		await expect(firstRow).toHaveCount(1);
		await expect(firstRow).toContainText('lenovo thinkpad z61p');
	});

	test('delete button delete computer', async ({page}) => {
		await page.goto('computers');

		await page.locator('a').filter({hasText: 'ACE'}).click();
		await page.locator('input[type="submit"]').filter({hasText: 'Delete this computer'}).click();

		await expect(page.locator('.alert-message')).toContainText('Done');
	});

	test('button click open next page', async ({page}) => {
		await page.goto('computers');

		await page.locator('.next > a').click();

		const firstRow = page.locator('table.computers > tbody > tr:first-child');
		await expect(firstRow).toContainText('ASCI White');
		await expect(page.locator('.current')).toContainText('Displaying 11 to 20');
	});
});
