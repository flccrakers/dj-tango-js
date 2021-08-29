export function getTranslate(locale) {
  return function (keyToTranslate) {
    let ret = "";
    let position = 0;

    for (let i in locale.language) {
      if (locale.language[i]["active"] === true) position = i;
    }

    if (!locale.translations[keyToTranslate] || !locale.translations[keyToTranslate][position]) {
      ret =
        "Missing localized key " +
        keyToTranslate +
        " for language " +
        locale.language[position]["code"];
    } else {
      ret = locale.translations[keyToTranslate][position];
    }
    return ret;
  };
}

export function convertDatabaseLanguageIntoNormalised(languageCode: string) {
  switch (languageCode) {
    case'en-US': {
      return 'en-us'
    }
    case'fr-FR': {
      return 'fr-fr'
    }
    default:
      return languageCode
  }
}

export function convertNormalisedLanguageIntoDatabase(languageCode: string) {
  switch (languageCode) {
    case'en-us': {
      return 'en-US'
    }
    case'fr-fr': {
      return 'fr-FR'
    }
    default:
      return languageCode
  }
}
