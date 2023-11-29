
import { useMediaQuery } from 'react-responsive';
import './WaitingScreen.css'

export default function WaitingScreen(){

  const isTab = useMediaQuery({ minWidth:768, maxWidth: 1223 })
  const isMobile = useMediaQuery({ maxWidth: 767 })

  const waitScreenStyle = {
    height:  isTab ? 200 : isMobile ? 200 : 450,
    width: isTab ? 200 : isMobile ? 200 : 450
  }

  return (
   <div className="wait-screen">
    <div style={waitScreenStyle} className="d-flex align-items-center justify-content-center container">
      <div className='row'>
        <div className="col-10 spinner-border text-primary" role="status"></div>
        <div className="col">Joining Meeting...</div>
      </div>
    </div>
   </div>
  );
}