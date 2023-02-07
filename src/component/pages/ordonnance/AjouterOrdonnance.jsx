import React from 'react'
import { useState  , useEffect} from 'react'
import axios from 'axios'
import { Link , useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
function AjouterOrdonnance() {
    const [patient,setPatient] = useState([])
    function getPatient() {
        axios.get('http://localhost/Pharmacie/backend/tables/Patients.php')
            .then(response => {
                setPatient(response.data) 
                console.log(response.data) 

            })
    }
    const navigate = useNavigate()
    useEffect(() => {
        document.title = "Ordannances"
        getPatient()
    },[])

        // INSERT INTO `ordonnance`(`id`, `dateO`, `patient_id`) 
        const [AjouterOrdonnance , setAjouterOrdonnance] = useState([])
        // const [codebar,setCodeBar] = useState(null)
        const HandelChange = (event) =>{
            const name = event.target.name
            const value = event.target.value
            setAjouterOrdonnance(values => ({ ...values, [name]: value }))
        }
        const HandelSubmit =(event)=>{
            event.preventDefault()
            axios.post('http://localhost/Pharmacie/backend/tables/Ordonnances.php' , AjouterOrdonnance)
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
                title: 'Patient a été Ajouter'
              })
    
              setTimeout(()=>{
                navigate("/Ordonnance")
              },3000)
        }
        const mapping = patient && patient.map(item=>(
            <option key={item.id} value={item.id}>{item.id}-{item.nom} {item.prenom}</option>
        ))
  return (
    <div className='container'>
    <h1 className='mt-3'>
        Ajouter Ordonnance
    </h1>
    <div>
        <form className="row g-3">
            {/* <div className="col-md-12">
                <label className="form-label">Date d'ordonnance</label>
                <input type="date" className="form-control" id="dateO" name='dateO' onChange={HandelChange} placeholder="Entrez la date d'ordonnance"/>
            </div> */}
            <div className="col-md-12">
              
                <select id="typemedicament_id" className="form-select" placeholder="Entrez type medicament" name='patient_id' required onChange={HandelChange}>
                            {mapping}
                        </select>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-success" onClick={HandelSubmit}>Ajouter</button>
                <Link to={"/Ordonnance"} className="btn btn-warning mx-1">Annuler</Link>
            </div>
        </form>
    </div>
</div>
  )
}

export default AjouterOrdonnance