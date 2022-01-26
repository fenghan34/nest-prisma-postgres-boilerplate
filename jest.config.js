/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: '.',
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.ts'],
  coveragePathIgnorePatterns: ['test', '.dto\\.ts', '.d.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['json-summary', 'text', 'lcov'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-extended/all'],
}
