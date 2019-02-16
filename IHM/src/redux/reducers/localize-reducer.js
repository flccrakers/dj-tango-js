import flatten from "flat";

export default function reducer(state = {
                                  language: [], //code:code, active:active
                                  translations: {} //KEY:[lang0, lang1, lang2]
                                },
                                action) {
  switch (action.type) {
    case "INITIALIZE": {
      return { ...state, language: action.payload };
    }
    case "ADD_TRANSLATION_FOR_LANGUAGE": {
      let position = 0;
      let ret = state.translations;

      state.language.forEach((element, index) => {
        if (element.code === action.payload.code) position = index;
      });
      let translatedResource = flatten(action.payload.resource);

      for (let k in translatedResource) {
        if (translatedResource.hasOwnProperty(k)) {
          if (!ret[k]) {
            ret[k] = [null, null, null];
          }
          ret[k][position] = translatedResource[k];
        }
      }
      return { ...state, translations: ret };
    }
    case "SET_ACTIVE_LANGUAGE": {
      let language = state.language;
      language.forEach((element) => {
        element["active"] = element.code === action.payload;
      });
      return { ...state, language: language };
    }
    case "persist/REHYDRATE": {
      if (action.payload.locale !== undefined) {
        return { ...state, language: action.payload.locale.language };
      } else {
        return { ...state };
      }
    }

    default: {
      return { ...state };
    }
  }
}
