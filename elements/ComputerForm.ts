import { Locator, Page } from '@playwright/test';

export class ComputerForm {
	private readonly page: Page;

	public readonly nameInput: Locator;
	public readonly introducedInput: Locator;
	public readonly discontinuedInput: Locator;
	public readonly companySelect: Locator;
	public readonly submitButton: Locator;
	public readonly closeButton: Locator;

	constructor(page: Page, submitButton: Locator) {
		this.page = page;

		this.nameInput = page.locator('#name');
		this.introducedInput = page.locator('#introduced');
		this.discontinuedInput = page.locator('#discontinued');
		this.companySelect = page.locator('#company');
		this.submitButton = submitButton;
		this.closeButton = page.locator('a', { hasText: 'Cancel' });
	}
}
