import { useEffect, useState } from 'react';
import './Meeting.css'
import { MeetingProvider } from '@videosdk.live/react-sdk';
import JoinScreen from '../JoinScreen/JoinScreen'

import { createMeeting, getToken } from '../API';
import MeetingContainer from '../MeetingContainer/MeetingContainer';
import { requestNotificationAccess } from '../Firebase/firebase';

export default function Meeting(){
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJlYTE4YTI5Yy0xNDMzLTRlYTktYTkzZS00MTdmNzhmZTAyMzMiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwMTE1NTA3MSwiZXhwIjoxODU4OTQzMDcxfQ.sHQ4OBsq_e31vECXqx1H165-v70Wtu95hRGoeJYjpKU"
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
  let [token, updateToken]  = useState(null);

  const connectToMeeting = async (meetId) => {
    const _token = await getToken(); // get the token first

    let id = localStorage.getItem("roomId") ?? null
    let roomId; 

    if(!!id) roomId = id
    else {
      const roomDetails = await createMeeting({ token: _token.token })
      roomId  = roomDetails?.roomId
      localStorage.setItem("roomId", roomId)
    }
    updateToken(_token.token)
    setMeetingId(roomId)

    updateMeetingStartFlag(true)
    // updateMeetingConfig({
    //   meetingId: roomId,
    //   micEnabled: true,
    //   webcamEnabled: true,
    //   multiStream: true,
    //   name: 'Avighna',
    // })
  } 

  useEffect(() => {
    // requestNotificationAccess()
  }, [])

  return (
    <>
      <div className="meeting-body">
        {
          isMeetingStart ? (
            <>
              <MeetingProvider 
                config={{
                  meetingId: meetingId,
                  micEnabled: true,
                  webcamEnabled: true,
                  multiStream: true,
                  name:''
                }} 
                token={token}
              >
                <MeetingContainer
                  updateMeetingLeftFlag={updateMeetingLeftFlag}
                />
              </MeetingProvider> 
            </>
          ) : isMeetingLeft ? (
            <p>Left meeting</p>
            ) : (
              <JoinScreen 
                connectToMeeting={connectToMeeting} 
                updateMeetingStartFlag={updateMeetingStartFlag}
              ></JoinScreen>
            )
        }
      </div>
    </>
  );
}