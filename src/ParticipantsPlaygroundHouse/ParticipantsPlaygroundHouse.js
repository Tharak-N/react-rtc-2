import { useMeeting } from "@videosdk.live/react-sdk";
import React from "react";
import PresenterView from "../PresenterView/PresenterView";
import './ParticipantsPlaygroundHouse.css'

export default function ParticipantsPlaygroundHouse(){

  let { participants } = useMeeting()

  let participantsId = [...participants.keys()].filter((participant) => participant)

  return (
    <>
      <div className="participant-playground-container">
        <div className="d-flex flex-grow-1 flex-shrink-1 flex-column justify-content-center align-items-center w-100 h-100" style={{maxHeight: "50rem", maxwidth: "50rem"}}>
          <PresenterView
            presenterId={ participantsId.pop() }
            attendees={ !!participantsId[0] ? [participantsId[0]] : [] }
          />
        </div>
      </div>
    </>
  )
}

