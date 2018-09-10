const flattenApiForState = json => {
  const state = {
    activityYear: json.activityYear || '',
    LEI: json.LEI || '',
    agency: json.agency || '',
    institutionType: json.institutionType || '',
    institutionId2017: json.institutionId2017 || '',
    taxId: json.taxId || '',
    rssd: json.rssd || '',
    emailDomains: json.emailDomains || '',
    respondentName: json.respondent.name || '',
    respondentState: json.respondent.state || '',
    respondentCity: json.respondent.city || '',
    parentIdRssd: (json.parent && json.parent.idRssd) || '',
    parentName: (json.parent && json.parent.name) || '',
    assets: json.assets || '',
    otherLenderCode: json.otherLenderCode || '',
    topHolderIdRssd: (json.topHolder && json.topHolder.idRssd) || '',
    topHolderName: (json.topHolder && json.topHolder.name) || ''
  }
  return state
}

const nestStateForApi = state => {
  const api = {
    activityYear: 2018,
    LEI: state.LEI || '',
    agency: state.agency || '',
    institutionType: state.institutionType || '',
    institutionId2017: state.institutionId2017 || '',
    taxId: state.taxId || '',
    rssd: state.rssd || '',
    emailDomains: Array.isArray(state.emailDomains)
      ? state.emailDomains
      : state.emailDomains ? [state.emailDomains] : [],
    respondent: {
      name: state.respondentName || '',
      state: state.respondentState || '',
      city: state.respondentCity || ''
    },
    parent: {
      idRssd: state.parentIdRssd || '',
      name: state.parentName || ''
    },
    assets: state.assets || '',
    otherLenderCode: state.otherLenderCode || '',
    topHolder: {
      idRssd: state.topHolderIdRssd || '',
      name: state.topHolderName || ''
    },
    hmdaFiler: true
  }
  return api
}

export { nestStateForApi, flattenApiForState }
