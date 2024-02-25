import config from '../config/config';

export async function getUserInfo(userId) {
	const urlForGetInfo = `${config.baseURL}/User/${userId}`;

	return await fetch(urlForGetInfo, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${config.token}`,
		},
	});
}
