import { Locator, Page } from '@playwright/test';

export class EditComputerPage {
	private readonly page: Page;
	private readonly deleteButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.deleteButton = page.locator('input[type="submit"]', { hasText: 'Delete this computer' });
	}

	public async delete() {
		await this.deleteButton.click();
	}
}
