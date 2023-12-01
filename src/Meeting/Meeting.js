import { useEffect, useState } from 'react';
import './Meeting.css'
import { MeetingProvider, createCameraVideoTrack } from '@videosdk.live/react-sdk';
import JoinScreen from '../JoinScreen/JoinScreen'

import { createMeeting } from '../API';
import MeetingContainer from '../MeetingContainer/MeetingContainer';
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:3600')

export default function Meeting(){

  socket.on("connect", () => {
    console.log(":the socket id up on successfull connection is", socket.id)
  })

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJlYTE4YTI5Yy0xNDMzLTRlYTktYTkzZS00MTdmNzhmZTAyMzMiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwMTQwODczNiwiZXhwIjoxNzAxNDI2NzM2fQ.YZeMCPjJntxGmL1zEcaIJROLmx9XuwjtH9R40DoHSjY"
  let initialMeetConfig = {
    meetingId: null,
    micEnabled: false,
    webcamEnabled: false,
    multiStream: false,
    name: null
  }
  let [meetingId, setMeetingId] = useState(null);
  let [meetingConfig, updateMeetingConfig] = useState(initialMeetConfig);
  let [isMeetingLeft, updateMeetingLeftFlag] = useState(false);
  let [isMeetingStart, updateMeetingStartFlag] = useState(false);
  let [doctorId, updateDoctorId] = useState(null);


  const connectToMeeting = async () => {
    let id = meetingId;
    let roomId; 

    if(!!id) roomId = id
    else {
      const roomDetails = await createMeeting({ token: token })
      roomId  = roomDetails?.roomId
    }

    setMeetingId(roomId)
    updateMeetingConfig({
      meetingId: roomId,
      micEnabled: true,
      webcamEnabled: true,
      multiStream: true,
      name: 'Avighna',
    })
    sendMeetId(roomId)
  } 

  const joinMeet = () => {
    updateMeetingConfig({
      meetingId: doctorId,
      micEnabled: true,
      webcamEnabled: true,
      multiStream: true,
      name: 'Avighna',
    })
  }

  useEffect(() => {
      socket.on("doctor_room_id", (data) => {
        console.log("data is ", data)
        updateDoctorId(data.roomId)
      })
  }, [socket])


  function sendMeetId(roomId){
    socket.emit(
      'room1',
      {
        roomId: roomId
      }
    )
  }

  return (
    <>
      <div className="meeting-body">
        {
          !isMeetingStart ? (
            <JoinScreen 
              connectToMeeting={connectToMeeting} 
              updateMeetingStartFlag={updateMeetingStartFlag}
              joinMeet={joinMeet}
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