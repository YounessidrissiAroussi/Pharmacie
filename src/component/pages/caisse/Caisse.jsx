import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './caisse.css'
import Swal from 'sweetalert2'
import 'animate.css';
function Caisse() {
  const [patient, setPatient] = useState([])
  const [produit, setProduit] = useState([])
  const [PatientItem, setPatientItem] = useState()
  const [barcode, setBarCode] = useState([])
  const [findProduct, setFindProduct] = useState([])
  const GetPatient = () => {
    axios.get("http://localhost/pharmacie/backend/tables/Caisse/GetPatient.php")
      .then(item => {
        setPatient(item.data)
      })
  }
  const GetProduit = () => {
    axios.get("http://localhost/Pharmacie/backend/tables/Produits.php")
      .then(item => {
        setProduit(item.data)
        console.log(item.data)
      })
  }

  const AddProduit = (e) => {
    e.preventDefault()
    const FindItem = produit.find(x => x.codebarre === barcode.trim() || x.nomcommercial === barcode.trim() )
    console.log(FindItem)
    if (FindItem) {
        FindItem.qte = 1
        FindItem.ordonnance_id = Number(PatientItem)
        const data = [...findProduct, FindItem]
        setFindProduct(data)
        setBarCode("")
    }else{
      Swal.fire({
        title: 'CodeBarre ou Nom Commercial de Produit Pas correct !!!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    }
  }

  const increment = (item) => {
    item.qte += 1
    setFindProduct([...findProduct])
  }
  const decrement = (item) => {
    item.qte -= 1
    if (item.qte === 0) {
      item.qte = 1
      setFindProduct([...findProduct])
    } else {

      setFindProduct([...findProduct])
    }
  }
  //---------------total-----------------------
  const total = findProduct.reduce(function (total, produit) {
    return total += produit.ppm * produit.qte
  }, 0)
  //  console.log(total)
  //---------------------------------------------
  const DeleteFromCaisse = (ids) => {
    const findItemfromProduct = findProduct.filter(x => x.id !== ids)
    setFindProduct(findItemfromProduct)
  }
  const mapping = findProduct.map((item) => (
    <tr key={item.id}>
      {/* <td>{index + 1}</td>*/}
      {/* <td>{PatientItem}</td>  */}
      <td>{item.id}</td>
      <td>{item.nomcommercial}</td>
      <td className='qte'><i style={{ cursor: "pointer" }} className="fa fa-angle-down" onClick={() => { decrement(item) }}></i><b>{item.qte}</b><i style={{ cursor: "pointer" }} className="fa fa-angle-up" onClick={() => { increment(item) }}></i></td>
      <td>{item.ppm} DH</td>
      <td>{item.qte * item.ppm} DH</td>
      <td><button className='btn btn-danger' onClick={() => DeleteFromCaisse(item.id)}><i className="fa fa-solid fa-trash"></i></button></td>
    </tr>
  ))
  useEffect(() => {
    GetPatient()
    GetProduit()
  }, [])
  const Calculer = (e) => {
    e.preventDefault()
    Swal.fire({
      title: 'Voulez-vous enregistrer les modifications ?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Sauvegarder',
      denyButtonText: `Ne pas enregistrer`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('enregistré(e)!', '', 'success')
        axios.post("http://localhost/Pharmacie/backend/tables/DetailOrdonnances.php", findProduct)
          .then(reponse => {
            console.log(reponse.data)
          })
          axios.post("http://localhost/Pharmacie/backend/tables/Ordonnances.php", findProduct)
          .then(reponse => {
            console.log(reponse.data)
          })
        setPatientItem('')
        setFindProduct([])
      } else if (result.isDenied) {
        Swal.fire('Les modifications ne sont pas enregistrées', '', 'info')
      }
    })

    console.log(findProduct)
  }

  const Patientmap = patient && patient.map((item) => (
    <option key={item.id} value={item.id}>{item.nom} {item.prenom}</option>
  ))
  return (
    <div className='container mt-2'>
      <Link to={"/"} className="btn btn-danger mx-2 mb-2"><i className="fa fa-share"></i></Link>
      <h1>Caisse</h1>
      <form className="form-inline mt-3 mx-5">
        <div className="form-group mb-2">
          <label htmlFor="staticEmail2" className="sr-only">Code Barre</label>
          <input type="text" className="form-contro" id="staticEmail2" value={barcode} placeholder='CBarre ou NProduit' onChange={e => setBarCode(e.target.value)} />
        </div>
        <div className="form-group mx-2 mb-2">
          <label htmlFor="staticEmail2" className="sr-only">Patient</label>
          <select id="Patient_id" className="form-select" name='Patient_id' onChange={e => { setPatientItem(e.target.value) }}>
            {/* disabled={PatientItem ? true : false} */}
            <option>Choisier un Patient</option>
            {Patientmap}
          </select>
        </div>
        <button type="submit" className="btn btn-primary mx-2 mb-2" onClick={AddProduit}><i className="fa fa-plus"></i></button>
      </form>
      <table className="table table-fixed" id='caisse'>
        <thead>
          <tr>
            <th scope="col">Id Produit</th>
            <th scope="col">Nom Produit</th>
            <th scope="col">QTE</th>
            <th scope="col">Prix</th>
            <th scope="col">Total</th>
            <th scope="col">Action</th>

          </tr>
        </thead>
        <tbody>
          {mapping}
        </tbody>
      </table>
      <table className='valide'>
        <tbody>
        {/* <tr>
            <td></td>
            <td></td>
            <td></td>
            <td className='bg-primary text-white px-5 py-1'>TOTAL</td>
            <td className='text-danger' >{total} DH</td>
            <td>
            </td>
          </tr> */}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td className='bg-primary text-white px-5 py-1'>TOTAL</td>
            <td className='text-danger' >{total} DH</td>
            <td>
            <button type="submit" className="btn btn-warning px-5 py-1 mx-0 my-0" onClick={Calculer} >Valider</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Caisse