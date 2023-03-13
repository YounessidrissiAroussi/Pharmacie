import React , {useEffect , useState} from 'react'
import axios from "axios"
import { Link , useParams , useLocation } from 'react-router-dom'


function DetailOrdonnance() {
  const {id} = useParams()
  const Patient = useLocation().state.data
  const [detail , setDetail] = useState([])
  const DetailO = () =>{
    axios.get(`http://localhost/pharmacie/backend/tables/DetailsOrdonnance.php/${id}`)
    .then(res=>{
      setDetail(res.data)
    })
  }
  useEffect(()=>{
    DetailO()
    
  },[])
  const mapping = detail && detail.map((item , index)=>{
    return(
      <tr key={index}>
        <td>
        {item.nomcommercial}
        </td>
        <td>
          {
            item.ppm
          }
        </td>
        <td>
        {
          item.qte
        }
        </td>
      </tr>
    )
  })
    return (

      <div className="container mt-2">
         <Link to={"/Ordonnance"} className="btn btn-danger mx-2 mb-2"><i className="fa fa-share"></i></Link>
        <h1>{Patient?.nom}</h1>
        <table className="table table-fixed">
          <thead>
            <tr>
                <th>
                  Nom de Produit
                </th>
                <th>
                  Prix
                </th>
                <th>
                  Qte
                </th>
            </tr>
            {mapping}
          </thead>
        </table>
      </div>
    
  )
}
export default DetailOrdonnance