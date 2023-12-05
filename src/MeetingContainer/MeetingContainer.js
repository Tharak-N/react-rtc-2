import { createRef, useEffect, useState } from "react";
import WaitingScreen from "../WaitingScreen/WaitingScreen";
import { useMeeting } from "@videosdk.live/react-sdk";
// import SideBarContainer from "../SideBar/SideBarContainer";
import { useMediaQuery } from "react-responsive";
import Controls from "../Controls/Controls";
import './MeetingContainer.css'
import ParticipantsPlaygroundHouse from "../ParticipantsPlaygroundHouse/ParticipantsPlaygroundHouse";
import Notification from "../Notification";

export default function MeetingContainer({
  updateMeetingLeftFlag
}){
  const [containerHeight, updateContainerHeight] = useState(0);
  const [containerWidth, updateContainerWidth] = useState(0);
  let [joinFlag, updateJoinFlag] = useState('JOINING');
  const { join } = useMeeting({
    onMeetingJoined: () => {
      updateJoinFlag('JOINED')
    },
    onParticipantJoined: () => {
      updateJoinFlag('JOINED')
    }
  })

  /**
   * Subscribing to the CSS media query changes for providing responsiveness to change in the view 
   * @return true if this screen view matches the provided condition value 
   */
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const isTab = useMediaQuery({ minWidth: 768, maxWidth: 1223 });
  const isLGDesktop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 })
  const isXLDesktop = useMediaQuery({ minWidth: 1440 });
  const sideBarWidth = isXLDesktop ? 400 : isLGDesktop ? 360 : isTab ? 320 : isMobile ? 280 : 240; 

  // join the meeting immediately without any step procedure
  useEffect(() => {
    join()
  }, [])

  const containerRef = createRef();

  // whenever there is change in the width / height of the container
  useEffect(() => {
    if(containerRef.current?.offsetHeight) updateContainerHeight(containerRef.current?.offsetHeight)
    if(containerRef.current?.offsetWidth) updateContainerWidth(containerRef.current?.offsetWidth)

    window.addEventListener('resize', ({ target }) => {
      if(containerRef.current?.offsetHeight) updateContainerHeight(containerRef.current?.offsetHeight)
      if(containerRef.current?.offsetWidth) updateContainerWidth(containerRef.current?.offsetWidth)
    })
  }, [containerRef])


  return (
    <>
      {/* for covering the entire visible area of the screen */}
      <div className="meeting-container-screen">
        <div ref={containerRef} className="meeting-section">
          {
            joinFlag === 'JOINING'
            ? (
              <WaitingScreen />
            )
            : (
              <>
                <div className="d-flex flex-row flex-grow-1 justify-content-center"
                >
                  <div className="d-flex flex-row flex-grow-1">
                    <ParticipantsPlaygroundHouse />
                  </div>
                  {/* <SideBarContainer 
                    width={sideBarWidth}
                    height={containerHeight}
                  /> */}
                   <Notification />
                </div>
                <Controls
                  updateMeetingLeftFlag={updateMeetingLeftFlag}
                />
              </>
            )
          }
        </div>
      </div>
    </>
  );  
}