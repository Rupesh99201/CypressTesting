const { click } = require("@testing-library/user-event/dist/click");

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

        if(cy.get('input[name=email-address').should('exist')){

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

    it('Should able to view the usage details Tab and navigate to usage Details',()=>{
        cy.wait(1000);
        if(cy.get('#UsageDetails').should('exist')){
              cy.get('#UsageDetailsTab').click();
        }
    })

    it('Should able to view the usage details table and header on ui',()=>{
        cy.wait(1000);
        cy.get('#UsageDetailsTab').click();
        cy.wait(1000);
        cy.get('#UsageDetails').find('#usageTable').should('exist');
        cy.get('#UsageDetails').find('.no-sort > :nth-child(1)').should('exist');
    })


    // check if able to select value from group name and users name dropdown field
    it('should able to select value from group name and users name dropdown field',()=>{
        cy.get('#UsageDetailsTab').click();
        cy.wait(1000);
        // selecting group name from input field.
        cy.get('#UsageDetails').find(':nth-child(1) > .css-1pcexqc-container > .css-bg1rzq-control > .css-1hwfws3').should('exist');
        cy.get('#UsageDetails').find(':nth-child(1) > .css-1pcexqc-container > .css-bg1rzq-control > .css-1hwfws3').click();
        cy.get('#UsageDetails').find('#react-select-4-option-0').should('exist');
        cy.get('#UsageDetails').find('#react-select-4-option-0').click();

        // should be able to click on cross button inside multi select group field
        cy.get('#UsageDetails').find('.css-1alnv5e').click();

        cy.wait(1000);
        // selecting users name from input field.
        cy.get('#UsageDetails').find(':nth-child(2) > .css-1pcexqc-container > .css-bg1rzq-control > .css-1hwfws3').should('exist');
        cy.get('#UsageDetails').find(':nth-child(2) > .css-1pcexqc-container > .css-bg1rzq-control > .css-1hwfws3').click();
        cy.get('#UsageDetails').find('#react-select-5-option-0').should('exist');
        cy.get('#UsageDetails').find('#react-select-5-option-0').click();

        // should be able to click on the cross button inside the multi select name field
        cy.get('#UsageDetails').find('.css-1alnv5e').click(); 

    })

    
    it('should able to change start date and check if able to click previous month and next month button click working',()=>{
        
        cy.get('#UsageDetailsTab').click();
        // cy.wait(1000);
        // cy.get('#UsageDetails').find(':nth-child(3) > .react-datepicker-wrapper > .react-datepicker__input-container > .custom-date');
        
        // start date should be able to select 
        cy.wait(1000);
        cy.get('#UsageDetails').find(':nth-child(3) > .react-datepicker-wrapper > .react-datepicker__input-container > .custom-date').should('exist');
        cy.get('#UsageDetails').find(':nth-child(3) > .react-datepicker-wrapper > .react-datepicker__input-container > .custom-date').click();

        //Checking if the date picker is able to select 4 previous month;
        cy.get('#UsageDetails').find('.react-datepicker__navigation--previous').click();
        cy.wait(1000);
        cy.get('#UsageDetails').find('.react-datepicker__navigation--previous').click();
        cy.wait(1000);
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
  
    })

    it('should be able to select end date and check if able to click previous month and next month button click working',()=>{
        cy.get('#UsageDetailsTab').click();
        //  end date should be able to select    
        cy.wait(1000);
        cy.get('#UsageDetails').find(':nth-child(4) > .react-datepicker-wrapper > .react-datepicker__input-container > .custom-date').should('exist');
        cy.get('#UsageDetails').find(':nth-child(4) > .react-datepicker-wrapper > .react-datepicker__input-container > .custom-date').click();
        cy.wait(1000);

        // //should be able to select previous month and chose date.
         cy.get('#UsageDetails').find('.react-datepicker__navigation--previous').click();
         cy.get('#UsageDetails').find('.react-datepicker__navigation--previous').click();
         cy.wait(1000);
         cy.get('#UsageDetails').find('.react-datepicker__day--015').click();

         cy.wait(1000);
         cy.get('#UsageDetails').find(':nth-child(4) > .react-datepicker-wrapper > .react-datepicker__input-container > .custom-date').click();
         cy.wait(1000);
         cy.get('#UsageDetails').find('.react-datepicker__navigation--next').click();
         cy.wait(1000);
         cy.get('#UsageDetails').find('.react-datepicker__day--015').click();

         
    })

    it('should able to download CSV on click',()=>{
        cy.get('#UsageDetailsTab').click();
        // cy.get('#').click();
        // cy.get('#Download').click();
        // cy.wait(2000);
        
    // cy.get('#UsageDetails').find('#Download').trigger('mouseover').click();

    })
})