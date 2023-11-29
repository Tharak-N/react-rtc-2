import { useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useMemo, useRef } from "react";
import ReactPlayer from "react-player";
import DisplayName from "../DisplayName/DisplayName";
import './ParticipantView.css'

export default function ParticipantView({ participantId }) {
 
  const onMediaStatusChanged = (data) => {
    const { kind, newStatus } = data;
    kind === 'audio' ? micOn = newStatus : webcamOn = newStatus
  }

  let {
    displayName,
    webcamStream,
    micStream,
    webcamOn,
    micOn,
    isLocal,
    // mode,
    isActiveSpeaker, 
   } = useParticipant(participantId, { onMediaStatusChanged })

   const micRef = useRef();

   useEffect(() => {
    if(micRef.current){
      if(micOn && micStream){
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);
        micRef.current.srcObject = mediaStream;
        micRef.current.play().catch((error) => console.log(error))
      }
      else {
        micRef.current.srcObject = null;
      }
    }
   }, [micStream, micOn])

   const webcamMediaStream = useMemo(() => {
    // check the webcam status and add it to the media stream track 
    if(webcamOn && webcamStream){
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream
    }
   }, [webcamOn, webcamStream])

   return (
    <>
    <div className="video-cover"
     > 
      <audio ref={micRef} autoPlay muted={isLocal} />
      {
        webcamOn ? (
            <ReactPlayer
              playsinline
              playIcon={<></>}
              pip={false}
              light={false}
              controls={false}
              muted={true}
              playing={true}
              url={webcamMediaStream} // assign the mediaStream track to url 
              height={"100%"}
              width={"100%"}
            />
          ) : (
              <div className="participant-image-section">
                <div className={`participant-display-image h-52 h-2xl w-52 w-2xl`}>
                  <p className="name">{ String(displayName).charAt(0).toUpperCase() }</p>
                </div>
              </div>
            )
          }
      <DisplayName
        isLocal={isLocal}
        displayName={displayName}
        micOn={micOn}
        webcamOn={webcamOn}
        participantId={participantId}
        isActiveSpeaker={isActiveSpeaker}
      />
    </div>
  </>
   )
}