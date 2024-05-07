import { Locator, Page } from '@playwright/test';

export class MainHeader {
	private readonly mainHeader: Locator;

	constructor(page: Page) {
		this.mainHeader = page.locator('a', { hasText: 'Computer database' });
	}

	public async clickHeader() {
		await this.mainHeader.click();
	}
}
