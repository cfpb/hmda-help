/** 
 * Extract the String value of the selected <option> of a <select> element
 * @param jqueryInitObj Cypress jQuery select object
 * @param defaultValue Value returned if no selection has been made
**/
export function getSelectedOptionValue(jqueryInitObj, defaultValue) {
  if (
    !jqueryInitObj ||
    !jqueryInitObj.get(0) ||
    !jqueryInitObj.get(0).selectedOptions ||
    !jqueryInitObj.get(0).selectedOptions.item(0)
  )
    return defaultValue
  
  return jqueryInitObj.get(0).selectedOptions.item(0).value
}