class Authorization {
    login(username: string, password: string) {
        if(username != null && username != '') {
            cy.get('[data-test="username"]').type(username);
        } else {
            cy.get('[data-test="username"]');
        }
        if(password != null && password != '') {
            cy.get('[data-test="password"]').type(password);
        } else {
            cy.get('[data-test="password"]');
        }
        cy.get('[data-test="login-button"]').click();
    }

    logout() {
        cy.get('.bm-burger-button').click();
        cy.get('#logout_sidebar_link').click();
    }
}

export const authorization = new Authorization();