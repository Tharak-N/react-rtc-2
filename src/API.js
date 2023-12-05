
export const createMeeting = async ({ token }) => {
  let requestInfo = {
    method: 'POST',
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({})
  }
  return (await fetch('https://api.videosdk.live/v2/rooms', requestInfo)).json()
}

export const getToken = async () => {
  let requestInfo = {
    method: 'GET',
    body: JSON.stringify({})
  }    
  return (await fetch('http://localhost:3600/token')).json()
}