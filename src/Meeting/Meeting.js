import { useState } from 'react';
import './Meeting.css'
import { MeetingProvider } from '@videosdk.live/react-sdk';
import JoinScreen from '../JoinScreen/JoinScreen'

import { createMeeting } from '../API';
import MeetingContainer from '../MeetingContainer/MeetingContainer';

export default function Meeting(){
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJlYTE4YTI5Yy0xNDMzLTRlYTktYTkzZS00MTdmNzhmZTAyMzMiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwMTE1NTA3MSwiZXhwIjoxODU4OTQzMDcxfQ.sHQ4OBsq_e31vECXqx1H165-v70Wtu95hRGoeJYjpKU"
  let initialMeetConfig = {
    meetingId: null,
    micEnabled: false,
    webcamEnabled: false,
    name: null
  }
  let [meetingId, setMeetingId] = useState(null);
  let [meetingConfig, updateMeetingConfig] = useState(initialMeetConfig);
  let [isMeetingLeft, updateMeetingLeftFlag] = useState(false);
  let [isMeetingStart, updateMeetingStartFlag] = useState(false);

  const connectToMeeting = async (meetId) => {
    let id = localStorage.getItem("roomId") ?? null
    let roomId; 
    if(!!id) roomId = id
    else {
      const roomDetails = await createMeeting({ token: token })
      roomId  = roomDetails?.roomId
      localStorage.setItem("roomId", roomId)
    }

    setMeetingId(roomId)
    updateMeetingConfig({
      meetingId: roomId,
      micEnabled: true,
      webcamEnabled: true,
      multiStream: true,
      name: 'Avighna',
    })
  } 

  return (
    <>
      <div className="meeting-body">
        {
          !isMeetingStart ? (
            <JoinScreen 
              connectToMeeting={connectToMeeting} 
              updateMeetingStartFlag={updateMeetingStartFlag}
            ></JoinScreen>
          ) : !isMeetingLeft ? (
            <>
              <MeetingProvider 
                config={meetingConfig} 
                token={token} 
              >
                <MeetingContainer
                  updateMeetingLeftFlag={updateMeetingLeftFlag}
                />
              </MeetingProvider> 
            </>
          ) : <p>Left meeting</p>
        }
      </div>
    </>
  );
}