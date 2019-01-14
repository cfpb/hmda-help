import states from './states'
import agencyCodes from './agencyCodes'
import institutionTypes from './institutionTypes'
import otherLenderCodes from './otherLenderCodes'

const searchInputs = [
  {
    label: 'LEI',
    id: 'lei',
    name: 'lei',
    defaultValue: '',
    placeholder: '987875HAG543RFDAHG54',
    // order matters
    validation: [
      { type: 'required' },
      { type: 'length', value: 20 },
      // eg, 1234ASDF5678QWER00ZZ (20 characters, uppercase)
      { type: 'regex', value: '([A-Z0-9]{20})' }
    ]
  }
]

const requiredInputs = [
  {
    label: 'Respondent Name',
    id: 'respondentName',
    name: 'respondentName',
    defaultValue: '',
    placeholder: '',
    validation: [{ type: 'required' }]
  },
  {
    label: 'Email Domains',
    id: 'emailDomains',
    name: 'emailDomains',
    defaultValue: '',
    placeholder: ''
  },
  {
    label: 'Tax Id',
    id: 'taxId',
    name: 'taxId',
    defaultValue: '',
    placeholder: '',
    validation: [
      { type: 'required' },
      // 11 is including the dash
      { type: 'length', value: 11 },
      // eg, 99-99999999 (2 characters, followed by a dash, followed by 8 characters)
      { type: 'regex', value: '^([a-zA-Z0-9]{2}-[a-zA-Z0-9]{8})' }
    ]
  },
  {
    label: 'Agency Code',
    id: 'agency',
    name: 'agency',
    defaultValue: '',
    placeholder: '',
    type: 'radio',
    options: agencyCodes,
    validation: [{ type: 'required' }]
  }
]

const otherInputs = [
  {
    label: 'Institution Type',
    id: 'institutionType',
    name: 'institutionType',
    defaultValue: '',
    placeholder: '',
    type: 'select',
    options: institutionTypes
  },
  {
    label: 'Other Lender Code',
    id: 'otherLenderCode',
    name: 'otherLenderCode',
    defaultValue: '',
    placeholder: '',
    type: 'select',
    options: otherLenderCodes
  },
  {
    label: 'Institution ID 2017',
    id: 'institutionId2017',
    name: 'institutionId2017',
    defaultValue: '',
    placeholder: ''
  },
  {
    label: 'RSSD',
    id: 'rssd',
    name: 'rssd',
    defaultValue: '',
    placeholder: ''
  },
  {
    label: 'Respondent State',
    id: 'respondentState',
    name: 'respondentState',
    defaultValue: '',
    placeholder: '',
    type: 'select',
    options: states
  },
  {
    label: 'Respondent City',
    id: 'respondentCity',
    name: 'respondentCity',
    defaultValue: '',
    placeholder: ''
  },
  {
    label: 'Parent ID RSSD',
    id: 'parentIdRssd',
    name: 'parentIdRssd',
    defaultValue: '',
    placeholder: ''
  },
  {
    label: 'Parent Name',
    id: 'parentName',
    name: 'parentName',
    defaultValue: '',
    placeholder: ''
  },
  {
    label: 'Assets',
    id: 'assets',
    name: 'assets',
    defaultValue: '',
    placeholder: ''
  },
  {
    label: 'Top Holder ID RSSD',
    id: 'topHolderIdRssd',
    name: 'topHolderIdRssd',
    defaultValue: '',
    placeholder: ''
  },
  {
    label: 'Top Holder Name',
    id: 'topHolderName',
    name: 'topHolderName',
    defaultValue: '',
    placeholder: ''
  }
]

export { searchInputs, requiredInputs, otherInputs }
