import { useMemo } from "react";

export const DOTS = "...";


const range =(start,end) => {
    let length = end - start + 1;
    // create an Array of certain length and set the elements within it from start to end value
    return Array.from({length},(_, idx) => idx +start); //[1,2]
};


export const usePagination =({totalCount, pageSize, siblingCount = 1, currentPage,
}) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount/pageSize);
        const totalPageNumbers = siblingCount+5;

// if page number is less than the page number we want to show, we return [1,2,3]

        if(totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(currentPage -siblingCount, 1);
        const rightSiblingIndex = Math.min(
            currentPage +siblingCount,
            totalPageCount 
        );
   

    const shouldShowLeftDots = leftSiblingIndex>2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount-2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;


    // Case 1
    if (shouldShowLeftDots && !shouldShowLeftDots) {
        let rightItemCount = 3+2*siblingCount;
        let rightRange = range(
            totalPageCount-rightItemCount+1,
            totalPageCount
        )

        return [firstPageIndex, DOTS, ...rightRange]
    }
    
   // Case 2
    if(!shouldShowLeftDots && shouldShowRightDots){
        let leftItemCount = 3+2*siblingCount;
        let leftRange = range(
       1, leftItemCount);
       return [...leftRange, DOTS,totalPageCount]
    }
    
    // Case 3
    if(shouldShowLeftDots && shouldShowRightDots){
        let middleRange =  range(leftSiblingIndex, rightSiblingIndex);
        return[firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }

    },[totalCount, pageSize, siblingCount, currentPage]);
    return paginationRange;
};



