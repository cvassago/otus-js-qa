import config from '../config/config';

export async function createBook(userId, isbns) {
	return await fetch(`${config.baseURLBooks}/Books`, {
		method: 'post',
		body: JSON.stringify({
			userId,
			collectionOfIsbns: isbns.map((isbn) => ({ isbn })),
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${config.token}`,
		},
	});
}
