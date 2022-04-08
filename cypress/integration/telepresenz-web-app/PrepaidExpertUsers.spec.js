const loginTestDetails = {
    email:'mahendran7@telepresenz.com',
    pswd:'password'
}

const newUserInfo = {
    fName:'Mark',
    lName:'Rufflo',
    email:'mark@gmail.com',
    pNumber:'9876543210',
}

const modifiedUserInfo = {
    fName:'Mark',
    lName:'Roger',
    pNumber:'0987654321'
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

    //check in users tab check if able to fill the user form with required info and submit the form
    it.skip('should render users tab check if able to fill the user form with required info and submit the form',()=>{
        
        if(cy.get('#UsersTab').should('exist')){
            cy.wait(1000);
            cy.get('#UsersTab').click();
            cy.get('#Users').find('input[type=image]').click();
            cy.wait(1000);

            // select the first value from drop down
            cy.get('#Users form').find('.relative > .css-1pcexqc-container > .css-bg1rzq-control > .css-1hwfws3').click();
            cy.get('#Users form').find('.css-dpec0i-option').first().click();    
           
            // add first name
            cy.wait(1000); 
            cy.get('#Users form').find('input[name=first_name]').type(newUserInfo.fName);

            // add last name
            cy.wait(1000);
            cy.get('#Users form').find('input[name=last_name]').type(newUserInfo.lName);

            //add email id
            cy.wait(1000); 
            cy.get('#Users form').find('input[name=user_email]').type(newUserInfo.email);

            // add phone number
            cy.wait(1000);
            cy.get('#Users form').find('input[name=phonenumber]').type(newUserInfo.pNumber);

            // click on is expert checkbox 
            cy.get('#Users form').find('input[type=checkbox]').click();

            // click on add button
            cy.get('#Users form').find('.btn-green').click();

            cy.wait(3000);
            // final ok button
            cy.get('#Users').find('.btn-green').click();
        }
    })

    //Check if able to edit the user edit form
    it('should able to edit user in the edit form',()=>{
        if(cy.get('#UsersTab').should('exist')){
            cy.get('#UsersTab').click();
            cy.get('#usersTable').should('exist');    

            cy.get('#icon-edit-0 > .fas').should('exist');
            // clicking on 1st element of table
            cy.wait(1000);
            cy.get("#icon-edit-0 > .fas").click();
            cy.wait(1000);    

            // clear existing value and new value to field
            cy.wait(1000); 
            cy.get(':nth-child(2) > .signup-input-field').clear('').type(modifiedUserInfo.fName);

            cy.wait(1000);
            cy.get(':nth-child(3) > .signup-input-field').clear('').type(modifiedUserInfo.lName);

            cy.wait(1000);
            cy.get(':nth-child(5) > .signup-input-field').clear('').type(modifiedUserInfo.pNumber);

            // click on checkbox to make expert to technician
            cy.get('.checkbox').click();
            cy.wait(1000);

            cy.get('.__btn').click();
            cy.wait(3000);
            cy.get('.btn-green').click();
            cy.wait(1000);

                
        }
    })

    // check if able to delete 1st element added  by user table view
    it.skip('should able to delete users',()=>{
        if(cy.get('#UsersTab').should('exist')){
            
            cy.get('#UsersTab').click();
            //Checking if table exist before making change to table    
            cy.get('#usersTable').should('exist');
            //Clicking on the first row table and deleting the user  
            cy.get('#icon-trash-0 > .far').click();
            cy.wait(1000);
            //Clicking on confirmation dialog
            cy.get('.btn-green').click();
            cy.wait(1000);
            //agian giving the confirmation to delete user
            cy.get('.btn-green').click();

        }
    })
})