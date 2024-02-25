import config from '../config/config';

export async function createUser(userName, password) {
	return await fetch(`${config.baseURL}/User`, {
		method: 'post',
		body: JSON.stringify({
			userName,
			password,
		}),
		headers: { 'Content-Type': 'application/json' },
	});
}
