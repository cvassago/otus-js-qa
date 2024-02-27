import { faker } from '@faker-js/faker';
export function generateUserCredentials() {
	return {
		username: faker.internet.userName(),
		password: faker.internet.password({ pattern: /[A-Za-z0-9]/, prefix: '!' }),
	};
}
