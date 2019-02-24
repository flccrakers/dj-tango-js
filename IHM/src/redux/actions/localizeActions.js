export function initialize(languages) {

  let ret = [];
  for (let i in languages) {
    if (languages.hasOwnProperty(i)) {
      let active = true;
      if (i > 0) active = false;
      ret.push({code: languages[i], active: active})
    }
  }
  return {
    type: 'INITIALIZE',
    payload: ret
  }
}

export function addTranslationForLanguage(langResource, lang) {
  let ret = {resource: langResource, code: lang};
  return {
    type: 'ADD_TRANSLATION_FOR_LANGUAGE',
    payload: ret,

  }
}

export function setActiveLanguage(language) {
  return {
    type: 'SET_ACTIVE_LANGUAGE',
    payload: language,
  }
}