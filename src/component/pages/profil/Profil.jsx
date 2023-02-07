import React , {useState , useEffect} from 'react'
import axios from 'axios';
import './login.css'
function Profil() {
    const [isDisabled, setIsDisabled] = useState(true);
    const [show , setShow] = useState(false)
    const [utilisateur , setUtilisateur] = useState()
    const [motdepasse , setMotdepasse] = useState()
    const [email , setEmail] = useState()
    const [numero , setNumero]  = useState()
    
    const Editting = (e) =>{
        e.preventDefault()
        setIsDisabled(!isDisabled)
        const data = {
            "nomUtilisateur" : utilisateur,
            "motdepasse" : motdepasse,
            "email" : email,
            "numero" : numero
        } 
        if(!isDisabled){
            axios.put(`http://localhost/Pharmacie/backend/tables/login.php`,data)
            .then((Response)=>{
                // console.log(Response.data)
        })
        }
        
    }
    const getLogin = ()=>{
        axios.get('http://localhost/Pharmacie/backend/tables/login.php')
        .then(Response=>{
            setUtilisateur(Response.data[0]?.NomUtilisateur)
            setMotdepasse(Response.data[0]?.Motdepasse)
            setEmail(Response.data[0]?.email)
            setNumero(Response.data[0]?.Numero)
        })
    } 
   
    useEffect(()=>{
        getLogin()
    },[])
  return (
    <div className="container">
        <h1> <i className="fa fa-user"></i> Profile</h1>
        
                <form className='mt-2 mx-5' id='login'>
        <div className="col-md-12 ">
                <label  className="form-label">Utilisateur</label>
                <input type="text" className="form-control " disabled={isDisabled} value={utilisateur || ""} name='nomUtilisateur' onChange={e=>{setUtilisateur(e.target.value)}} />
            </div>
            <div className="col-md-12">
                <label className="form-label">Mot de Passe</label>
                <div className="password">
                <input type={!show ? "password" : "text"} className="form-control"  disabled={isDisabled} value={motdepasse || ""} name='motdepasse' onChange={e=>{setMotdepasse(e.target.value)}}/>
                <button className='btn btn-info mx-2' onClick={(e)=>{e.preventDefault();setShow(!show)}}>{!show ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}</button>
                </div>
            </div>
            <div className="col-md-12">
                <label  className="form-label">E-mail</label>
                <input type="text" className="form-control" disabled={isDisabled} value={email || ""} name='email' onChange={e=>{setEmail(e.target.value)}}/>
            </div>
            <div className="col-md-12">
                <label  className="form-label">Numéro</label>
                <input type="text" className="form-control"  disabled={isDisabled} value={numero || ""} name='numero' onChange={e=>{setNumero(e.target.value)}} />
            </div>
            <hr className="style1"></hr>
            <button className='btn btn-warning' onClick={Editting}>Modifier</button>
            {!isDisabled ? <button className='btn btn-danger mx-2' onClick={()=>setIsDisabled(!isDisabled)}>Annuler</button> : ""}
        </form>
    
    </div>
  )
}

export default Profil