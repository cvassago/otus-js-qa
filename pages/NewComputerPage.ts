import { Locator, Page } from '@playwright/test';

export class NewComputerPage {
	private readonly page: Page;

	public readonly nameInput: Locator;
	public readonly introducedInput: Locator;
	public readonly discontinuedInput: Locator;
	public readonly companySelect: Locator;
	public readonly submitButton: Locator;

	constructor(page: Page) {
		this.page = page;

		this.nameInput = page.locator('#name');
		this.introducedInput = page.locator('#introduced');
		this.discontinuedInput = page.locator('#discontinued');
		this.companySelect = page.locator('#company');
		this.submitButton = page.locator('input[type="submit"]');
	}

	public async wait() {
		await this.page.waitForURL('computers/new');
	}
}
