import config from '../config/config';

export async function getBookInfo(isbn) {
	const urlForGetInfo = `${config.baseURLBooks}/Book/?ISBN=${isbn}`;

	return await fetch(urlForGetInfo, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${config.token}`,
		},
	});
}
