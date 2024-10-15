export default {
  moduleNameMapper: { '^src/(.*)$': '<rootDir>/src/$1' },
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: { '^.+\\.[tj]s?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json', isolatedModules: true }] },
};
