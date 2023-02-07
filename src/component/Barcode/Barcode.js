import React from "react"
import { useRef } from "react"
import BarcodeDetector from "barcode-detector"
function Barcode() {
    const video = useRef(null)
    const canvas = useRef(null)
    const openCam = () =>{
        navigator.mediaDevices.getUserMedia({video : {width : 480 , height : 200 }})
        .then(stream =>{
            video.current.srcObject = stream;
            video.current.play();
        
            const ctx = canvas.current.getContext('2d')
            const barcodeDetector = new BarcodeDetector({formats: [
                'qr_code',
                'ean_13',
              ],});
            
            //  const barcodeDetector = new window.BarcodeDetector({formats: [
            //     'qr_code',
            //     'ean_13',
            //   ],});
            setInterval(()=>{
                canvas.current.width = video.current.videoWidth;
                canvas.current.height = video.current.videoHeight;
                ctx.drawImage(video.current , 0 , 0 , video.current.videoWidth, video.current.videoHeight)
                barcodeDetector.detect(canvas.current)
                .then(([data])=>console.log(data))
                .catch(err => console.log(err))
            }, 100)
        })
        .catch(err =>console.log(err))
    }
    
  return (
    <>
    <button onClick={openCam}>Open Camera</button>
    <div>
    <video ref={video} autoPlay muted hidden />
    <canvas ref={canvas}/>
    </div>
    </>
  )
}

export default Barcode