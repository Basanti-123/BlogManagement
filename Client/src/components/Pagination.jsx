import Pagination from 'react-bootstrap/Pagination';
import { usePagination, DOTS } from '../hooks/usePagination';

export const Paginate = ({
    limit,
    total,
    currentPage,
    setCurrentPage,
    setLimit,

}) => {

    let active = currentPage;
    let items = [];
    const totalNumberOfPages = Math.ceil(total/limit);
    for(let number=1; number<=totalNumberOfPages; number++){
        
       items.push (
       <Pagination.Item 
       key={number} 
       active={number === active}onClick={()=>{
            setCurrentPage(number)
        }}
        >
            {number}   
    </Pagination.Item>
       ) 
}
const PaginationRange = usePagination({
  currentPage,
  totalCount: total,
  siblingCount: 1,
  pageSize: limit,
});
  
if (currentPage === 0 || total ===0 ) {
    return null;
}
  return (
    <div className="d-flex justify-content-center">
     <div>
        <Pagination>
     <Pagination.First 
     disabled={currentPage===1} 
     onClick={()=>{
      setCurrentPage(1);
    }}
    />
      <Pagination.Prev 
      disabled={currentPage===1} 
      onClick={()=>{
      currentPage !==1? setCurrentPage(currentPage-1) :null;
    }} 
    />

  {PaginationRange.map((number, index) => {
    if(number===DOTS) {
      return <Pagination.Ellipsis key={`${index}-${number}`}/>;
    }
     return (
      <Pagination.Item key={number} 
      onClick={()=> setCurrentPage(number)}
      active={currentPage===number}>
        {number}
      </Pagination.Item>
     );
  })}
   

    {/* {items.map((item, index) => {
    return(
    <div className="page-item" key={index}>
      {item}
      
      </div>
      );
      })} */}



      <Pagination.Next
       disabled={currentPage===totalNumberOfPages} 
      onClick={()=>{currentPage !==totalNumberOfPages 
      ? setCurrentPage(currentPage+1) :null
      }}
       />

      <Pagination.Last 
      disabled={currentPage===totalNumberOfPages} 
      onClick={()=>{
        currentPage !==totalNumberOfPages 
      ? setCurrentPage(totalNumberOfPages) :null;
      }}
      />
      </Pagination>

  </div>
  
        <nav className="px-2">
          <select className="from-select" 
          onChange={(e)=>setLimit(Number(e.target.value))}
          value={limit}>

            <option value={12}>12</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            </select>  
        </nav>
    </div>
  );
};


