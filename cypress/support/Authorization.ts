class Authorization {
    login(username: string, password: string) {
        cy.get('[data-test="username"]').type(username);
        cy.get('[data-test="password"]').type(password);
        cy.get('[data-test="login-button"]').click();
    }

    logout() {
        cy.get('.bm-burger-button').click();
        cy.get('#logout_sidebar_link').click();
    }
}

export const authorization = new Authorization();