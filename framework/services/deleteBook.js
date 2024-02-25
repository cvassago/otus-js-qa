import config from '../config/config';

export async function deleteBook(userId, isbn) {
	return await fetch(`${config.baseURLBooks}/Book`, {
		method: 'DELETE',
		body: JSON.stringify({
			userId,
			isbn,
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${config.token}`,
		},
	});
}
