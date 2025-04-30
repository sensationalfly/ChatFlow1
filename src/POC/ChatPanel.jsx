import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { CircleFadingPlus, Loader2, MessageSquare, Search, User } from 'lucide-react';
import Profile from './Profile';
import UserCard from './userCard';
import { useAuth } from './AuthContext';

function ChatPanel() {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [showProfile, setShowProfile] = useState(false);
    const { userData } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(collection(db, 'Users'));
            const arrayOfUsers = data.docs.map((doc) => ({ 
                userData: doc.data(), 
                id: doc.id 
            }));
            setUsers(arrayOfUsers);
            setLoading(false);
        };
        getUsers();
    }, []);

    const onBack = () => { setShowProfile(false) };

    if (isLoading) return (
        <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-[#04a784]" />
        </div>
    );

    if (showProfile) return <Profile onBack={onBack} />;

    const filteredUsers = searchQuery 
        ? users.filter(user => 
            user.userData.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
        : users;

    return (
        <div className='bg-white w-full h-full flex flex-col border-r border-[#e0e4e9]'>
            {/* Header */}
            <div className='bg-white p-4 border-b border-[#e0e4e9] flex justify-between items-center'>
                <button 
                    onClick={() => setShowProfile(true)}
                    className="flex items-center gap-3"
                >
                    <img 
                        src={userData?.profile_pic || "/default-user.png"} 
                        alt="Profile" 
                        className='w-10 h-10 rounded-full object-cover border border-[#e0e4e9]' 
                    />
                    <span className="font-medium text-gray-800">{userData?.name}</span>
                </button>
                
                <div className='flex items-center gap-4 text-gray-600'>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <CircleFadingPlus className='w-5 h-5' />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <MessageSquare className='w-5 h-5' />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <User className='w-5 h-5' />
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className='p-3 bg-white'>
                <div className='bg-[#eff2f5] flex items-center gap-3 px-4 py-2 rounded-lg'>
                    <Search className='w-4 h-4 text-gray-500' />
                    <input 
                        className='bg-transparent w-full focus:outline-none text-gray-700 placeholder-gray-500'
                        placeholder='Search contacts'
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* User List */}
            <div className='flex-1 overflow-y-auto'>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(userObj => (
                        <UserCard userObj={userObj} key={userObj.id} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                        <Search className="w-8 h-8 mb-2" />
                        <p>No contacts found</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatPanel;
