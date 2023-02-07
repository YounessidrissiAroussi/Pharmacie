import React, { useEffect } from 'react'
import axios from "axios"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './patient.css'
import Swal from 'sweetalert2'
function Patients() {
    const [patient, setPatient] = useState([])
    const [patientItem, setPatientItem] = useState([])


    function getPatient() {
        axios.get('http://localhost/Pharmacie/backend/tables/Patients.php')
            .then(response => {
                setPatient(response.data)
                setPatientItem(response.data)
            })
    }
    useEffect(() => {
        document.title = "Patients"
        getPatient()
    }, [])

    const deletePatient = (ids) => {
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
                'Notre Patient a été supprimé.',
                'success'
              )
              axios.delete(`http://localhost/Pharmacie/backend/tables/Patients.php/${ids}/delete`)
                .then(response => {
                    console.log(response.data)
                    getPatient()
                })
            }
          })
            


    }
    const Rechercher = (e) => {
        if (e.target.value === "") {
            setPatient(patientItem)
            return;
        }
        else {
            const result = patient.filter(item => item.nom.toLowerCase().search(e.target.value.toLowerCase()) !== -1)
            setPatient(result)
        }

    }
    const mapping = patient && patient.map(item => (
        <tr key={item.id}>
            <td >{item.id}</td>
            <td >{item.nom}</td>
            <td >{item.prenom}</td>
            <td >{item.datenaissance}</td>
            <td >{item.sexe}</td>
            <td className='chose'>
                <button className='btn btn-danger' onClick={() => { deletePatient(item.id) }}><i className="fa fa-solid fa-trash"></i></button>
                <Link to={`/Patient/${item.id}/EditPatient`} className='btn btn-warning'><i className="fa fa-pencil"></i></Link>
                <Link to={"/Patient/DetailsPatient"} className='btn btn-primary ' state={{ data: item }}><i className="fa fa-eye"></i></Link>
            </td>
        </tr>
    ))
    return (

        <div className='container'>
            <h1 className='mt-1'>
                Patients
            </h1>
            <div className='searchBar my-2'>
                <Link to={"/AjouterPatient"} className='btn btn-success'>Ajouter</Link>
                <input className="form-control mr-sm-2 mx-1" type="search" onChange={Rechercher} placeholder="Rechercher Produit" aria-label="Search" />
            </div>
            <table className="table table-fixed">
                <thead>
                    <tr>
                        <th scope="col-2">#</th>
                        <th scope="col-2">Nom</th>
                        <th scope="col-2">Prénom</th>
                        <th scope="col-2">Date de naissance</th>
                        <th scope="col-2">Sexe</th>
                        <th scope="col-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {mapping}

                </tbody>
            </table>
        </div>
    )
}

export default Patients