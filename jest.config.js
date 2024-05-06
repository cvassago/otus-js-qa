/** @type {import('jest').Config} */
const config = {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	testEnvironment: 'allure-jest/node',
	testMatch: ['**/api.spec.js'],
};

module.exports = config;
