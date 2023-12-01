
import './Attendees.css'
import ParticipantView from '../ParticipantView/ParticipantView'

export default function Attendees({ attendees }){

  return (
    <>
      {/* <div className='d-flex flex-row justify-content-center align-items-center'> */}
        {/* <div className='d-flex flex-column flex-grow-1 flex-shrink-1'> */}
          <div className='attendees'>
            {
              attendees.map((participant) => {
                return (
                  <>
                    <div className='d-flex flex-column flex-grow-1 flex-shrink-1' style={{ maxHeight: "230px", maxWidth: "230px"}}>
                      <ParticipantView 
                        participant={participant}
                      />
                    </div>
                  </>
                )
              })
            }      
          </div>
        {/* </div> */}
      {/* </div> */}
    </>
  )
}