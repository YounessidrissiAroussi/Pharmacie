import React from 'react'
import './loader.css'
function Loader() {
  return (
    <div className="absCenter ">
    <div className="loaderPill">
        <div className="loaderPill-anim">
            <div className="loaderPill-anim-bounce">
                <div className="loaderPill-anim-flop">
                    <div className="loaderPill-pill"></div>
                </div>
            </div>
        </div>
        <div className="loaderPill-floor">
            <div className="loaderPill-floor-shadow"></div>
        </div>
        <div className="loaderPill-text">Chargement</div>
    </div>
</div>
  )
}

export default Loader