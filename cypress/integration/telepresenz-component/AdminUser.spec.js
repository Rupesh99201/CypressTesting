const loginTestDetails = {
    email:'roopesh@telepresenz.com',
    pswd:'password'
}

const modifiedUserInfo = {
    fName:' Scott',
    lName:' Hall',
    pNumber:'0987654321'
}

describe('Renders the App ',()=>{   
    
    it('renders correctly',()=>{
        cy.visit('/');
        cy.get('#root').should('exist');
    })

    it("Add value to login page if it exist",()=>{

        if(cy.get('input[name=email-address')){

            cy.get('input[name=email-address]').should('exist');
            cy.get('input[name=email-address]').type(loginTestDetails.email);
    
            cy.get('input[name=password]').should('exist');
            cy.get('input[name=password').type(loginTestDetails.pswd);
    
            cy.get('#loginButton').should('exist');
            cy.get('#loginButton').click();
            cy.wait(4000);
            cy.get(('body')).then(($body)=>{
                if($body.text().includes('User is already logged in to Telepresenz. Do you want to log in now?')){
                    cy.contains('Yes').click();
                }
            })
        }         

    })

    it('should render users tab and add users using CSV ',()=>{
        
        if(cy.get('#UsersTab').should('exist')){
            cy.wait(20000);
            cy.get('#UsersTab').click();
            cy.get('#Users').find('input[type=image]').click();
            
            cy.get('.__modal-dialog').find('.__modal-body > :nth-child(2)').click();

            const fileName =  "uploadUserCsvTemplate.csv";

            cy.fixture(fileName, 'binary')
            .then(Cypress.Blob.binaryStringToBlob)
            .then(fileContent => {
                cy.get('[type=file]').attachFile({
                fileContent,
                filePath: fileName,
                encoding: 'utf-8',
                lastModified: new Date().getTime()
                });
            });
            cy.wait(20000);
            cy.get('.btn-green').click();
           
        }
    })


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

            cy.get(':nth-child(2) > .signup-input-field').clear('');
            cy.wait(1000); 
            cy.get(':nth-child(2) > .signup-input-field').type(modifiedUserInfo.fName);

            cy.get(':nth-child(3) > .signup-input-field').clear('');
            cy.wait(1000);
            cy.get(':nth-child(3) > .signup-input-field').type(modifiedUserInfo.lName);

            cy.get(':nth-child(5) > .signup-input-field').clear('');
            cy.wait(1000);
            cy.get(':nth-child(5) > .signup-input-field').type(modifiedUserInfo.pNumber);

            cy.wait(1000);
            cy.get('.__btn').click();
            cy.wait(3000);
            cy.get('.btn-green').click();

                
        }
    })

    it('should able to delete users',()=>{
        if(cy.get('#UsersTab').should('exist')){
            cy.get('#UsersTab').click();
            cy.get('#usersTable').should('exist');
            cy.get('#icon-trash-0 > .far').click();
            cy.wait(1000);
            cy.get('.btn-green').click();
            cy.wait(1000);
            cy.get('.btn-green').click();
            

        }
    })
})