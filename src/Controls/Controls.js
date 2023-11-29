import { useMeeting } from '@videosdk.live/react-sdk';
import './Controls.css'
import { CameraVideoFill, CameraVideoOffFill, MicFill, MicMuteFill, TelephoneFill } from 'react-bootstrap-icons';

export default function Controls({
  updateMeetingLeftFlag
}){
  const { leave, toggleMic, toggleWebcam, localMicOn, localWebcamOn } = useMeeting()

  const handleMicToggle = () => {
    toggleMic()
  }

  const handleWebcamToggle = () => {
    toggleWebcam()
  }

  const getBtnClassName = (mediaStatus, mediaType) => {
    if(mediaType === 'mic') return mediaStatus ? 'btn btn-primary' : 'btn btn-danger' 
    else return mediaStatus ? 'btn btn-primary' : 'btn btn-danger'
  }

  const leaveMeeting = () => {
    leave()
    updateMeetingLeftFlag(true)
  }

  const controlButtonStyles = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backGroundColor: "292B2C",
    padding: 0
  }

  return (
    <>
      <div className='controls-tab'>
        <button className={ getBtnClassName(localMicOn, 'mic') } style={controlButtonStyles} type='button' onClick={handleMicToggle}>
          { localMicOn ? <MicFill /> : <MicMuteFill /> }
        </button>
        <button className={ getBtnClassName(localWebcamOn, 'webcam') } style={controlButtonStyles} type='button' onClick={handleWebcamToggle}>
          { localWebcamOn ? <CameraVideoFill /> : <CameraVideoOffFill /> }
        </button>
        <button className='btn btn-danger' type='button' style={controlButtonStyles} onClick={leaveMeeting}>
          <TelephoneFill className='telephone-icon'/>
        </button>
      </div>
    </>
  );
}