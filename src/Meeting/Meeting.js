import { useEffect, useState } from 'react';
import './Meeting.css'
import { MeetingProvider, createCameraVideoTrack } from '@videosdk.live/react-sdk';
import JoinScreen from '../JoinScreen/JoinScreen'

import { createMeeting } from '../API';
import MeetingContainer from '../MeetingContainer/MeetingContainer';

export default function Meeting(){
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJlYTE4YTI5Yy0xNDMzLTRlYTktYTkzZS00MTdmNzhmZTAyMzMiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwMTQwODczNiwiZXhwIjoxNzAxNDI2NzM2fQ.YZeMCPjJntxGmL1zEcaIJROLmx9XuwjtH9R40DoHSjY"
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
  let [customVideoTrack, setCustomTrack] = useState(null);

  const getTrack = async () => {
    const track = await createCameraVideoTrack({
      optimizationMode: "motion",
      encoderConfig: "h2160p_w3840p",
      facingMode: "front",
      // multiStream: true,
    });
    setCustomTrack(track);
  };

  useEffect(() => {
    // getTrack()
  }, [])

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
      customCameraVideoTrack: customVideoTrack, 
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
          ) : <p>Meeting Ended</p>
        }
      </div>
    </>
  );
}