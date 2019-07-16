const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/mocks/fileMock.ts',
    '\\.(s?css)$': '<rootDir>/mocks/styleMock.ts',
    '\\.svg$': '<rootDir>/mocks/svgrMock.ts',
    '@src/data/orders.json': '<rootDir>/mocks/orders.json',
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  },
  setupFilesAfterEnv: ['<rootDir>/setupTest.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testPathIgnorePatterns: [
    '<rootDir>/cypress/',
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '/__fixture__/.*',
  ],
}
