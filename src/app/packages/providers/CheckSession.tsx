'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const CheckSession = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    const session=useSession()
    const router=useRouter()
if(!session?.data?.user){
        router.push('/home')
    }
  return (
    <div>
      {children}
    </div>
  )
}

export default CheckSession
