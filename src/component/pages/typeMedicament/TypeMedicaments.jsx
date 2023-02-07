import React, { useEffect } from 'react'
import axios from "axios"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './TypeMedicament.css'
import Swal from 'sweetalert2'
function TypeMedicaments() {
    const [typemedicament, setTypemedicament] = useState([])
    const [typemedicamentItem, setTypemedicamentItem] = useState([])


    function getTypeMedicament() {
        axios.get('http://localhost/Pharmacie/backend/tables/TypeMedicaments.php')
            .then(response => {
                setTypemedicament(response.data)
                setTypemedicamentItem(response.data)
            })
    }
    useEffect(() => {
        getTypeMedicament()
    }, [])

    const deleteTypeM = (ids) => {
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
            if (result.isConfirmed) {
              Swal.fire(
                'Supprimé!',
                'notre fichier a été supprimé.',
                'success'
              )
              axios.delete(`http://localhost/Pharmacie/backend/tables/TypeMedicaments.php/${ids}/delete`)
              .then(response => {
                  console.log(response.data)
                  getTypeMedicament()
              })
            }
          })
            
   


    }
    const Rechercher = (e) => {
        if (e.target.value === "") {
            setTypemedicament(typemedicamentItem)
            return;
        }
        else {
            const result = typemedicament.filter(item => item.typemedicament.toLowerCase().search(e.target.value.toLowerCase()) !== -1)
            setTypemedicament(result)
        }

    }
    const mapping = typemedicament && typemedicament.map(item => (
        <tr key={item.id}>
            <td >{item.id}</td>
            <td >{item.typemedicament}</td>
            <td className='chose'>
                <button className='btn btn-danger' onClick={() => { deleteTypeM(item.id) }}><i className='fa fa-solid fa-trash'></i></button>
                <Link to={`/TypeMedicament/${item.id}/EditType`} className='btn btn-warning mx-2 '><i className='fa fa-pencil'></i> </Link>
                {/* <Link to={"/TypeMedicament/DetailsType"} className='btn btn-primary ' state={{ data: item }}><i className='fa fa-eye'></i></Link> */}
            </td>
        </tr>
    ))
    return (

        <div className='container'>
            <h1 >
            <i className="fa fa-folder"></i> Type Medicament
            </h1>
            <div className='searchBar my-2'>
                <Link to={"/AjouterType"} className='btn btn-success'>Ajouter</Link>
                <input className="form-control mr-sm-2 mx-1" type="search" onChange={Rechercher} placeholder="Rechercher Type Medicament" aria-label="Search" />
            </div>
            <table className="table table-fixed" id='typetable'>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Type Medicament</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {mapping}
                </tbody>
            </table>
        </div>
    )
}

export default TypeMedicaments