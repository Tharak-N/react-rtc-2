import { useMeeting } from "@videosdk.live/react-sdk";
import React, { useMemo } from "react";
import MemoizedParticipantGrid from "../MemoizedParticipantGrid/MemoizedParticipantGrid";

export default function ParticipantsPlaygroundHouse(){

  const { participants } = useMeeting()


  const participantsId = useMemo(() => {
    const ids = [...participants.keys()].filter((participant) => participant)
    return ids
  }, [
    participants
  ])

  return (
    <>
      <MemoizedParticipantGrid 
        participantsId = { participantsId }
      />
    </>
  )
}

