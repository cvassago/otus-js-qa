import config from '../config/config';

export async function replaceBook(userId, fromISBN, toISBN) {
	const urlForReplace = `${config.baseURLBooks}/Books/${fromISBN}`;

	return await fetch(urlForReplace, {
		method: "PUT",
		body: JSON.stringify({
			userId,
			isbn: toISBN,
		}),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${config.token}`,
		},
	});
}
