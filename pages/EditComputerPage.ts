import { Locator, Page } from '@playwright/test';
import { ComputerForm } from '../elements/ComputerForm';
import { MainHeader } from '../elements/MainHeader';

export class EditComputerPage {
	private readonly page: Page;
	private readonly deleteButton: Locator;

	public readonly computerForm: ComputerForm;
	public readonly mainHeader: MainHeader;

	constructor(page: Page) {
		this.page = page;
		this.deleteButton = page.locator('input[type="submit"]', { hasText: 'Delete this computer' });

		const submitButton = page.locator('input[type="submit"]', { hasText: 'Save this computer' });
		this.computerForm = new ComputerForm(page, submitButton);
		this.mainHeader = new MainHeader(page);
	}

	public async delete() {
		await this.deleteButton.click();
	}
}
