import * as prerencesService from '../../services/preferences-management';
export function UPDATE_PREFERENCES(preferences:preferencesDTO) {
  return {
    type: 'UPDATE_PREFERENCES',
    payload: preferences
  }
}

export function fetchPreferences() {
  return function (dispatch){
    prerencesService.getPreferences().then(preferences=>{
      console.log(preferences);
    });
  };

}

export function setActiveLanguage(language) {
  return {
    type: 'SET_ACTIVE_LANGUAGE',
    payload: language,
  }
}