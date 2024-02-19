import { expect, describe, test, beforeAll } from '@jest/globals';
import { createUser } from '../framework/services/createUser';
import config from '../framework/config/config';
import { generateToken } from '../framework/services/generateToken';
import { generateUserCredentials } from '../framework/fixtures/userFixture';
import { getAuthorized } from '../framework/services/getAuthorized';
import { deleteUser } from '../framework/services/deleteUser';
import { getUserInfo } from '../framework/services/getUserInfo';
import { createBook } from '../framework/services/createBook';
import { getBooksList } from '../framework/services/getBooksList';
import { deleteBook } from '../framework/services/deleteBook';
import { replaceBook } from '../framework/services/replaceBook';
import { getBookInfo } from '../framework/services/getBookInfo';

describe("Bookstore api tests -- create user", () => {
	test("User creation -- successful", async () => {
		const response = await createUser(config.user.username, config.user.password);
		const data = await response.json();
		config.userId = data.userID;

		expect(response.status).toBe(201);
		expect(data.username).toBe(config.user.username);
		expect(data.books).toEqual([]);
	});

	test("User creation error -- User exists", async () => {
		const response = await createUser(config.user.username, config.user.password);
		const data = await response.json();

		expect(response.status).toBe(406);
		expect(data.code).toBe("1204");
		expect(data.message).toEqual("User exists!");
	});

	test("User creation error -- Invalid password", async () => {
		const response = await createUser(config.user.username, '1234567890');
		const data = await response.json();

		expect(response.status).toBe(400);
		expect(data.code).toBe("1300");
		expect(data.message).toEqual(
			"Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.",
		);
	});
});

describe("Bookstore api tests -- token generate", () => {
	test("Token generation -- success", async () => {
		const response = await generateToken(config.user.username, config.user.password);
		const data = await response.json();
		const tokenRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$/;
		const expiresRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
		config.token = data.token;

		expect(response.status).toBe(200);
		expect(tokenRegex.test(data.token)).toBe(true);
		expect(expiresRegex.test(data.expires)).toBe(true);
		expect(data.status).toBe("Success");
		expect(data.result).toEqual("User authorized successfully.");
	});

	test("Token generation -- error", async () => {
		const notExistUser = generateUserCredentials();
		const response = await generateToken(notExistUser.username, config.user.password);
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data.token).toBe(null);
		expect(data.expires).toBe(null);
		expect(data.status).toBe("Failed");
		expect(data.result).toEqual("User authorization failed.");
	});
});

describe("Work with books", () => {
	beforeAll(async () => {
		const response = await getBooksList();
		const data = await response.json();
		config.isbns = data.books.map(book => book.isbn);
	});

	test("Create book", async () => {
		const response = await createBook(config.userId, config.isbns);
		const data = await response.json();

		expect(response.status).toBe(201);
		expect(data).toEqual({ books: config.isbns.map(isbn => ({ isbn })) });
	});

	test("Delete book", async () => {
		const response = await deleteBook(config.userId, config.isbns[0]);

		expect(response.status).toBe(204);
	});

	test("Replace book", async () => {
		const response = await replaceBook(config.userId, config.isbns[1], config.isbns[0]);
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data.userId).toBe(config.userId);
		expect(data.username).toBe(config.user.username);
	});

	test.each(
		[
			{
				isbn: "9781449325862",
				code: 200,
			},
			{
				isbn: "1234567890",
				code: 400,
				dataCode: "1205",
				message: "ISBN supplied is not available in Books Collection!"
			},
		]
	)("Get information about book", async ({ isbn, code, dataCode, message }) => {
		console.log(config.isbns)

		const response = await getBookInfo(isbn);
		const data = await response.json();

		console.log("====>>> isbn = ", isbn)

		expect(response.status).toBe(code);
		if (code === 200) {
			console.log('ok!')
			expect(data.isbn).toBe(isbn);
		}
		else {
			expect(data.code).toBe(dataCode);
			expect(data.message).toBe(message);
		}
	});
});

describe("Work with user", () => {
	test("Successful authorization", async () => {
		const response = await getAuthorized(config.user.username, config.user.password);

		expect(response.status).toBe(200);
	});

	test("Getting user information", async () => {
		const response = await getUserInfo(config.userId);
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data.userId).toBe(config.userId);
		expect(data.username).toBe(config.user.username);
	})

	test("Successful deletion of user", async () => {
		const response = await deleteUser(config.userId);

		expect(response.status).toBe(204);
	});
});
