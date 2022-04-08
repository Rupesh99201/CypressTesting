const loginTestDetails = {
    email:'mahendran7@telepresenz.com',
    pswd:'password'
}

const groupTestDetails = {
    groupName:'Demo OT',
    groupDescription:'Demo OT Desc',
    chGroupName:'Changed GroupName',
    chGroupDescription:'Changed OT Desc'
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
            cy.wait(4000);
            cy.get(('body')).then(($body)=>{
                if($body.text().includes('User is already logged in to Telepresenz. Do you want to log in now?')){
                    cy.contains('Yes').click();
                }
            })
        }         

    })

    // onclick of plus icon creating new group by using Group form section  
    it.skip('should render group tab and add group ',()=>{
        if(cy.get('#GroupsTab').should('exist')){
            cy.get('#GroupsTab').click();
            cy.get('#Groups').find('input[type=image]').click();
            const randomNumber = Math.floor(Math.random() * 10); 
            cy.get('input[name=group_name]').type(groupTestDetails.groupName + randomNumber);
            cy.wait(1000);
            cy.get('input[name=description]').type(groupTestDetails.groupDescription + randomNumber);
            cy.wait(1000);
            cy.get('#btnAddGroup').click();
            cy.wait(1000);
            cy.get('.btn-green').click();
            cy.wait(1000);
        }
    })

    // check if able to edit the group and should be able to add user from drop down
    it.skip('should edit the group and add user the group',()=>{

        if(cy.get('#GroupsTab').should('exist')){
            
            cy.get('#groupsTable').should('exist');
            // clicking on 1st element of table
            cy.wait(1000);
            cy.get("[data-rh='Edit group']").eq(0).click();
            cy.wait(1000);    

            // clear existing value and then update with new value
            cy.get('input[name=group_name]').clear('').type(groupTestDetails.chGroupName);
            cy.wait(1000);
            cy.get('input[name=description]').clear('').type(groupTestDetails.chGroupDescription);
            cy.wait(3000);

            // select the value from drop down.
            // cy.get('#selectfromusers').find('.css-1wy0on6 > :nth-child(3)').click();
            cy.get('#selectfromusers').find('.ml-3 > .css-1pcexqc-container > .css-bg1rzq-control > .css-1wy0on6 > .css-16pqwjk-indicatorContainer').click({multiple:true});
            cy.wait(1000);
            // cy.get('#selectfromusers').find('#react-select-5-option-1').click();
            cy.get('.css-11unzgr').should('exist');//.click();
            cy.get('.css-11unzgr div').first().click();
            cy.get(1000);

            //closeing the button after changing value
            cy.get('#btnCloseEditGroup').click();
            cy.wait(2000);
            cy.get('.btn-green').click();
            cy.wait(2000);
                
        }
    })


    // check if able to delete the 1st group element 
    it('should able to delete group',()=>{

        if(cy.get('#groupsTable').should('exist')){
            cy.wait(1000);
            cy.get('#groupsTable').should('exist');
            cy.get("[data-rh='Delete group']").eq(0).click();
            cy.wait(1000);
            cy.get('.btn-green').click();
            cy.wait(1000);
            cy.get('.btn-green').click();
        }
    })
})