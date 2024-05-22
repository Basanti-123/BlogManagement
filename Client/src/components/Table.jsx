const ListTable = ({headers, data}) => {
    const head = headers.length > 0? headers : [] ;
  return (
     <table className="table table-striped table-bordered">
    <thead>
    <tr>
    <th scope="col">#</th>
    {head.map(h =>
    {
    return (
     <th scope="col" key={h}>{h}</th>
     )
                                                        
     }  )}
    </tr>
     </thead>
  <tbody>
 <tr>
     <th scope="row">1</th>
      <td>How to be a Good Developer?</td>
     <td>Author</td>
     <td>Published</td>
     <td>13th feb, 2024</td>
    <button className="bt btn-primary btn-sm">
    <td className="text-center"> <i fa fa-eye></i></td>
     </button>
    <button className="bt btn-danger btn-sm">
    <td className="text-center"> <i fa fa-trash></i></td>
        </button>
        </tr>
         </tbody>
        </table>

  )
}

export default ListTable
