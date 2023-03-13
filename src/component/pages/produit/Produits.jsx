import React, { useEffect } from 'react'
import axios from "axios"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './product.css'
import Swal from 'sweetalert2'

function Produits() {
  const [produit, setProduit] = useState([])
  const [produitItem, setProduitItem] = useState([])


  function getProduct() {
    axios.get('http://localhost/Pharmacie/backend/tables/Produits.php')
      .then(response => {
        setProduit(response.data)
        setProduitItem(response.data)
        console.log(response.data)
      })
  }
  useEffect(() => {
    document.title = "Produits"
    getProduct()
  }, [])


  const deleteProduct = (ids) => {
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
        axios.delete(`http://localhost/Pharmacie/backend/tables/Produits.php/${ids}/delete`)
          .then(response => {
            console.log(response.data)
            getProduct()
          })
      }
    })
  }
  const Rechercher = (e) => {
    if (e.target.value === "") {
      setProduit(produitItem)
      return;
    }
    else {
      const result = produit.filter(item => item.nomcommercial.toLowerCase().search(e.target.value.toLowerCase()) !== -1)
      setProduit(result)
    }

  }
  const mapping = produit && produit.map(item => (
    <tr key={item.id}>
      <td >{item.id}</td>
      <td >{item.codebarre}</td>
      <td >{item.nomcommercial}</td>
      <td >{item.ppm}</td>
      <td >{item.pph}</td>
      <td >{item.stockinitial}</td>
      <td >{item.stock}</td>
      <td className='qct11'>{item.active === 1 ? <div className='Active1'></div> : <div className='Active'></div> }</td>
      <td>{item.typemedicament}</td>
      <td className='choose'>
        <button className='btn btn-danger ' onClick={() => { deleteProduct(item.id) }}><i className="fa fa-solid fa-trash"></i></button>
        <Link to={`/Produit/${item.id}/Edit`} className='btn btn-warning '><i className="fa fa-pencil"></i></Link>
        <Link to={"/Produit/DetailsProduit"} className='btn btn-primary  ' state={{ data: item }}><i className="fa fa-eye"></i></Link>
      </td>
    </tr>
  ))
  return (
    <div className='container'>
      <h1 className='mt-1'>
        Produits
      </h1>
      <div className='searchBar my-2'>
        <Link to={"/AjouterProduit"} className='btn btn-success'>Ajouter</Link>
        <input className="form-control mr-5 mx-2" type="search" onChange={Rechercher} placeholder="Rechercher Produit" aria-label="Search" />
      </div>
      <div>
        <table className="table table-fixed" id='product'>
          <thead>
            <tr>
              <th>#</th>
              <th>Code Barre</th>
              <th>Nom Commercial</th>
              <th>P.P.M</th>
              <th>P.P.H</th>
              <th>Stock Initial</th>
              <th>Stock</th>
              <th>Active</th>
              <th>Type medicament</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mapping}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Produits