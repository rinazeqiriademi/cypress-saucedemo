describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    })

    it('should successfully log in with valid credentials', () => {
        cy.get('[data-test=username]').type('standard_user')
        cy.get('[data-test=password]').type('secret_sauce')
        cy.get('[data-test=login-button]').click()
        cy.url().should('include', '/inventory.html')
    });

})