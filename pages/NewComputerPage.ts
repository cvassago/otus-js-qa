import { Page } from '@playwright/test';
import { ComputerForm } from '../elements/ComputerForm';

export class NewComputerPage {
	private readonly page: Page;

	public readonly computerForm: ComputerForm;

	constructor(page: Page) {
		this.page = page;

		const submitButton = page.locator('input[type="submit"]');

		this.computerForm = new ComputerForm(page, submitButton);
	}

	public async wait() {
		await this.page.waitForURL('computers/new');
	}
}
