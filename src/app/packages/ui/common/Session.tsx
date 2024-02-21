'use client'
import { useSession } from 'next-auth/react'
import React from 'react'

const Session = () => {
    const session=useSession()
    console.log(session,'from session');
    
  return (
    <div>
        {session.status==='authenticated' ? <div>Welcome!{session.data?.user?.name}</div>:'Login Please'}
      
    </div>
  )
}

export default Session
