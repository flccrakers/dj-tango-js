import * as preferencesService from '../../services/preferences-management';
export function updatePreferences(preferences:preferencesDTO) {
  return {
    type: 'UPDATE_PREFERENCES',
    payload: preferences
  }
}

export function fetchPreferences() {
  return function (dispatch){
    preferencesService.getPreferences().then(preferences=>{
      console.log(preferences);
      dispatch(updatePreferences(preferences));
    });
  };
}

export function updatePreferencesInDB(preferences:preferencesDTO){
  return function (dispatch){
    preferencesService.updatePreferences(preferences).then(result=>{
      console.log(result);
    })


  }
}

export function setActiveLanguage(language) {
  return {
    type: 'SET_ACTIVE_LANGUAGE',
    payload: language,
  }
}