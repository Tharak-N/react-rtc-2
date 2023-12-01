import { useState } from 'react'
import './JoinScreen.css'

export default function JoinScreen({ connectToMeeting, updateMeetingStartFlag, joinMeet }) {
  // let elemRef = useRef();
  // let [user, setUser] = useState('ADMIN')
  let [id, updateId] = useState('');
  let [joinFlag, updateJoinFlag] = useState(false);
  // let meetingInputValue = 'Good Game'

  const joinMeeting = async () => {
    // await connectToMeeting()
    joinMeet()
    updateMeetingStartFlag(true)
  }
  
  const navigateToMeetStageOne = () => {
    updateJoinFlag(true)
  }

  const createMeeting = async () => {
    await connectToMeeting()
    updateMeetingStartFlag(true)
  }

  return (
    <>
      {
        !joinFlag && 
        <div className="join-screen-section">
          {/* { user === 'ADMIN' 
            ? (<button className='btn btn-primary'>Create Meeting</button>) 
            : (<button className='btn btn-primary'>Join Meeting</button>)
          }  */}
          <button className='btn btn-primary' onClick={joinMeeting}>Join Meeting</button>
          <button className='btn btn-primary' onClick={createMeeting}>Create Meeting</button>
        </div>
      }
      {/* Pre Meeting Stage-1*/}
      {
        joinFlag && 
        <div className='join-screen-section'>
          <input 
            placeholder='Enter Meeting Id'
            type='text'
            className='form-control'
            // ref={elemRef}
            onChange={(e) => updateId(e.target.value)}
          />
          <button className='btn btn-primary' onClick={joinMeeting}>Join Meeting</button>
        </div>
      }
    </>
  )
}