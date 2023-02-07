import React from 'react'
import Acceuil from '../pages/accueil/Acceuil'
import { BrowserRouter , Routes , Route} from "react-router-dom";
import SideNavBar from './SideNavBar';
import './SideNavBar.css'
import Produits from '../pages/produit/Produits';
import Edit from '../pages/produit/Edit';
import AjouterProduit from '../pages/produit/AjouterProduit';
import Patients from '../pages/patient/Patients';
import AjouterPatient from '../pages/patient/AjouterPatient';
import EditPatient from '../pages/patient/EditPatient';
import Ordonnances from '../pages/ordonnance/Ordonnances';
import AjouterOrdonnance from '../pages/ordonnance/AjouterOrdonnance';
import EditOrdonnance from '../pages/ordonnance/EditOrdonnance';
import DetailsP from '../pages/produit/DetailsP';
import Caisse from '../pages/caisse/Caisse';
import Parametre from '../pages/parametre/Parametre';
import AjouterType from '../pages/typeMedicament/AjouterType';
import EditType from '../pages/typeMedicament/EditType';
import DetailOrdonnance from '../pages/ordonnance/DetailOrdonnance'
import DetailsPatient from '../pages/patient/DetailsPatient';
function RouterPath(props) {
  return(

    <BrowserRouter>
    <div className="bodycontant">
        <div className='sidebar'>
       <SideNavBar user = {props.name}/>
        </div>
        <div className='content'>
            <Routes>
              <Route path='/' element={<Acceuil />} />
              <Route path='/Produit' element={<Produits />} />
              <Route path='/Produit/:id/Edit' element={<Edit />} />
              <Route path='/AjouterProduit' element={<AjouterProduit />} />
              <Route path='/Patient' element={<Patients />} />
              <Route path='/AjouterPatient' element={<AjouterPatient />} />
              <Route path='/Patient/:id/EditPatient' element={<EditPatient />} />
              <Route path='/Ordonnance' element={<Ordonnances />} />
              <Route path='/AjouterOrdonnance' element={<AjouterOrdonnance />} />
              <Route path='/Ordonnance/:id/EditOrdonnance' element={<EditOrdonnance />} />
              <Route path='/Produit/DetailsProduit' element={<DetailsP />} />
              <Route path='/Patient/DetailsPatient' element={<DetailsPatient />} />
              <Route path='/Caisse' element={<Caisse/>} />
              <Route path='/Parametre' element={<Parametre />} />
              <Route path='/AjouterType' element={<AjouterType />}/>
              <Route path='/TypeMedicament/:id/EditType' element={<EditType />} />
              <Route path='/Ordonnance/DetailOrdonnance/:id' element={<DetailOrdonnance />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
   
  )
}

export default RouterPath