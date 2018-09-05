import React from 'react'

import './Success.css'

const Success = props => {
  return (
    <div className="success">
      <h3>Institution {props.action}</h3>
      <dl>
        <dt>LEI</dt>
        <dd>{props.institution.LEI}</dd>
        <dt>Name</dt>
        <dd>{props.institution.respondentName || 'NA'}</dd>
        <dt>Email Domain(s)</dt>
        <dd>{props.institution.emailDomains || 'NA'}</dd>
        <dt>Tax Id</dt>
        <dd>{props.institution.taxId || 'NA'}</dd>
        <dt>Agency Code</dt>
        <dd>{props.institution.agency || 'NA'}</dd>
      </dl>
      <dl className="otherFields">
        <dt>Type</dt>
        <dd>{props.institution.institutionType || 'NA'}</dd>
        <dt>2017 Id</dt>
        <dd>{props.institution.institutionId2017 || 'NA'}</dd>
        <dt>RSSD</dt>
        <dd>{props.institution.rssd || 'NA'}</dd>
        <dt>Respondent State</dt>
        <dd>{props.institution.respondentState || 'NA'}</dd>
        <dt>Respondent City</dt>
        <dd>{props.institution.respondentCity || 'NA'}</dd>
        <dt>Parent ID RSSD</dt>
        <dd>{props.institution.parentIdRssd || 'NA'}</dd>
        <dt>Parent Name</dt>
        <dd>{props.institution.parentName || 'NA'}</dd>
        <dt>Assets</dt>
        <dd>{props.institution.assets || 'NA'}</dd>
        <dt>Other Lender Code</dt>
        <dd>{props.institution.otherLenderCode || 'NA'}</dd>
        <dt>Top Holder ID RSSD</dt>
        <dd>{props.institution.topHolderIdRssd || 'NA'}</dd>
        <dt>Top Holder Name</dt>
        <dd>{props.institution.topHolderName || 'NA'}</dd>
      </dl>
    </div>
  )
}

export default Success
