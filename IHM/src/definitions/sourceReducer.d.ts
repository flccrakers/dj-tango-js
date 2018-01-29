interface sourceReducer {
    isImporting: boolean,
    tangoList: tango[],
    listRowHeight: number,
    overscanRowCount: number,
    scrollToIndex: number,
    showScrollingPlaceholder: boolean,
    useDynamicRowHeight: boolean,
    sortingField: string,
    /**
     * the state of the sort:
     * 0 - none
     * 1 - ASC (ascendant)
     * 2 - DES (descendant)
     */
    sortingStatus: number,
    anchorEl: sourceAnchorDTO,
    selectedIndex: selectedIndexSourceDTO,
    filterList:object,

}

interface selectedIndexSourceDTO {
    artist: number,
    album: number,
    singer: number,
    genre: number
}

interface sourceAnchorDTO {
    artist: object,
    album: object,
    singer: object,
    genre: object,
}

interface sortDTO {
    NONE: number,
    ASC: number,
    DESC: number,
}