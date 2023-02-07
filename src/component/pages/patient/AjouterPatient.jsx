import React from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios'
import { Link , useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
function AjouterPatient() {
    const navigate = useNavigate()
        const [AjouterPatient , setAjouterPatient] = useState([])
        const HandelChange = (event) =>{
            const name = event.target.name
            const value = event.target.value
            setAjouterPatient(values => ({ ...values, [name]: value }))
        }
        const HandelSubmit =(event)=>{
            event.preventDefault()
            axios.post('http://localhost/Pharmacie/backend/tables/Patients.php' , AjouterPatient)
            .then(reponse =>{
            console.log(reponse.data)
            })
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              Toast.fire({
                icon: 'success',
                title: 'Patient a été Ajouter'
              })
    
              setTimeout(()=>{
                navigate("/Patient")
              },3000)
        }
        useEffect(()=>{
            document.title = "Patients"
        })
  return (
    <div className='container'>
    <h1 className='mt-3'>
        Ajouter Patient
    </h1>
    <div>
        <form className="row g-3">
            <div className="col-md-12">
                <label for="nom" className="form-label">Nom</label>
                <input type="text" className="form-control" id="nom" name='nom' onChange={HandelChange} placeholder="Entrez le nom"/>
            </div>
            <div className="col-md-12">
                <label for="prenom" className="form-label">Prénom</label>
                <input type="text" className="form-control" id="prenom" name='prenom' onChange={HandelChange}  placeholder="Entrez le prénom"/>
            </div>
            <div className="col-6">
                <label for="dateN" className="form-label">Date de naissance</label>
                <input type="date" className="form-control" id="dateN" name='datenaissance' placeholder="Entrez la date de naissance" onChange={HandelChange}  />
            </div>
            <div className="col-md-6">
                <label for="sexe" className="form-label">Sexe</label>
                <select id="sexe" name='sexe' className="form-select" onChange={HandelChange} >
                    <option value={1}>M</option>
                    <option value={2}>F</option>
                </select>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-success" onClick={HandelSubmit}>Ajouter</button>
                <Link to={"/Patient"} className="btn btn-warning mx-1">Annuler</Link>
            </div>
        </form>
    </div>
</div>
  )
}

export default AjouterPatient