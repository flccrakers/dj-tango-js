export default function reducer(
  state = {
    baseDir: "",
    newSongAvailable: false,
    normalize: true,
    timeCortina: 56,
    timeFadOut: 6,
    writeId3Tag: true
  },
  action) {
  switch (action.type) {
    case "UPDATE_PREFERENCES": {
      return action.payload;
    }


    default: {
      return {...state};
    }
  }
}
