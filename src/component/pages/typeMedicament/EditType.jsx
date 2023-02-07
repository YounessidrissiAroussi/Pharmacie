import React, { useEffect, useState } from 'react'
import { useParams , useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
function EditType() {
    const { id } = useParams()
    const [seultype, setSeulType] = useState([])
    const navigate = useNavigate()
    const getType = () => {
      axios.get(`http://localhost/Pharmacie/backend/tables/TypeMedicaments.php/${id}`)
        .then((response) => {
            setSeulType(response.data)
        })
    }
  
    const handleChange = (event) => {
      const name = event.target.name
      const value = event.target.value
      setSeulType(values => ({ ...values, [name]: value }))
    }

    useEffect(() => {
        getType()
    },[])
    console.log(seultype)
  
    const HandelEdit = (e) => {
      e.preventDefault()
      axios.put(`http://localhost/Pharmacie/backend/tables/TypeMedicaments.php/${id}/edit` , seultype)
      .then((response)=>{
        setSeulType(response.data)
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
      title: 'le produit a été modifié'
    })
    setTimeout(()=>{
      navigate('/Parametre')
    },3000)
    }
  return (
    <div className='container'>
    <h1 className='mt-3'>
        Modifier Type Medicament
    </h1>
    <div>
        <form className="row g-3">
            <div className="col-md-12">
                <label htmlFor="typemedicament" className="form-label">Type Medicament</label>
                <input type="text" className="form-control" id="typemedicament" value={seultype.typemedicament} name='typemedicament' onChange={handleChange} placeholder="Entrez le type"/>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-warning" onClick={HandelEdit}>Modifier</button>
            </div>
        </form>
    </div>
</div>
  )
}

export default EditType