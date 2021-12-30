/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.ts'],
  coveragePathIgnorePatterns: ['.dto\\.ts'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  testEnvironment: 'node',
}
