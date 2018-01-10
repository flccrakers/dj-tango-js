interface sourceReducer {
    isImporting: boolean,
    importedFile: string,
    /**
     * indicate the percentage of success when loading a file.
     * the default value is 0 the max value is 100
     */
    percentEnded: number,
}