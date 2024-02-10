export async function getAuthorized(userName, password) {
	return await fetch(
		"https://bookstore.demoqa.com/Account/v1/Authorized",
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
