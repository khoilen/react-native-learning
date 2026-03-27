module.exports = {
  preset: 'react-native',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  setupFilesAfterEnv: ['./jest-setup.js'],
  transformIgnorePatterns: [],
  testPathIgnorePatterns: ['/node_modules/', 'styles\\.ts$'],
  modulePathIgnorePatterns: ['styles\\.ts$'],
};
