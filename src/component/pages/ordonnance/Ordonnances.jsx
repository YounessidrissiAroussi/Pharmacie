import React , {useEffect} from 'react'
import axios from "axios"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './ordonnance.css'
import Swal from 'sweetalert2'
function Ordonnances() {
    const [ordonnance,setOrdonnance] = useState([])
    const [ordonnanceItem,setOrdonnanceItem] = useState([])
  
  
    function getOrdonnance(){
      axios.get('http://localhost/Pharmacie/backend/tables/Ordonnances.php')
            .then(response =>{
                setOrdonnance(response.data)
                setOrdonnanceItem(response.data)
            })
    }
    useEffect(()=>{
      document.title = "Ordannances"
        getOrdonnance()
    },[])
  
    const deleteOrdonnance = (ids) =>{
      Swal.fire({
        title: 'es-tu sûr ?',
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, Supprimer!',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed){
          Swal.fire(
            'Supprimé!',
            'Notre Ordonnance a été supprimé.',
            'success'
          )
          axios.delete(`http://localhost/Pharmacie/backend/tables/Ordonnances.php/${ids}/delete`)
          .then(response=>{
            console.log(response.data)
            getOrdonnance()
          })
        }
      })
        
    
      
      
    }
      const Rechercher = (e) =>{
        if (e.target.value === ""){
            setOrdonnance(ordonnanceItem)
          return;
      }
      else{
        const result = ordonnance.filter(item =>item.id.search(e.target.value) !== -1)
        setOrdonnance(result)
      }
    }
      const mapping = ordonnance && ordonnance.map(item=>(
        <tr key={item.id}>
          <td >{item.id}</td>
          <td >{item.dateO}</td>
          <td >{item.nom} </td>
          <td className='chose'>
            <button className='btn btn-danger' onClick={()=>{deleteOrdonnance(item.id)}}><i className="fa fa-solid fa-trash"></i></button>
            <Link to={`/Ordonnance/${item.id}/EditOrdonnance`} className='btn btn-warning'><i className="fa fa-pencil"></i></Link>
            <Link to={`/Ordonnance/DetailOrdonnance/${item.id}`} className='btn btn-primary'><i className="fa fa-eye"></i></Link>
          </td>
        </tr>
      ))
  return (
    <div className='container'>
   <h1 className='mt-1'>
        Ordonnances
      </h1>
     <div className='searchBar my-2'>
     <Link to={"/AjouterOrdonnance"} className='btn btn-success'>Ajouter</Link>
      <input className="form-control mr-sm-2 mx-1" type="search" onChange={Rechercher} placeholder="Rechercher Ordonnance" aria-label="Search"/>
     </div>
     <table className="table table-fixed">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Date d'ordonnance</th>
                <th scope="col">Patient</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {mapping}
        </tbody>
    </table>
</div>
  )
}

export default Ordonnances