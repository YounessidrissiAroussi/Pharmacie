import React, { useState, useEffect } from 'react'
import axios from 'axios'

function News() {
  //Produit
  const [produit, setProduit] = useState([])
  function getProduct() {
    axios.get('http://localhost/Pharmacie/backend/tables/Produits.php')
      .then(response => {
        setProduit(response.data)
      })
  }
  //Patient
  const [patient, setPatient] = useState([])
  function getPatient() {
    axios.get('http://localhost/Pharmacie/backend/tables/Patients.php')
      .then(response => {
        setPatient(response.data)
      })
  }
  const [ordonnance, setOrdonnance] = useState([])
  //Ordannance
  function getOrdonnance() {
    axios.get('http://localhost/Pharmacie/backend/tables/Ordonnances.php')
      .then(response => {
        setOrdonnance(response.data)
      })
  }
  useEffect(() => {
    getProduct();
    getPatient();
    getOrdonnance();
  }, [])

  return (
    <>
      <h1>Accueil</h1>
      <img className="menu-item-icon" src={"icons/logoss.gif"} alt="" />
      <hr className="style1"></hr>
      <h2 style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}><i className="fa fa-check"></i> Rapport d'aujourd'hui</h2>
      <div className='row mt-2 mb-3' >
        <div className='col-md-4 col-sm-6' style={{ maxWidth: "20rem" }} >
          <div className="card text-white bg-primary mb-3" style={{ height: "130px" }}  >
            <div className="card-body">
              <h5 className="card-title"><i className="fa fa-shopping-bag"></i> Produits</h5>
              <h3 className="card-text"><b>{produit.length}</b> Produits
              </h3>
            </div>
          </div>
        </div>
        <div className='col-md-4 col-sm-6' style={{ maxWidth: "20rem" }} >
          <div className="card text-white bg-warning  mb-3" style={{ height: "130px" }}>

            <div className="card-body">
              <h5 className="card-title"><i className="fa fa-user"></i> Patients</h5>
              <h3 className="card-text"><b>{patient.length}</b> Patients</h3>
            </div>
          </div>
        </div>
        <div className='col-md-4 col-sm-6' style={{ maxWidth: "20rem" }} >
          <div className="card text-white bg-success mb-3" style={{ height: "130px" }} >

            <div className="card-body">
              <h5 className="card-title"><i className="fa fa-gear"></i> Ordonnance</h5>
              <h3 className="card-text"><b>{ordonnance.length}</b> Ordonnances</h3>
            </div>
          </div>
        </div>
        <div className='col-md-4 col-sm-6' style={{ width: "90rem" }}>
        </div>
        <hr className="style1"></hr>
      </div>

    </>
  )
}

export default News