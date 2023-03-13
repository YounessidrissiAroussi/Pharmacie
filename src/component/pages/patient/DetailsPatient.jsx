import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function DetailsPatient() {
    const PatientItem = useLocation().state.data
    console.log(PatientItem)
  return (
    <div className='container mt-2'>
       <Link to={"/Patient"} className="btn btn-danger mx-2 mb-2"><i className="fa fa-share"></i></Link>
      <h1 className='mt-1'>
        Détail Patient
      </h1>
       <div className="user-info">
          <div className="details-items">
            <div className='items'>
              <div className="item">
                <h3 className='item-title'>Nom Complet</h3>
                <span>{PatientItem.nom} {PatientItem.prenom}</span>
              </div>
              <div className="item">
                <h3 className='item-title'>Sexe</h3>
                <span>{PatientItem.sexe}</span>
              </div>
              <div className="item">
                <h3 className='item-title'>Date de naissance</h3>
                <span>{PatientItem.datenaissance}</span>
              </div>
            </div>
          </div>
        </div>
  </div>
  )
}

export default DetailsPatient