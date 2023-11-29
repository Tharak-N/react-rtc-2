import React from "react";
import './MemoizedParticipantGrid.css'
import ParticipantView from "../ParticipantView/ParticipantVew";

function ParticipantGrid({ participantsId }){
  
  const isMobile = window.matchMedia(
    "only screen and (max-width: 650px)"
  ).matches;

  const gridPerRow = 
    isMobile 
    ? participantsId.length < 4 
      ? 1 
      : participantsId.length < 9 
        ? 2 
        : 3  
    : participantsId.length < 5
    ? 2
    : participantsId.length < 7
    ? 3
    : participantsId.length < 9
    ? 4
    : participantsId.length < 10
    ? 3
    : participantsId.length < 11
    ? 4
    : 4; 

  return (
    <>
      <div className={`participant-grid-container ${
        participantsId.length < 2 ? "md-px-16 md-py-2"
        : participantsId.length < 3 ? "md-px-16 md-py-8"
        : participantsId.length < 4 ? "md-px-16 md-py-4"
        : participantsId.length > 4 ? "md-px-14"
        : "md-px-0"
      }`}>
        <div className="d-flex flex-column w-100 h-100">
          { 
            Array.from(
              { length: Math.ceil(participantsId.length / gridPerRow ) }, 
              (_, i) => {
                return (
                  <>
                    <div
                      key={`participant_${i}`}
                      className={`d-flex flex-grow-1 flex-shrink-1 ${`zero-flex-basis`} justify-content-center align-items-center`}
                    >
                      {
                        participantsId
                        .slice(i * gridPerRow, (i + 1) * gridPerRow)
                        .map(participantId => {
                          return (
                            <>
                              <div
                                key={`participant_${participantId}`}
                                className={`d-flex flex-grow-1 flex-shrink-1 w-100 align-items-center justify-content-center h-100 ${
                                  participantsId.length === 1 ? "md-max-w-7xl xl-max-w-1480" : "md-max-w-lg xl-max-w-2xl"
                                } overflow-clip overflow-hidden p-1 object-fit-cover`}
                              >
                                <MemoizedParticipant 
                                  participantId={participantId}
                                />
                              </div>
                            </>
                          )
                        })
                      }
                    </div>
                  </>
                )
              }
            )
          }
        </div>
      </div>
    </>
  ) 
}

const MemoizedParticipant = React.memo(
  ParticipantView,
  (prevProps, nextProps) => {
    return prevProps.participantId === nextProps.participantId
  }
)

const MemoizedParticipantGrid = React.memo(
  ParticipantGrid,
)

export default MemoizedParticipantGrid