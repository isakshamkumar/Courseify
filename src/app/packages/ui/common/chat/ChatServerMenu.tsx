import React, { useState } from 'react'
import { BiLogoReact,BiLogoNodejs  } from "react-icons/bi";
import { DiPython } from "react-icons/di";

import { DiDatabase } from "react-icons/di";

type Props = {}
const joinedChatServerList=[{
    icon:<BiLogoReact />,
    name:'Front end Development'
},
{
icon:<BiLogoNodejs/>,
name:'Node js'
},
{
    icon:<BiLogoNodejs/>,
    name:"Backend Development"
},
{
    icon:<DiDatabase/>,
    name:"Devops"
}
]
const featuredChatServerList=[
    {
        icon:<DiPython/>,
        name:"AI"
    },
    {
        icon:<DiPython/>,
        name:"ML"
    }
]
const ChatServerMenu = (props: Props) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div style={{width:`${!isOpen?'100px':'500px'}`}} className={`relative transition-width duration-500 ease-in-out bg-slate-200 h-screen ml-20 pt-4`}>
          <button onClick={() => setIsOpen(!isOpen)} className={`absolute top-0 ${isOpen &&'right-0'} ${!isOpen && 'top-8'} m-4 rounded-lg bg-slate-300 p-2`}>
            {isOpen ? 'Close' : 'Open'}
          </button>
    
            <>
            {isOpen &&  <h3 className='text-center text-xl mt-4'>Joined Chat Servers</h3> }
             
              <ul style={{display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center'}} className={`${!isOpen?'mt-20':'mt-1'}`}>
                {joinedChatServerList.map((server, _i) => (
                  <li className={`flex justify-center items-center text-lg  gap-2 h-12 my-2 hover:bg-gray-200  border border-stone-400 bg-gray-300 w-5/6 rounded-lg `}>
                    {server.icon} {isOpen && server.name } 
                  </li>
                ))}
              </ul>
              <hr className='mt-8 w-full h-1 bg-slate-600' />
              {isOpen && <h3 className='text-center text-xl mt-8'>Featured Chat Servers</h3> }
             
              <ul style={{display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
                {featuredChatServerList.map((server, _i) => (
                  <li className='flex justify-center items-center text-lg  gap-2 h-12 my-2 hover:bg-gray-200  border border-stone-400 bg-gray-300 w-4/6 rounded-lg '>
                    {server.icon} {isOpen && server.name } 
                  </li>
                ))}
              </ul>
            </>
         
        </div>
      )
}

export default ChatServerMenu