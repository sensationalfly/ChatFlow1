import { ArrowLeft, Save, Edit2, Loader2, LogOut } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from './AuthContext';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Profile(props) {
  const navigate = useNavigate();
  const { userData, updateName, updateStatus, updatePhoto, isUploading, error } = useAuth();
  const [name, setName] = useState(userData?.name || "");
  const [status, setStatus] = useState(userData?.status || "");

  const handleLogout = () => {
    signOut(auth);
    navigate("/login")
  }

  return (
    <div className='w-full h-full bg-[#f8fafc]'> 
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-5 px-6 flex items-center gap-4">
        <button 
          onClick={props.onBack}
          className="p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-medium">Profile Settings</h1>
      </div>

      {/* Profile Content */}
      <div className="flex flex-col items-center px-6 py-8 gap-8">
        {/* Profile Picture */}
        <label className={`relative group cursor-pointer ${isUploading ? "pointer-events-none" : ""}`}>
          <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg overflow-hidden">
            <img 
              src={userData.profile_pic} 
              className="w-full h-full object-cover"
              alt="Profile"
            />
          </div>
          
          {isUploading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
              <Edit2 className="w-6 h-6 text-white" />
            </div>
          )}
          
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={(e) => updatePhoto(e.target.files?.[0])}
            className="hidden"
          />
        </label>

        {error && (
          <p className="text-red-500 text-sm -mt-4">{error}</p>
        )}

        {/* Name Field */}
        <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-sm">
          <label className="block text-sm font-medium text-[#64748b] mb-2">Your Name</label>
          <div className="relative flex items-center">
            <input
              value={name}
              className="w-full pr-12 px-4 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50"
              placeholder="Enter your name..."
              onChange={(e) => setName(e.target.value)}
            />
            <button 
              onClick={() => updateName(name)}
              className="absolute right-0 p-2 text-[#6366f1] hover:bg-[#6366f1]/10 rounded-full transition-colors"
            >
              <Save size={20} />
            </button>
          </div>
        </div>

        {/* Status Field */}
        <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-sm">
          <label className="block text-sm font-medium text-[#64748b] mb-2">Your Status</label>
          <div className="relative flex items-center">
            <input
              value={status}
              className="w-full pr-12 px-4 py-2 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50"
              placeholder="Enter your status..."
              onChange={(e) => setStatus(e.target.value)}
            />
            <button 
              onClick={() => updateStatus(status)}
              className="absolute right-0 p-2 text-[#6366f1] hover:bg-[#6366f1]/10 rounded-full transition-colors"
            >
              <Save size={20} />
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="mt-4 flex items-center gap-2 px-6 py-3 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-lg transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Profile
