import React ,{useState , useEffect}from 'react'
import RouterPath from '../SideNavBar/RouterPath'
import './style.css'
import axios from 'axios'
function Login() {
    const [show , setShow] = useState(false)
    const [data ,setData ] = useState([])
    const [email,setEmail] = useState("")
    const [pass,setpass] = useState("")
    const [Connecter,setConnecter] = useState(false)
    const Error = ({Eerror : "Votre Nom de Utilisateur est incorrect",Perror : "Votre Mot de passe est incorrect"})
    const[Emess , setEmss ] = useState();
    const[Pmess ,setPmess]  = useState();
    const [user , setUser] = useState()
    const getLogin = ()=>{
        axios.get('http://localhost/Pharmacie/backend/tables/login.php')
        .then(Response=>{
            setData(Response.data)
        })
    } 
   useEffect(()=>{
        getLogin()
    },[])
    const Login = (e) =>{
        e.preventDefault()
        const LoginE =data.find(lo=>lo.NomUtilisateur === email)
        setUser(LoginE)
        if(LoginE){
            setEmss("")
            if (pass === LoginE.Motdepasse){
                setConnecter(!Connecter)

            }else{
                setPmess(Error.Perror)
            }
        }else{
            setEmss(Error.Eerror)
        }
    }
    const myform = (
        <div className="login">
         <h1 style={{textAlign : "center"}}>Pharmacie</h1>
        <div className="loginforms">
            <h2 style={{textAlign : "center"}}>Connecter</h2>
        <div className="col-md-12 ">
                <label  className="form-label">Utilisateur</label>
                <input type="text" className="form-control text-left"name='nomUtilisateur' onChange={(e)=>setEmail(e.target.value)}/>
                {<div style={{color : "red"}}>{Emess}</div>}
            </div>
            <div className="col-md-12">
                <label className="form-label">Mot de Passe</label>
                <div className="password">
                <input type={!show ? "password" : "text"} className="form-control text-left"  name='motdepasse' onChange={(e)=>setpass(e.target.value)} />
                <button className='btn btn-info mx-2' onClick={(e)=>{e.preventDefault();setShow(!show)}}>{!show ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}</button>
                </div>
                {<div style={{color : "red"}}>{Pmess}</div>}
            </div>
            <div className="col-md-12 ">
                <button className='btn btn-success mt-2' onClick={Login}>Se Connecter</button>
            </div>
        </div>


        
    </div>
       
    )
  return Connecter ?(
     <RouterPath name = {user} logout = {true}/> 
  ):(myform)
}

export default Login