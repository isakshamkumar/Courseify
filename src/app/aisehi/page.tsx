import React from 'react'
import { addJobs } from '../packages/config/Producer'
import '../packages/config/Worker'
import { sendEmail } from '../packages/config/Mailer'
type Props = {}

const page = async(props: Props) => {
    // await addJobs()
    // await sendEmail()
  return (
    <div>page</div>
  )
}

export default page