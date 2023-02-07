import React , {useState} from 'react'
import TypeMedicaments from '../typeMedicament/TypeMedicaments'
import Profil from '../profil/Profil'
import './parameter.css'
import { useEffect } from 'react'
function Parametre() {
    const [medicament , setmedicament] = useState(true)
    useEffect(()=>{
        document.title ='Parametre'
    },[])
  return (
    <div className='parameter mt-3 mx-3'>
        <h1>
            Parametre
        </h1>
        <div className='showchose'>
        <div className='chose1'>
      <div className="columns mt-5">
        <button className='btnbtn' onClick={()=>{setmedicament(true)}}>
            <div className='columnOne' >
                <img src='icons/folder.svg' className='medicament' alt='medicament'></img>
                <h5>Type Medicament</h5>
            </div>
            </button>
        </div>
        <div className="columns mt-5">
        <button className='btnbtn' >
            <div className='columnOne' onClick={()=>{setmedicament(false)}}>
                <img src='icons/user.svg' className='profile' alt='medicament'></img>
                <h5>Profile</h5>
            </div>
            </button>
        </div>
      </div>
        <div className='Chose'>
           {medicament ?  <TypeMedicaments/> : <Profil/>}
        </div>
        </div>
        
    </div>
  )
}

export default Parametre