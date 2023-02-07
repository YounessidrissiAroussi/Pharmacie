import React from 'react'
import { Link, useLocation } from 'react-router-dom'
function DetailsP() {
    const ProductItem = useLocation().state.data
    console.log(ProductItem)
  return (
    <div className='container mt-2'>
       <Link to={"/Produit"} className="btn btn-danger mx-2 mb-2"><i className="fa fa-share"></i></Link>
      <h1 className='mt-1'>
        Détail Produit
      </h1>
        <div className="product-info">
          <div className="details-items">
          {/* { ProductItem.length === 0 ? <div>No data</div>: */}
            <div className='items'>
              <div className="item">
                <h5 className='item-title'><i className="fa fa-thumbtack"></i> Nom de produit</h5>
                <span>{ProductItem.nomcommercial}</span>
              </div>
              <div className="item">
                <h5  className='item-title'><i className="fa  fa-money-bill"></i> Prix public du maroc</h5>
                <span>{ProductItem.ppm}Dhs</span>
              </div>
              <div className="item">
                <h5  className='item-title'><i className="fa fa-tags"></i> Type Médicament</h5>
                <span >{ProductItem.typemedicament}</span>
              </div>
              <div className="item">
              <h5 className='item-title'><i className="fa fa-comment"></i> Stock</h5>
                <span >{ProductItem.stock}</span>
              </div>        
            </div>
          {/* } */}
          </div>
        </div>
       
            
     </div>       
  )
}

export default DetailsP