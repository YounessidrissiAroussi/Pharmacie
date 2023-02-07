import React, { useEffect, useState } from 'react'
import { useParams , useNavigate , Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
function Edit() {
  const { id } = useParams()
  const [seulproduit, setSeulProduit] = useState([])
  const navigate = useNavigate()
  const [type  , setType] = useState([])
  const getProduct = () => {
    axios.get(`http://localhost/Pharmacie/backend/tables/Produits.php/${id}`)
      .then((response) => {
        setSeulProduit(response.data)
      })
  }

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setSeulProduit(values => ({ ...values, [name]: value }))
  }
  const getMedicamnet =  () =>{
    axios.get('http://localhost/Pharmacie/backend/tables/TypeMedicaments.php')
        .then(reponse => {
            console.log(reponse.data)
            setType(reponse.data)
        })
}
const typemapping = type.map(ty=>(
    <option key={ty.id} value={`${ty.id}`}>{`${ty.typemedicament}`}</option>
))

  useEffect(() => {
    getProduct()
    getMedicamnet()
  },[])
  console.log(seulproduit)

  const HandelEdit = (e) => {
    e.preventDefault()
    axios.put(`http://localhost/Pharmacie/backend/tables/Produits.php/${id}/edit` , seulproduit)
    .then((response)=>{
      setSeulProduit(response.data)
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'success',
        title: 'le produit a été modifié'
      })
      setTimeout(()=>{
        navigate('/Produit')
      },2000)
  })
  }


  return (
    <div className='container mt-2'>
      <h1>Modifier Produit</h1>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="code" className="form-label">Code Barre</label>
          <input type="text" className="form-control" value={seulproduit.codebarre || ""} name="codebarre" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Nom Commercial</label>
          <input type="text" className="form-control" value={seulproduit.nomcommercial || ""} name="nomcommercial" onChange={handleChange} />
        </div>
        <div className="col-6">
          <label htmlFor="prixM" className="form-label">P.P.M</label>
          <input type="number" className="form-control" placeholder="Entrez le prix P.P.M" defaultValue={seulproduit.ppm || ""} name="ppm" onChange={handleChange} />
        </div>
        <div className="col-6">
          <label htmlFor="prixH" className="form-label">P.P.H</label>
          <input type="number" className="form-control" placeholder="Entrez le prix P.P.H" value={seulproduit.pph || ""} name="pph" onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label htmlFor="stockI" className="form-label">Stock initial</label>
          <input type="number" className="form-control" value={seulproduit.stockinitial || ""} name="stockinitial" onChange={handleChange} />
        </div>
        <div className="col-md-4" >
          <label htmlFor="stock" className="form-label">Stock</label>
          <input type="number" className="form-control" value={seulproduit.stock || ""} name="stock" onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label htmlFor="Active" className="form-label">Active</label>
          <select id="Active" className="form-select" value={seulproduit.active} name="active" onChange={handleChange}>
            <option value={1}>Oui</option>
            <option value={0}>Non</option>
          </select>
        </div>
        <div className="col-12">
        <label htmlFor="typemedicament_id" className="form-label">Type Medicament</label>
                <select id="typemedicament_id" className="form-select"  placeholder="Entrez type medicament" value={seulproduit.typemedicament_id} name='typemedicament_id' required onChange={handleChange}>
              {typemapping}
                </select>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-warning" onClick={HandelEdit}>Modifier</button>
          <Link to={"/Produit"} className="btn btn-danger mx-1">Annuler</Link>
        </div>
      </form>
    </div>
  )
}

export default Edit