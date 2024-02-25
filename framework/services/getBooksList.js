import config from '../config/config';

export async function getBooksList() {
	return await fetch(`${config.baseURLBooks}/Books`, {
		method: 'get',
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
