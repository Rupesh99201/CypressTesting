const loginTestDetails = {
    email:'roopesh5@telepresenz.com',
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


    // check if able to load group tab and check if it has 1 records
    it('Should be able to load Group Page and should verify search input field and atleast have one row in group table',()=>{

        if(cy.get('#GroupsTab').should('exist')){
            cy.get('#GroupsTab').click();
            cy.get('#groupsTable').should('exist');
            cy.wait(1000);
            // verify if there is search input field in groups view
            cy.get('#Groups').find('#groupSearchBox').should('exist');
            cy.wait(1000);
            // verify if it has 2 row 1 for heading and other is for data row
            cy.get('#groupsTable tbody ').find('tr').should('have.length',2);
        }
        
    })
    //to navigate to users page and should verify search input field and atleast have 2 row in Users table
    it('Should be able to navigate to users page and should verify search input field and at least have 2 rows in the Users table',()=>{

        if(cy.get('#UsersTab').should('exist')){
            cy.get('#UsersTab').click();
            cy.get('#usersTable').should('exist');
            cy.wait(1000);

            // verify if there is search input field in users view
            cy.get('#Users').find('#userSearchBox').should('exist');
            cy.wait(1000);
             // verify if it has 3 row 1 for heading and other is for data row
            cy.get('#usersTable tbody').find('tr').should('have.length',2);
            cy.wait(1000);
            // verify if it has technician in table data
            cy.get('#usersTable tbody tr').find('.Technician').should('exist');
            cy.wait(1000);
             // verify if it has expert in table data
            cy.get('#usersTable tbody tr').find('.Expert').should('exist');
            
        }

    })

    it('Should be able to navigate to usage details page and should verify date input field and atleast have usage table',()=>{

        if(cy.get('#UsageDetails').should('exist')){
            cy.get('#UsageDetailsTab').click();

            // start date should be able to select 
            cy.wait(1000);
            cy.get('#UsageDetails').find(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > .custom-date').should('exist');
            cy.get('#UsageDetails').find(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > .custom-date').click();

            //Checking if the date picker is able to select 4 previous month;
            cy.get('#UsageDetails').find('.react-datepicker__navigation--previous').click();
            cy.wait(1000);
            cy.get('#UsageDetails').find('.react-datepicker__navigation--previous').click();
            cy.wait(1000);
            cy.get('#UsageDetails').find('.react-datepicker__day--015').click();


            // checking if the date picker is able to select 1 next month and date
            cy.wait(1000);
            cy.get('#UsageDetails').find(':nth-child(3) > .react-datepicker-wrapper > .react-datepicker__input-container > .custom-date').click();
            cy.get('#UsageDetails').find('.react-datepicker__navigation--next').click();
            cy.wait(1000);
            cy.get('#UsageDetails').find('.react-datepicker__day--015').click();
  
      }

    })
    

})