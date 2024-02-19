import config from '../config/config';

export async function deleteUser(userId) {
	const urlForDelete = `${config.baseURL}/User/${userId}`;

	return await fetch(urlForDelete, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${config.token}`,
		},
	});
}
