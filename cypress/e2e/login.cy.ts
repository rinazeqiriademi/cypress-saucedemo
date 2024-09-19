describe('Login Page Tests', () => {
    const validUsernames = [
        'standard_user',
        'problem_user',
        'performance_glitch_user',
        'error_user',
        'visual_user',
    ];

    const validPassword = 'secret_sauce';
    const invalidPassword = 'wrong_password';
    const invalidUsername = 'invalid_user';

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    });

    
    validUsernames.forEach((username) => {
        it(`should allow valid user ${username} to login with correct password`, () => {
            cy.login(username, validPassword);

            // Check that user is successfully logged in and can see the inventory page
            cy.url().should('include', '/inventory.html');

            cy.logout();
        });
    });

    it('should display error message for invalid username', () => {
        cy.login(invalidUsername, validPassword);
        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('should display error message for invalid password', () => {
        cy.login(validUsernames[0], invalidPassword);
        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('should display error message for locked out user', () => {
        cy.login('locked_out_user', validPassword);
        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Sorry, this user has been locked out.');
    });

    it('should display error message for empty username', () => {
        cy.login('',validPassword);
        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username is required');
    });

    it('should display error message for empty password', () => {
        cy.login(validUsernames.at(0),'');
        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Password is required');
    });

    it('should display error message for empty username and password', () => {;
        cy.login('','');
        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username is required');
    });

    it('should display error message for invalid username and password', () => {
        cy.login(invalidUsername, invalidPassword);
        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('should display error message that username and password do not match for locked out user and invalid password', () => {
        cy.login('locked_out_user', invalidPassword);
        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('should be case-sensitive for usernames', () => {
        const uppercaseUsername = validUsernames[0].toUpperCase();
        cy.login(uppercaseUsername, validPassword);
        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('should be case-sensitive for passwords', () => {
        const uppercasePassword = validPassword.toUpperCase();
        cy.login(validUsernames[0], uppercasePassword);
        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('should trim whitespace from username input', () => {
        cy.login(`  ${validUsernames[0]}  `, validPassword);
        // Check that user is successfully logged in and can see the inventory page
        cy.url().should('include', '/inventory.html');
        cy.logout();
    });

    it('should not trim whitespace from password input', () => {
        cy.login(validUsernames[0], ` ${validPassword} `);
        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username and password do not match any user in this service');
    });

})