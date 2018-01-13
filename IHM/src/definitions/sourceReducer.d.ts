interface sourceReducer {
    isImporting: boolean,
    tangoList:tango[],
    listRowHeight: number,
    overscanRowCount: number,
    scrollToIndex: number,
    showScrollingPlaceholder: boolean,
    useDynamicRowHeight: boolean,
    sortingField:string,
    /**
     * the state of the sort:
     * 0 - none
     * 1 - ASC (ascendant)
     * 2 - DES (descendant)
     */
    sortingStatus:number,

}

interface sortDTO {
    NONE:number,
    ASC:mumber,
    DESC:number,
}