module.exports = {
  testTimeout: 50000,
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/core/**/*.ts', '!<rootDir>/src/core/**/index.ts'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/core/application/schemas',
    '<rootDir>/src/core/infra/config'
  ],
  moduleNameMapper: {
    '~/test/(.+)': '<rootDir>/test/$1',
    '@domain/(.+)': '<rootDir>/src/core/domain/$1',
    '@application/(.+)': '<rootDir>/src/core/application/$1',
    '@infra/(.+)': '<rootDir>/src/core/infra/$1'
  },
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};