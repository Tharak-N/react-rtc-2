import { MicMuteFill } from 'react-bootstrap-icons'
import './DisplayName.css'

export default function DisplayName({
  isLocal,
  displayName,
  micOn,
  webcamOn,
  participantId,
  isActiveSpeaker
}){
  return (
    <>
      <div className="display-section">
        <div className='display-name'>
          { isLocal ? displayName : displayName }
        </div>
        {
          !micOn ? (
            <div  className='mic-icon'>
              <MicMuteFill /> 
            </div>
          ) : null
        }
      </div>
    </>
  )
}