module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest-setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(.*react-native.*|@react-navigation|lucide-react-native)/)',
  ],
};
