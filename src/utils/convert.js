const flattenApiForState = json => {
  const state = {
    activityYear: json.activityYear || 2018,
    lei: json.lei || '',
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

const nestStateForApi = institution => {
  const api = {
    activityYear: 2018,
    lei: institution.lei.value || '',
    agency: parseInt(institution.agency.value, 10) || -1,
    taxId: institution.taxId.value || '',
    emailDomains: Array.isArray(institution.emailDomains.value)
      ? institution.emailDomains.value
      : institution.emailDomains.value
      ? [institution.emailDomains.value]
      : [],
    respondent: {
      name: institution.respondentName.value || ''
      /*state: institution.respondentState.value || '',
      city: institution.respondentCity.value || ''*/
    },
    /*institutionType: parseInt(institution.institutionType.value, 10) || -1,
    institutionId2017: institution.institutionId2017.value || '',
    
    rssd: parseInt(institution.rssd.value, 10) || -1,
    
    parent: {
      idRssd: parseInt(institution.parentIdRssd.value, 10) || -1,
      name: institution.parentName.value || ''
    },
    assets: parseInt(institution.assets.value, 10) || -1,
    otherLenderCode: parseInt(institution.otherLenderCode.value, 10) || -1,
    topHolder: {
      idRssd: parseInt(institution.topHolderIdRssd.value, 10) || -1,
      name: institution.topHolderName.value || ''
    },*/
    hmdaFiler: false
  }
  return api
}

export { nestStateForApi, flattenApiForState }
