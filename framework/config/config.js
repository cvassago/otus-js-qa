import { generateUserCredentials } from '../fixtures/userFixture';

const config = {
	baseURL: 'https://bookstore.demoqa.com/Account/v1',
	baseURLBooks: 'https://bookstore.demoqa.com/BookStore/v1',
	userId: '',
	user: generateUserCredentials(),
	token: '',
	isbns: []
}
export default config
