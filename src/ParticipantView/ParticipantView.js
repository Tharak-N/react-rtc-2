import { useParticipant } from '@videosdk.live/react-sdk'
import { useEffect, useMemo, useRef } from 'react';
import ReactPlayer from 'react-player';
import './ParticipantView.css'

export default function ParticipantView({ participant }){

  const onMediaStatusChanged = (data) => {
    let { kind, newStatus } = data;
    kind === 'audio' ? micOn = newStatus : webcamOn = newStatus
  }

  let { 
    displayName, 
    webcamStream,
    micStream,
    webcamOn,
    micOn,
    isLocal,
    // isActiveSpeaker
  } = useParticipant(participant, { onMediaStatusChanged })

  const micRef = useRef();

  useEffect(() => {
    if(micRef.current){
      if(micOn && micStream){
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);
        micRef.current.srcObject= mediaStream;
        micRef.current.play().catch((error) => console.log("error", error))
      }
      else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn])


  const webcamMediaStream = useMemo(() => {
    if(webcamOn && webcamStream){
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream
    }
  }, [webcamOn, webcamStream])


  return (
    <>
        <div className='participant-video-cover'>
              <audio ref={micRef} autoPlay muted={isLocal} />
              {
                webcamOn ? (
                  <>
                  <ReactPlayer 
                    playsinline
                    playIcon={<></>}
                    pip={false}
                    light={false}
                    controls={false}
                    muted={false}
                    playing={true}
                    url={webcamMediaStream}
                    height={"100%"}
                    width={"100%"}
                    />
                  </>
                ) : (
                  <div className='participant-image-section'>
                    <div className={`participant-display-image h-52 w-52`}>
                      <p className="participant-name">{ String(participant).charAt(0).toUpperCase() }</p>
                    </div>
                  </div>
                )
              }
            </div>
    </>
  )
}