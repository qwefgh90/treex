module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: [
    '<rootDir>/src/'     // pointing to tests directory
  ],
  testEnvironmentOptions: {
    runScripts: "dangerously"
  }
};