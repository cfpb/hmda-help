import React from 'react'

const OtherFields = props => {
  return (
    <React.Fragment>
      <h2>
        Note: if these fields need modified please update the ticket to get help
        from Tier 2 support!
      </h2>
      <label>Institution Type</label>
      <input
        type="text"
        name="institutionType"
        id="institutionType"
        value={props.formData.institutionType}
        onChange={props.handleChange}
      />
      <label>Institution ID 2017</label>
      <input
        type="text"
        name="institutionId2017"
        id="institutionId2017"
        value={props.formData.institutionId2017}
        onChange={props.handleChange}
      />
      <label>RSSD</label>
      <input
        type="text"
        name="rssd"
        id="rssd"
        value={props.formData.rssd}
        onChange={props.handleChange}
      />
      <label>Respondent State</label>
      <input
        type="text"
        name="respondentState"
        id="respondentState"
        value={props.formData.respondentState}
        onChange={props.handleChange}
      />
      <label>Respondent City</label>
      <input
        type="text"
        name="respondentCity"
        id="respondentCity"
        value={props.formData.respondentCity}
        onChange={props.handleChange}
      />
      <label>Parent ID RSSD</label>
      <input
        type="text"
        name="parentIdRssd"
        id="parentIdRssd"
        value={props.formData.parentIdRssd}
        onChange={props.handleChange}
      />
      <label>Parent Name</label>
      <input
        type="text"
        name="parentName"
        id="parentName"
        value={props.formData.parentName}
        onChange={props.handleChange}
      />
      <label>Assets</label>
      <input
        type="text"
        name="assets"
        id="assets"
        value={props.formData.assets}
        onChange={props.handleChange}
      />
      <label>Other Lender Code</label>
      <input
        type="text"
        name="otherLenderCode"
        id="otherLenderCode"
        value={props.formData.otherLenderCode}
        onChange={props.handleChange}
      />
      <label>Top Holder ID RSSD</label>
      <input
        type="text"
        name="topHolderIdRssd"
        id="topHolderIdRssd"
        value={props.formData.topHolderIdRssd}
        onChange={props.handleChange}
      />
      <label>Top Holder Name</label>
      <input
        type="text"
        name="topHolderName"
        id="topHolderName"
        value={props.formData.topHolderName}
        onChange={props.handleChange}
      />
    </React.Fragment>
  )
}

export default OtherFields
