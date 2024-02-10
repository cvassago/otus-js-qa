import { generateUserCredentials } from '../fixtures/userFixture';

const config = {
	baseURL: 'https://bookstore.demoqa.com/Account/v1',
	userId: '',
	user: generateUserCredentials(),
	token: 'Bearer ',
}
export default config
