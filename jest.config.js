/** @type {import('jest').Config} */
const config = {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	testEnvironment: 'allure-jest/node',
};

module.exports = config;
