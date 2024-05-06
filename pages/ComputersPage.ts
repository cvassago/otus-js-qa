import { Locator, Page } from '@playwright/test';
import { NewComputerPage } from './NewComputerPage';
import { EditComputerPage } from './EditComputerPage';

export class ComputersPage {
	private readonly page: Page;

	private readonly searchBox: Locator;
	private readonly searchButton: Locator;
	private readonly addButton: Locator;
	private readonly nextPageButton: Locator;

	public readonly tableRows: Locator;
	public readonly successAlert: Locator;
	public readonly nameColumnHead: Locator;
	public readonly currentPaginationLabel: Locator;

	constructor(page: Page) {
		this.page = page;

		this.searchBox = page.locator('#searchbox');
		this.searchButton = page.locator('#searchsubmit');
		this.addButton = page.locator('#add');
		this.nextPageButton = page.locator('.next > a');

		this.tableRows = page.locator('table.computers > tbody > tr');
		this.successAlert = page.locator('.alert-message').filter({ hasText: 'Done' });
		this.nameColumnHead = page.locator('.col-name > a');
		this.currentPaginationLabel = page.locator('.current');
	}

	public async open() {
		await this.page.goto('computers');
	}

	public async search(query: string) {
		await this.searchBox.fill(query);
		await this.searchButton.click();
	}

	public async add() {
		await this.addButton.click();
		return new NewComputerPage(this.page);
	}

	public async edit(computerName: string) {
		await this.tableRows.locator('a', { hasText: computerName }).click();
		return new EditComputerPage(this.page);
	}

	public async nextPage() {
		await this.nextPageButton.click();
	}
}
