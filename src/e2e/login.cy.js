describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should display login form', () => {
    cy.get('h2').should('contain', 'Masuk ke Akun');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'Login');
  });

  it('should show error message with invalid credentials', () => {
    cy.get('input[type="email"]').type('wrong@test.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    // Tunggu error muncul
    cy.get('.bg-red-100').should('be.visible');
    cy.get('.bg-red-100').should('contain', 'Login failed');
  });

  it('should redirect to home page after successful login', () => {
    // Intercept API request
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: { token: 'fake-token' },
      },
    }).as('loginRequest');

    // Intercept get profile
    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          user: { id: 'user-1', name: 'Test User', email: 'test@test.com' },
        },
      },
    }).as('profileRequest');

    cy.get('input[type="email"]').type('test@test.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.wait('@profileRequest');

    // Should redirect to home
    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('nav').should('contain', 'Test User');
  });

  it('should redirect to register page when clicking register link', () => {
    cy.contains('Daftar di sini').click();
    cy.url().should('contain', '/register');
    cy.get('h2').should('contain', 'Daftar Akun');
  });
});