import React from 'react';
import { FaUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const ChatServerMenu = ({ selectedRoom, setSelectedRoom }) => {
    // Dummy list of users in the room
    const userList = [
        { name: 'User 1', typing: true },
        { name: 'User 2', typing: false },
        { name: 'User 3', typing: true },
        { name: 'User 4', typing: false },
        { name: 'User 5', typing: true },
    ];

    return (
        <div className="w-[200px] h-screen bg-transparent flex flex-col pt-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-white text-lg font-semibold">Users in Room</h3>
            </div>
            <div className="flex flex-col space-y-2">
                {userList.map((user, index) => (
                    <div key={index} className="flex items-center py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300">
                        <div className="h-8 w-8 flex-shrink-0">
                            <FaUser className="text-white" />
                        </div>
                        <div className="ml-3 flex flex-col">
                            <span className="text-white font-medium">{user.name}</span>
                            {user.typing && <div className="text-gray-400 text-xs">Typing...</div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatServerMenu;
