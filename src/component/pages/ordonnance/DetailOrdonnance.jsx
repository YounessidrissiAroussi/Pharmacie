import React, { useState  , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
function DetailOrdonnance() {
  const {id} = useParams()
  const [data , setData] =useState([]) 
  const GetOrdannance = () =>{
      axios.get('http://localhost/Pharmacie/backend/tables/DetailsOrdonnance.php')
      .then((item)=>{
        setData(item.data)
      })
  }
 
  useEffect(()=>{
    GetOrdannance()
  },[])
  return (
    <div>DetailOrdonnance</div>
  )
}

export default DetailOrdonnance