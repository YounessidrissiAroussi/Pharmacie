import React, { useEffect, useState } from 'react'
import { useParams , useNavigate , Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
function EditPatient() {
    const { id } = useParams()
    const [seulpatient, setSeulPatient] = useState([])
    const navigate = useNavigate()
    const getPatient = () => {
      axios.get(`http://localhost/Pharmacie/backend/tables/Patients.php/${id}`)
        .then((response) => {
            setSeulPatient(response.data)
        })
    }
  
    const handleChange = (event) => {
      const name = event.target.name
      const value = event.target.value
      setSeulPatient(values => ({ ...values, [name]: value }))
    }
  
    useEffect(() => {
        getPatient()
    },[])
    console.log(seulpatient)
  
    const HandelEdit = (e) => {
      e.preventDefault()
      axios.put(`http://localhost/Pharmacie/backend/tables/Patients.php/${id}/edit` , seulpatient)
      .then((response)=>{
        setSeulPatient(response.data)
    })
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
        title: 'Patient a été modifié'
      })
      setTimeout(()=>{
        navigate('/Patient')
      },2000)
    }
  return (
    <div className='container'>
    <h1 className='mt-3'>
        Modifier Patient
    </h1>
    <div>
        <form className="row g-3">
            <div className="col-md-12">
                <label  className="form-label">Nom</label>
                <input type="text" className="form-control" id="nom" value={seulpatient.nom || ""} name='nom' onChange={handleChange} placeholder="Entrez le nom"/>
            </div>
            <div className="col-md-12">
                <label className="form-label">Prénom</label>
                <input type="text" className="form-control" id="prenom" value={seulpatient.prenom || ""} name='prenom' onChange={handleChange} placeholder="Entrez le prénom"/>
            </div>
            <div className="col-6">
                <label className="form-label">Date de naissance</label>
                <input type="date" className="form-control" id="dateN" value={seulpatient.datenaissance || ""} name='datenaissance' placeholder="Entrez la date de naissance" onChange={handleChange} />
            </div>
            <div className="col-md-6">
                <label className="form-label">Sexe</label>
                <select id="sexe" className="form-select" value={seulpatient.sexe} name='sexe' onChange={handleChange}>
                    <option value={"M"}>Masculin</option>
                    <option value={"F"}>Femme</option>
                </select>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-warning" onClick={HandelEdit}>Modifier</button>
                <Link to={'/Patient'} className='btn btn-danger mx-1'>Annuler</Link>
            </div>
        </form>
    </div>
</div>
  )
}

export default EditPatient