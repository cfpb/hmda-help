import React from 'react'

const backToUpdate = event => {
  event.preventDefault()

  // if at /add we need to link, not just update state
  // we have to go to /update, but keep the state
  // so we use history.push(pathname: pathname, state: {})
  if (this.props.location.pathname === '/add') {
    this.props.history.push({
      pathname: '/update',
      state: { institution: this.state }
    })
  }

  // this works if we're at /update
  this.setState({
    isSubmitted: false
  })
}

const Success = props => {
  return (
    <React.Fragment>
      <h3>Institution {props.action}</h3>
      <dl>
        <dt>LEI</dt>
        <dd>{props.institution.LEI}</dd>
        <dt>Name</dt>
        <dd>{props.institution.respondentName || 'NA'}</dd>
        <dt>Agency Code</dt>
        <dd>{props.institution.agency || 'NA'}</dd>
        <dt>Type</dt>
        <dd>{props.institution.institutionType || 'NA'}</dd>
        <dt>2017 Id</dt>
        <dd>{props.institution.institutionId2017 || 'NA'}</dd>
        <dt>Tax Id</dt>
        <dd>{props.institution.taxId || 'NA'}</dd>
        <dt>RSSD</dt>
        <dd>{props.institution.rssd || 'NA'}</dd>
        <dt>Email Domain(s)</dt>
        <dd>{props.institution.emailDomains || 'NA'}</dd>
        <dt>State</dt>
        <dd>{props.institution.respondentState || 'NA'}</dd>
        <dt>City</dt>
        <dd>{props.institution.respondentCity || 'NA'}</dd>
        <dt>Parent RSSD</dt>
        <dd>{props.institution.parentIdRssd || 'NA'}</dd>
        <dt>Parent Name</dt>
        <dd>{props.institution.parentName || 'NA'}</dd>
        <dt>Assets</dt>
        <dd>{props.institution.assets || 'NA'}</dd>
        <dt>Other Lender Code</dt>
        <dd>{props.institution.otherLenderCode || 'NA'}</dd>
        <dt>Top Holder RSSD</dt>
        <dd>{props.institution.topHolderIdRssd || 'NA'}</dd>
        <dt>Top Holder Name</dt>
        <dd>{props.institution.topHolderName || 'NA'}</dd>
      </dl>
    </React.Fragment>
  )
}

export default Success
