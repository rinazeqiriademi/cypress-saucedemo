describe('Inventory Page Tests', () => {
    const username = 'standard_user';
    const password = 'secret_sauce';

    beforeEach(() => {
        cy.visit('http://localhost:3000/');
        cy.login(username, password);
    
        cy.url().should('include', '/inventory.html');
    });

    it('displays the correct page title', () => {
        cy.get('.title').should('have.text', 'Products');
    });

    it('allows sorting products by name (A to Z)', () => {
        cy.get('[data-test="product-sort-container"]').select('az');
        cy.get('.inventory_item_name').then($items => {
            const itemNames = $items.map((i, el) => Cypress.$(el).text()).get();
            const sortedNames = [...itemNames].sort();
            expect(itemNames).to.deep.equal(sortedNames);
        });
    });

    it('allows adding a single product to the cart', () => {
        cy.get('.inventory_item').first().find('.btn_inventory').click();
        cy.get('.shopping_cart_badge').should('have.text', '1');
    });

    it('allows adding multiple products to the cart', () => {
        cy.get('.inventory_item').eq(0).find('.btn_inventory').click();
        cy.get('.inventory_item').eq(1).find('.btn_inventory').click();
        cy.get('.inventory_item').eq(2).find('.btn_inventory').click();
        cy.get('.inventory_item').eq(3).find('.btn_inventory').click();
        cy.get('.inventory_item').eq(4).find('.btn_inventory').click();
        cy.get('.inventory_item').eq(5).find('.btn_inventory').click();
        cy.get('.shopping_cart_badge').should('have.text', '6');
    });


    it('allows removing a product from the cart', () => {
        cy.get('.inventory_item').first().find('.btn_inventory').click();
        cy.get('.shopping_cart_badge').should('have.text', '1');
        cy.get('.inventory_item').first().find('.btn_inventory').click();
        cy.get('.shopping_cart_badge').should('not.exist');
    })

    it('updates button text when adding/removing items', () => {
        cy.get('.inventory_item').first().within(() => {
            cy.get('.btn_inventory').should('have.text', 'Add to cart');
            cy.get('.btn_inventory').click();
            cy.get('.btn_inventory').should('have.text', 'Remove');
            cy.get('.btn_inventory').click();
            cy.get('.btn_inventory').should('have.text', 'Add to cart');
        })
    });

    it('navigates to product details page when clicking on product name', () => {
        cy.get('.inventory_item_name').first().click();
        cy.url().should('include', '/inventory-item.html');
    });

    it('navigates to product details page when clicking on product image', () => {
        cy.get('.inventory_item_img').first().click();
        cy.url().should('include', '/inventory-item.html');
    });

    it('opens the shopping cart when clicking the cart icon', () => {
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');
    });

    it('allows accessing the burger menu', () => {
        cy.get('#react-burger-menu-btn').click();
        cy.get('.bm-menu-wrap').should('be.visible');
    });

    it('displays footer content', () => {
        cy.get('.footer').should('be.visible');
        cy.get('.social').should('be.visible');
    });

});
