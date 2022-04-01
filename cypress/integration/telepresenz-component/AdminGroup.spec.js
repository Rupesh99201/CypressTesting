const loginTestDetails = {
    email:'roopesh@telepresenz.com',
    pswd:'password'
}

const groupTestDetails = {
    groupName:'Demo OT',
    groupDesp:'My Demo OT Group Description',
    chGroupName:'Changed Demo OT',
    chGroupDesp:'Changed my Demo OT Group Description'
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

    it('should render group tab and add group ',()=>{
        
        if(cy.get('#GroupsTab').should('exist')){
            cy.get('#GroupsTab').click();
            cy.get('#Groups').find('input[type=image]').click();
            cy.get('input[name=group_name]').type(groupTestDetails.groupName);
            cy.wait(1000);
            cy.get('input[name=description]').type(groupTestDetails.groupDesp);
            cy.wait(1000);
            cy.get('#btnAddGroup').click();
            cy.wait(1000);
            cy.get('.btn-green').click();
            cy.wait(1000);
        }
    })


    it('should edit the group and add user the group',()=>{
        if(cy.get('#GroupsTab').should('exist')){
            
            cy.get('#groupsTable').should('exist');
            // clicking on 1st element of table
            cy.wait(1000);
            cy.get("[data-rh='Edit group']").eq(0).click();
            cy.wait(1000);    

            // clear existing value
            cy.get('input[name=group_name]').clear('');
            cy.get('input[name=description]').clear('');

            cy.get('input[name=group_name]').type(groupTestDetails.chGroupName);
            cy.wait(1000);
            cy.get('input[name=description]').type(groupTestDetails.chGroupDesp);
            cy.wait(3000);

            // cy.get('.css-16pqwjk-indicatorContainer').click();
            // cy.get('.css-1pcexqc-container').type('Roopesh Singh');
            // cy.get('.css-kj6f9i-menu').find('div').contains('Roopesh Singh').click();
            // cy.get('#selectfromusers').find('.css-1wy0on6 > :nth-child(3)').click();
            // cy.wait(1000);
            // cy.get('#selectfromusers').find('#react-select-6-option-0').click();

            // cy.get('#selectfromusers').find('.css-1wy0on6 > :nth-child(3)').click();
            // cy.wait(1000);
            // cy.get('#selectfromusers').find('#react-select-6-option-1').click();



            cy.get('#btnCloseEditGroup').click();
            cy.wait(1000);
            cy.get('.btn-green').click();
            cy.wait(1000);
                
        }
    })

    it.skip('should able to delete group',()=>{
        if(cy.get('#groupsTable').should('exist')){
        
            cy.get('#groupsTable').should('exist');
            cy.get("[data-rh='Delete group']").eq(0).click();
            cy.wait(1000);
            cy.get('.btn-green').click();
            cy.wait(1000);
            cy.get('.btn-green').click();
            

        }
    })
})