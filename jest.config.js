/** @type {import('jest').Config} */
const config = {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	testEnvironment: 'allure-jest/node',
	rootDir: 'specs',
};

module.exports = config;
