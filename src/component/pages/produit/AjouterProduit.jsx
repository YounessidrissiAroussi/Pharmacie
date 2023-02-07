import React from 'react'
import { useState  , useEffect} from 'react'
import axios from 'axios'
import { Link , useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
function AjouterProduit() {
    const [AjouterProduit , setAjouterP] = useState([])
    const [type  , setType] = useState([])
    const navigate = useNavigate()
    const HandelChange = (event) =>{
        const name = event.target.name
        const value = event.target.value
        setAjouterP(values => ({ ...values, [name]: value }))
    }
    const HandelSubmit =(event)=>{
        event.preventDefault()
        axios.post('http://localhost/Pharmacie/backend/tables/Produits.php' , AjouterProduit)
        .then(reponse =>{
        console.log(reponse.data)
        })
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'le produit a été Ajouter'
          })

          setTimeout(()=>{
            navigate("/Produit")
          },3000)
    }
    const getMedicamnet =  () =>{
        axios.get('http://localhost/Pharmacie/backend/tables/TypeMedicaments.php')
            .then(reponse => {
                console.log(reponse.data)
                setType(reponse.data)
            })
    }
    useEffect(()=>{
        getMedicamnet()
        document.title = "Produits"
    },[])
    const typemapping = type.map(ty=>(
        <option key={ty.id} value={`${ty.id}`}>{`${ty.typemedicament}`}</option>
    ))
    return (
        <div className='container'>
            <h1 className='mt-3'>
                Ajouter Produit
            </h1>
            <div>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="code" className="form-label">Code Barre</label>
                        <input type="text" className="form-control" id="code" name='codebarre'  onChange={HandelChange} />
                        {/* <button onClick={()=>setCodeBar(`44156545454684`)}>Barcode</button> */}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Nom Commercial</label>
                        <input type="text" className="form-control" id="name" name='nomcommercial'  onChange={HandelChange}  required />
                    </div>
                    <div className="col-6">
                        <label htmlFor="prixM" className="form-label">P.P.M</label>
                        <input type="number" className="form-control" id="prixM" placeholder="Entrez le prix P.P.M" name='ppm'  onChange={HandelChange}  required/>
                    </div>
                    <div className="col-6">
                        <label htmlFor="prixH" className="form-label">P.P.H</label>
                        <input type="number" className="form-control" id="prixH" placeholder="Entrez le prix P.P.H" name='pph'  onChange={HandelChange}  required />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="stockI" className="form-label">Stock initial</label>
                        <input type="number" className="form-control" id="stockI" name='stockinitial'  onChange={HandelChange}  required/>
                    </div>
                    <div className="col-md-4" >
                        <label htmlFor="stock" className="form-label">Stock</label>
                        <input type="number" className="form-control" id="stock" name='stock'  onChange={HandelChange}  required/>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="Active" className="form-label">Active</label>
                        <select id="Active" className="form-select" name='active'  onChange={HandelChange}  required>
                            <option value={1}>Oui</option>
                            <option value={2}>Non</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <label htmlFor="typemedicament_id" className="form-label">Type Medicament</label>
                        <select id="typemedicament_id" className="form-select"  placeholder="Entrez type medicament" name='typemedicament_id' required onChange={HandelChange}>
                            {typemapping}
                        </select>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-success" onClick={HandelSubmit}>Ajouter</button>
                        <Link to={"/Produit"} className="btn btn-warning mx-1">Annuler</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AjouterProduit