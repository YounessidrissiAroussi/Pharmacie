import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link  , useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
function AjouterType() {
    // INSERT INTO `typemedicament`(`id`, `typemedicament`) 
    const [AjouterTypeM, setAjouterM] = useState([])
    const navigate = useNavigate()
    const HandelChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setAjouterM(values => ({ ...values, [name]: value }))
    }
    const HandelSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost/Pharmacie/backend/tables/TypeMedicaments.php', AjouterTypeM)
            .then(reponse => {
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
                title: 'le produit a été Ajouter'
              })
              
              setTimeout(()=>{
                navigate('/Parametre')
              },3000)
       
            // navigate('/Parametre')
    }
    return (
        <div className='container'>
            <h1 className='mt-3'>
                Ajouter Type medicament
            </h1>
            <div>
                <form className="row g-3">
                    <div className="col-md-12">
                        <label htmlFor="typemedicament" className="form-label">Type Medicament</label>
                        <input type="text" className="form-control" id="typemedicament" name='typemedicament' onChange={HandelChange} placeholder="Entrez le type" />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-success" onClick={HandelSubmit}>Ajouter</button>
                        <Link to={"/Parametre"} className="btn btn-warning mx-1">Annuler</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AjouterType