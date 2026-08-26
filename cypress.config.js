const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    specPattern: 'src/e2e/**/*.cy.js',
  },
});
