import React, { Component } from 'react'

import InputSubmit from './InputSubmit'
import SearchResults from './SearchResults'

class SearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lei: '',
      taxId: '',
      name: '',
      institutions: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(searchData) {
    // TODO: make api call for institutions

    // not found
    /*
    this.setState({ institutions: [] })
    //*/

    // 2018 found
    /*
    this.setState({
      institutions: [
        {
          activityYear: 2018,
          lei: '12345678901234567890',
          agencyCode: 1,
          institutionType: 11,
          institutionId2017: '12345',
          taxId: '12-345678',
          RSSD: '12345',
          emailDomains: ['bank2.com', 'bank2-a.com'],
          respondentName: 'Bank 2',
          respondentState: 'DC',
          respondentCity: 'Washington',
          parentIdRSSD: 87654,
          parentName: 'Bank 2 Parent',
          assets: 23423,
          otherLenderCode: 1,
          topHolderIdRSSD: 564453,
          topHolderName: 'Bank 2 Top Holder'
        }
      ]
    })
    //*/

    // 2017 found (not found for 2018)
    //*
    this.setState({
      institutions: [
        {
          activityYear: 2017,
          lei: '09876543210987654321',
          agencyCode: 2,
          institutionType: 10,
          institutionId2017: '09876',
          taxId: '09-8765432',
          RSSD: '09876',
          emailDomains: ['bank1.com'],
          respondentName: 'Bank 1',
          respondentState: 'PA',
          respondentCity: 'Fayetteville',
          parentIdRSSD: 34567,
          parentName: 'Bank 1 Parent',
          assets: 74348,
          otherLenderCode: 0,
          topHolderIdRSSD: 324532,
          topHolderName: 'Bank 1 Top Holder'
        }
      ]
    })
    //*/
  }

  render() {
    return (
      <React.Fragment>
        <form
          onSubmit={event => {
            event.preventDefault()
            this.handleSubmit(this.state)
          }}
        >
          <label>LEI</label>
          <input
            type="text"
            name="lei"
            id="lei"
            value={this.state.lei}
            onChange={this.handleChange}
          />
          <label>Tax Id</label>
          <input
            type="text"
            name="taxId"
            id="taxId"
            value={this.state.taxId}
            onChange={this.handleChange}
          />
          <label>Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <InputSubmit actionType="search" />
        </form>
        <SearchResults results={this.state} />
      </React.Fragment>
    )
  }
}

export default SearchForm
