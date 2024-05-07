import { test, expect } from '@playwright/test';
import { ComputersPage } from '../pages/ComputersPage';

test.describe('computer-database.gatling.io tests', async () => {
	test('Header is link to main page', async ({ page }) => {
		const computersPage = new ComputersPage(page);
		const computerName = 'APEXC';

		await computersPage.open();
		await computersPage.search(computerName);

		await expect(computersPage.tableRows).toHaveCount(1);
		await expect(computersPage.tableRows).toContainText(computerName);
	});

	test('Form add new computer', async ({ page }) => {
		const computersPage = new ComputersPage(page);
		await computersPage.open();

		const newComputerPage = await computersPage.add();
		await newComputerPage.wait();
		await newComputerPage.computerForm.nameInput.fill('computer name');
		await newComputerPage.computerForm.introducedInput.fill('2024-05-05');
		await newComputerPage.computerForm.discontinuedInput.fill('2024-05-06');
		await newComputerPage.computerForm.companySelect.selectOption('1');
		await newComputerPage.computerForm.submitButton.click();

		await expect(computersPage.successAlert).toBeVisible();
	});

	test('double click on column header sort data descending', async ({ page }) => {
		const computersPage = new ComputersPage(page);
		await computersPage.open();

		await computersPage.nameColumnHead.dblclick();

		await expect(computersPage.tableRows.nth(0)).toContainText('lenovo thinkpad z61p');
	});

	test('delete button delete computer', async ({ page }) => {
		const computersPage = new ComputersPage(page);
		await computersPage.open();

		const editComputerPage = await computersPage.edit('ACE');
		await editComputerPage.delete();

		await computersPage.successAlert.isVisible();
	});

	test('Next page button works', async ({ page }) => {
		const computersPage = new ComputersPage(page);
		await computersPage.open();

		await computersPage.nextPage();

		await expect(computersPage.tableRows.nth(0)).toContainText('ASCI White');
		await expect(computersPage.currentPaginationLabel).toContainText('Displaying 11 to 20');
	});

	test('Edit form fills correctly', async ({ page }) => {
		const computerName = 'ACE';

		const computersPage = new ComputersPage(page);
		await computersPage.open();

		const editComputerPage = await computersPage.edit(computerName);

		await expect(editComputerPage.computerForm.nameInput).toHaveValue(computerName);
	});

	test('Edit from saves correctly', async ({ page }) => {
		const computersPage = new ComputersPage(page);
		await computersPage.open();

		const editComputerPage = await computersPage.edit('ACE');
		await editComputerPage.computerForm.nameInput.fill('NEW_ACE');
		await editComputerPage.computerForm.submitButton.click();

		await expect(computersPage.successAlert).toBeVisible();
	});

	test('Edit form can be closed', async ({ page }) => {
		const computersPage = new ComputersPage(page);
		await computersPage.open();

		const editComputerPage = await computersPage.edit('ACE');
		await editComputerPage.computerForm.closeButton.click();

		await expect(page).toHaveURL(computersPage.url);
	});

	test('Header returns on computers page', async ({ page }) => {
		const computersPage = new ComputersPage(page);
		await computersPage.open();

		const editComputerPage = await computersPage.edit('ACE');
		await editComputerPage.mainHeader.clickHeader();

		await expect(page).toHaveURL(computersPage.url);
	});

	test('Browser go back correctly', async ({ page }) => {
		const computersPage = new ComputersPage(page);
		await computersPage.open();

		await computersPage.edit('ACE');
		await page.goBack();

		await expect(page).toHaveURL(computersPage.url);
	});
});
