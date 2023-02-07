import React ,{ useState , useEffect }from 'react'
import 'font-awesome/css/font-awesome.min.css';
import DashItem from './DashItem';
import News from './News';
import Loader from '../../Loader/Loader'
import Heure from './Heure';
function Acceuil() {
const [isloding , setLoding] = useState(true)
useEffect(()=>{
  document.title = "Acceuil"
  setTimeout(()=>{
    setLoding(false)
  },3000)
},[])
  return isloding ? (<Loader/>) : (
   <div className='container mx-2 mt-2' >
    <Heure/>
      <News/>
      <DashItem/>
   </div>
  )
}

export default Acceuil