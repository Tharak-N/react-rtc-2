import { useMeeting } from '@videosdk.live/react-sdk';
import './MeetingView.css'
import { useState } from "react";
import ParticipantView from '../ParticipantView/ParticipantVew';
import { Clipboard, Clipboard2Check } from 'react-bootstrap-icons';

export default function MeetingView({ meetId }){
  let [joinFlag, updateJoinFlag] = useState(null);
  let [clipbordContent, updateClipboardContent] = useState(null);
  const { join, participants } = useMeeting({
    onMeetingJoined: () => {
      updateJoinFlag('JOINED')
    },
    onParticipantJoined: () => {
      updateJoinFlag('JOINED')
    },
    onMeetingLeft: () => {
      // call on meeting leave func
    }
  })
  
  const joinMeeting = () => {
    updateJoinFlag('JOINING')
    join()
  }

  const participantsDisplaySection = () => {
    return [...participants.keys()].map((participantId, index) => {
      return (
        <>
          <ParticipantView 
            participantId = {participantId}
            key={index}
          />
        </>
      );
    })
  }

  const handleClipbordClick = () => {
    updateClipboardContent(meetId)
  } 

  return (
    <>
      <div className="meeting-view">
        {
          !!!joinFlag && (
          <div className='d-flex justify-content-between meeting-details'>
            <button className='btn btn-light ml-2 clipboard' onClick={handleClipbordClick}>
              <span className='ml-2'>{meetId}</span>{ !!clipbordContent ? <Clipboard2Check /> : <Clipboard /> }
            </button>
          </div>
          )
        }
        <div>
        {
          joinFlag && joinFlag === 'JOINED' 
          ? (
            <div>
              { participantsDisplaySection() }
            </div>
          )
          : joinFlag && joinFlag === 'JOINING'
          ? (
            <div className='d-flex flex-row justify-content-between mt-4 join-spinner' >
              <div className='spinner-border text-primary' role='status'></div>
              <p className='mt-1'>Joining.....</p>
            </div>
            )
            : (
              <div>
                <button className="btn btn-primary" onClick={joinMeeting}>Join now</button>
              </div>
            )
        }
        </div>
      </div>
    </>
  );
}