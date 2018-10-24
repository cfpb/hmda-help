const flattenApiForState = json => {
  const state = {
    activityYear: json.activityYear || 2018,
    LEI: json.LEI || '',
    agency: json.agency || -1,
    institutionType: json.institutionType || -1,
    institutionId2017: json.institutionId2017 || '',
    taxId: json.taxId || '',
    rssd: json.rssd || -1,
    emailDomains: json.emailDomains || [],
    respondentName: json.respondent.name || '',
    respondentState: json.respondent.state || '',
    respondentCity: json.respondent.city || '',
    parentIdRssd: (json.parent && json.parent.idRssd) || -1,
    parentName: (json.parent && json.parent.name) || '',
    assets: json.assets || -1,
    otherLenderCode: json.otherLenderCode || -1,
    topHolderIdRssd: (json.topHolder && json.topHolder.idRssd) || -1,
    topHolderName: (json.topHolder && json.topHolder.name) || ''
  }
  return state
}

const nestStateForApi = state => {
  const api = {
    activityYear: 2018,
    LEI: state.LEI || '',
    agency: parseInt(state.agency, 10) || -1,
    institutionType: parseInt(state.institutionType, 10) || -1,
    institutionId2017: state.institutionId2017 || '',
    taxId: state.taxId || '',
    rssd: parseInt(state.rssd, 10) || -1,
    emailDomains: Array.isArray(state.emailDomains)
      ? state.emailDomains
      : state.emailDomains ? [state.emailDomains] : [],
    respondent: {
      name: state.respondentName || '',
      state: state.respondentState || '',
      city: state.respondentCity || ''
    },
    parent: {
      idRssd: parseInt(state.parentIdRssd, 10) || -1,
      name: state.parentName || ''
    },
    assets: parseInt(state.assets, 10) || -1,
    otherLenderCode: parseInt(state.otherLenderCode, 10) || -1,
    topHolder: {
      idRssd: parseInt(state.topHolderIdRssd, 10) || -1,
      name: state.topHolderName || ''
    },
    hmdaFiler: true
  }
  return api
}

export { nestStateForApi, flattenApiForState }
