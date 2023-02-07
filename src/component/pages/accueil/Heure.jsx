import React from 'react'
import './dash.css'
function Heure() {
    let localDate = new Date();
    let getDay = localDate.getDate() 
    let getMonth = localDate.getMonth()
    let getYears = localDate.getFullYear()
    if(localDate.getDate()<10){
        getDay =  "0"+localDate.getDate() 
    }
    if(localDate.getMonth()<10){
        getMonth =  "0"+(localDate.getMonth() +1)
    }
  return (
       <div className="date-area">
        <input type='text' disabled defaultValue={getDay+"-"+getMonth+"-"+getYears} />
      </div>
  )
}

export default Heure