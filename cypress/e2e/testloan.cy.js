describe('Loan App', () => {
  const loanData = {
    name: "Charles David",
    age: "30",
    occupation: "Software Engineer",
    loan_amount: "50000",
    monthly_income: "100000",
    monthly_expenses: "40000",
    existing_loans: "20000",
    sacco_savings: "15000",
    loan_purpose: "Home Renovation",
    message: "I need this loan to renovate my kitchen."
  }

  beforeEach(() =>{
    cy.visit("/")
    cy.viewport(1280, 720)
  })

 it("contains correct header text", () => {
  // cy.get('[data-test="ujima-sacco-loan-header"]').contains("Ujima SACCO Loan System")
  // cy.get('[data-test="ujima-sacco-loan-header"]').should("contain.text", "Ujima SACCO Loan System")
  cy.getDataTest("ujima-sacco-loan-header").should("contain.text", "Ujima SACCO Loan System")
 })


  it("form should be visible and contain correct fields", () => {
    cy.getDataTest("loan-form").should("be.visible")
    cy.getDataTest("loan-form").within(() => {
      cy.getDataTest("form-name").should("be.visible")
      cy.getDataTest("form-age").should("be.visible")
      cy.getDataTest("form-occupation").should("be.visible")
      cy.getDataTest("form-loan-amount").should("be.visible")
      cy.getDataTest("form-monthly-income").should("be.visible")
      cy.getDataTest("form-monthly-expense").should("be.visible")
      cy.getDataTest("form-existing-loans").should("be.visible")
      cy.getDataTest("form-sacco-savings").should("be.visible")
      cy.getDataTest("form-loan-purpose").should("be.visible")
      cy.getDataTest("form-message").should("be.visible")
    })
  })

  it("should allow user to fill out the form and submit", () => {
   
    cy.getDataTest("loan-form").within(() => {
      cy.getDataTest("form-name").type(loanData.name)
      cy.getDataTest("form-age").type(loanData.age)
      cy.getDataTest("form-occupation").type(loanData.occupation)
      cy.getDataTest("form-loan-amount").type(loanData.loan_amount)
      cy.getDataTest("form-monthly-income").type(loanData.monthly_income)
      cy.getDataTest("form-monthly-expense").type(loanData.monthly_expenses)
      cy.getDataTest("form-existing-loans").type(loanData.existing_loans)
      cy.getDataTest("form-sacco-savings").type(loanData.sacco_savings)
      cy.getDataTest("form-loan-purpose").type(loanData.loan_purpose)
      cy.getDataTest("form-message").type(loanData.message)
      cy.getDataTest("form-run-analysis-button").as("submitButton")
      cy.get("@submitButton").should("not.be.disabled").click()
    })


    cy.contains("Analysis completed successfully").should("be.visible")

  })

  it("navigation bar should be visible", () => {
  cy.getDataTest("side-bar").should("be.visible")
  cy.getDataTest("side-bar").should("contain.text", "Navigation")
  cy.getDataTest("navigation-links").should("be.visible")
  cy.getDataTest("navigation-links").within(()=>{
    cy.contains("Dashboard")
    cy.contains("Analytics")
  })
 })

 it("navigating to multiple pages", ()=>{
  cy.location("pathname").should("eq", "/")
  cy.window().then((window) => {
    window.localStorage.setItem("ujima_data", JSON.stringify([loanData]))
  })
  cy.getDataTest("analytics-link").as("analyticsLink")
  cy.get("@analyticsLink").click()
  cy.location("pathname").should("eq", "/analytics")
  cy.contains(/analytics dashboard/i).should("be.visible")

 })

})