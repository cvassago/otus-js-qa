export async function generateToken(userName, password) {
	return await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
		method: 'post',
		body: JSON.stringify({
			userName,
			password,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
