import React from 'react'
import { Link } from 'react-router-dom'
import './dash.css'
function DashItem() {
  return (
    <>
    
    <div className='row mb-5'>
    <div className='col-md-6 col-sm-8' style={{maxWidth : "20rem"}} >
    <Link to={"/Caisse"}>
            <div className='column'>
                <div className='png'>
                <i className="fa fa-cart-plus"></i>
                <h5>Caisse</h5>
                </div>
            </div>
            </Link>
    </div>
   
   
<div className='col-md-6 col-sm-8' style={{maxWidth : "20rem"}} >
<Link to={"/AjouterProduit"}>
            <div className='columntwo'>
                <div className='png'>
                <i className="fa fa-shopping-bag mx-3"></i>
                <h5>Ajouter Produit</h5>
                </div>
            </div>
            </Link>
    </div>
  
    <div className='col-md-6 col-sm-8' style={{maxWidth : "20rem"}} >
    <Link to={"/AjouterPatient"}>
            <div className='column'>
                <div className='png'>
                <i className="fa fa-address-card"></i>
                <h5>Ajouter Patient</h5>
                </div>
            </div>
            </Link>
    </div>
    <div className='col-md-6 col-sm-8' style={{maxWidth : "20rem"}} >
    <Link to={"/AjouterOrdonnance"}>
            <div className='column'>
                <div className='png'>
                <i className="fa fa-book"></i>
                <h5>Ajouter Ordonnance</h5>
                </div>
            </div>
            </Link>
    </div>
   
    </div>
    <hr className="style1"></hr>
    </>
  )
}
export default DashItem