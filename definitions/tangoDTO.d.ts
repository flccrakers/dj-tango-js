interface tangoDTO {
    /** id of the tango*/
    id: number;
    /** the path of the tango */
    path: string;
    /** Title of the the song */
    title: string;
    /** The Artist of the song*/
    artist: string;
    /** The Album of the song*/
    album: string;
    /** The type of the song*/
    genre: string;
    /** the year of the song
     * by default it's set to 0
     */
    year: number;
    /**
     * The beat par minute set by a human
     * by default it's set to 0
     */
    bpmHuman: number;
    /**
     * The beat par minute set from file
     * by default it's set to 0
     */
    bpmFromFile: number;
    /**
     * duration in milliseconds
     */
    duration: number;
    /** The singer. Default value: Unknown */
    singer: string;
    /** The composer. Default value: Unknown */
    composer: string;
    /** The autor. Default value: Unknown */
    author: string;
    /**
     * the time when the music really start
     * Default value is 0
     */
    start: number;
    /**
     * The time when the music is finished
     * Default value is 0
     */
    end: number;
    /**
     * The size of the file in path
     */
    fileSize:number;
}