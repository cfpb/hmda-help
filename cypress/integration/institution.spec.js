const {
  HH_HOST,
  HH_USERNAME,
  HH_PASSWORD,
  HH_INSTITUTION,
  HH_AUTH_URL,
  HH_AUTH_REALM,
  HH_AUTH_CLIENT_ID
} = Cypress.env()

describe('Institution', () => {
  beforeEach(() => {
    cy.login({
      root: HH_AUTH_URL,
      realm: HH_AUTH_REALM,
      client_id: HH_AUTH_CLIENT_ID,
      redirect_uri: HH_HOST,
      username: HH_USERNAME,
      password: HH_PASSWORD
    })
  })

  afterEach(() => {
    cy.logout({
      root: HH_AUTH_URL,
      realm: HH_AUTH_REALM,
      redirect_uri: HH_HOST
    })
  })

  it('Can update existing', () => {
    cy.viewport(1600, 900)
    cy.visit(HH_HOST)

    // Search for existing Instititution
    cy.findByLabelText("LEI").type(HH_INSTITUTION)
    cy.findByText('Search institutions').click()
    cy.findAllByText('Update')
      .first()
      .click()

    const successMessage = 'The institution, FRONTENDTESTBANK9999, has been updated.'
    const nameLabelText = 'Respondent Name'
    const updateButtonText = 'Update the institution'
    const testName = 'Cypress Test Name Update'

    cy.findByLabelText(nameLabelText).then($name => {
      const savedName = $name.attr('value')
      expect($name.attr('value')).to.not.contain(testName)

      // Change Respondent Name
      cy.findByLabelText(nameLabelText)
        .type('{selectAll}' + testName)
        .blur()
        .then($name2 => {
          cy.findByText(updateButtonText)
            .should('be.enabled')
            .click()
            .then(() => {
              // Validate
              cy.findAllByText(successMessage)
                .should('exist')
                .then(() => {
                  expect($name2.attr('value')).to.contain(testName)
                })
            })
        })

      // Change it back
      cy.findByLabelText(nameLabelText)
        .type('{selectAll}' + savedName)
        .blur()
        .then(() => {
          cy.findByText(updateButtonText)
            .should('be.enabled')
            .click()
            .then(() => {
              // Validate
              cy.findAllByText(successMessage)
                .should('exist')
                .then(() => {
                  expect($name.attr('value')).to.contain(savedName)
                })
            })
        })
    })
  })
})
