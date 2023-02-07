import React, { useEffect, useState } from 'react'
import { useParams , useNavigate , Link} from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
function EditOrdonnance() {
    const { id } = useParams()
    const [patient,setPatient] = useState([])
    function getPatient() {
        axios.get('http://localhost/Pharmacie/backend/tables/Patients.php')
            .then(response => {
                setPatient(response.data) 
                console.log(response.data) 

            })
    }
    useEffect(() => {
        getPatient()
    }, [])
    const mapping = patient && patient.map(item=>(
      <option key={item.id} value={item.id}>{item.id}-{item.nom} {item.prenom}</option>
  ))
    const [seulordonnance, setSeulOrdonnance] = useState([])
    const navigate = useNavigate()
    const getOrdonnance = () => {
      axios.get(`http://localhost/Pharmacie/backend/tables/Ordonnances.php/${id}`)
        .then((response) => {
            setSeulOrdonnance(response.data)
            console.log(response.data)
        })
    }
  
    const handleChange = (event) => {
      const name = event.target.name
      const value = event.target.value
      setSeulOrdonnance(values => ({ ...values, [name]: value }))
    }
  
    useEffect(() => {
        getOrdonnance()
    },[])
    
  
    const HandelEdit = (e) => {
      e.preventDefault()
      axios.put(`http://localhost/Pharmacie/backend/tables/Ordonnances.php/${id}/edit` , seulordonnance)
      .then((response)=>{
        setSeulOrdonnance(response.data)
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'Ordonnance a été modifié'
          })
          setTimeout(()=>{
            navigate('/Ordonnance')
          },2000)
    })
    }
  return (
    <div className='container'>
    <h1 className='mt-3'>
        Modifier Ordonnance
    </h1>
    <div>
        <form className="row g-3">
            {/* <div className="col-md-12">
                <label className="form-label">Date d'ordonnance</label>
                <input type="date" className="form-control" id="dateO" value={seulordonnance.dateO || ""} name='dateO' onChange={handleChange} placeholder="Entrez la date d'ordonnance"/>
            </div> */}
            <div className="col-md-12">
            <label className="form-label">Patient</label>
            <select id="patient_id" className="form-select" value={seulordonnance.patient_id} name='patient_id'  onChange={handleChange}>
                            {mapping}
            </select>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-warning" onClick={HandelEdit}>Modifier</button>
                <Link to={"/Ordonnance"} className="btn btn-danger mx-1">Annuler</Link>
            </div>
        </form>
    </div>
</div>
  )
}

export default EditOrdonnance