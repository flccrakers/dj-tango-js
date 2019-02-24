interface playerReducer {
    /**
     * The tango which is currently played
     */
    currentTango:tango,
    /**
     * The url of the file to play
     */
    currentTangoSong:string,
    /**
     * The player DOM tag
     */
    playerEl:string,
    /**
     * The progress in milliseconds of the current song
     */
    progress:number,
}