import config from '../config/config';

export async function getAuthorized(userName, password) {
	return await fetch(
		`${config.baseURL}/Authorized`,
		{
			method: "post",
			body: JSON.stringify({
				userName,
				password,
			}),
			headers: { "Content-Type": "application/json" },
		},
	);
}
