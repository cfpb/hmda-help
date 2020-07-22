let { HH_HOST, HH_USERNAME, HH_PASSWORD, HH_INSTITUTION } = Cypress.env()

describe('Institution', () => {
  it('Can update existing', () => {
    // Debug Env
    cy.log(HH_HOST)
    cy.log(HH_USERNAME)
    cy.log(HH_PASSWORD)
    cy.log(HH_INSTITUTION)

    // Log In
    cy.viewport(1600, 900)
    cy.visit(HH_HOST)
    cy.findByLabelText('Email').type(HH_USERNAME)
    cy.findByLabelText('Password').type(HH_PASSWORD, { log: false })
    cy.findByText('Log In').click()

    // Search for existing Instititution
    /* TODO: Search by Label instead of ID once those changes are live */
    cy.get('#lei').type(HH_INSTITUTION)
    cy.findByText('Search institutions').click()
    cy.findAllByText('Update')
      .first()
      .click()

    const testName = 'Cypress Test Name Update'

    cy.get('#respondentName').then($name => {
      const savedName = $name.attr('value')
      expect($name.attr('value')).to.not.contain(testName)

      // Change Respondent Name
      cy.get('#respondentName')
        .type('{selectAll}' + testName)
        .blur()
        .then($name2 => {
          cy.findByText('Update the institution')
            .should('be.enabled')
            .click()
            .then(() => {
              // Validate
              cy.get('.alert-success')
                .should('exist')
                .then(() => {
                  expect($name2.attr('value')).to.contain(testName)
                })
            })
        })

      // Change it back
      cy.get('#respondentName')
        .type('{selectAll}' + savedName)
        .blur()
        .then(() => {
          cy.findByText('Update the institution')
            .should('be.enabled')
            .click()
            .then(() => {
              // Validate
              cy.get('.alert-success')
                .should('exist')
                .then(() => {
                  expect($name.attr('value')).to.contain(savedName)
                })
            })
        })
    })
  })
})
