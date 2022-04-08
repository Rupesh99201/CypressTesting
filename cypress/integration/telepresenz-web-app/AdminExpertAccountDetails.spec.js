const loginTestDetails = {
    email:'roopesh@telepresenz.com',
    pswd:'password'
}

describe('Renders the App ',()=>{   
    
    it('renders correctly',()=>{
        cy.visit('/');
        cy.get('#root').should('exist');
    })
    
    // checking if on login page then add the basic details and get logged-in if user is already logged in then overide login and proceed
    it("Add value to login page if it exist",()=>{

        if(cy.get('input[name=email-address')){

            cy.get('input[name=email-address]').should('exist');
            cy.get('input[name=email-address]').type(loginTestDetails.email);
    
            cy.get('input[name=password]').should('exist');
            cy.get('input[name=password').type(loginTestDetails.pswd);
    
            cy.get('#loginButton').should('exist');
            cy.get('#loginButton').click();
            cy.wait(2000);
            cy.get(('body')).then(($body)=>{
                if($body.text().includes('User is already logged in to Telepresenz. Do you want to log in now?')){
                    cy.contains('Yes').click();
                }
            })
        }         

    })
    //Check if able to load Account Details page without any error
    it('should able to load Account Details page without any error',()=>{
        cy.wait(1000);
        if(cy.get('#AccountDetails').should('exist')){
            // Checking if able to view Account Detail Tab.
            cy.get('#AccountDetailsTab').click();
            // Check if able to click and open the dropdown to view and the close
            cy.get('.account-info').find('.d-flex > .fas').click();
            cy.wait(1000);
            // check if able to click and close the dropdown to view and the close
            cy.get('.account-info').find('.d-flex > .fas').click();
            cy.wait(1000);
        }
        
    })

})