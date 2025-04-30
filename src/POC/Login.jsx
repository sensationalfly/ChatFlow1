import { Shield, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Function to create a new user in the Firestore
async function createUser(authData) {
  const { uid, photoURL, displayName, email } = authData.user;
  await setDoc(doc(db, "Users", uid), {
    email,
    profile_pic: photoURL,
    name: displayName,
    lastSeen: new Date().toISOString()
  });
}

function Login() {
  const navigate = useNavigate();

  async function handleLogin() {
    const userData = await signInWithPopup(auth, new GoogleAuthProvider());
    await createUser(userData);
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center p-6">
      {/* Glowing card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-indigo-100 relative">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 blur-lg opacity-70"></div>
        
        {/* Header with dynamic gradient */}
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-500 p-8 text-center">
          <div className="flex justify-center items-center gap-3 animate-fade-in">
            <MessageCircle className="h-10 w-10 text-yellow-200" fill="currentColor" />
            <h1 className="text-3xl font-bold text-white drop-shadow-md">ChatFlow</h1>
          </div>
          <p className="text-white/90 mt-3">
            Connect and chat with ease
          </p>
        </div>

        {/* Body */}
        <div className="relative p-8 bg-white">
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              className="h-5 w-5" 
            />
            <span className="text-sm tracking-wide">SIGN IN WITH GOOGLE</span>
          </button>

          <div className="mt-8 text-center text-xs text-gray-500">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-indigo-500" />
              <span>End-to-end encrypted</span>
            </div>
            <p>
              By continuing, you agree to our {" "}
              <a href="#" className="text-indigo-600 font-medium hover:underline">Terms</a> and {" "}
              <a href="#" className="text-indigo-600 font-medium hover:underline">Privacy</a>
            </p>
          </div>
        </div>
      </div>

      {/* Animated footer */}
      <div className="mt-10 text-xs text-indigo-400/80 flex gap-4 animate-pulse">
        <span>Instant messaging</span>
        <span>•</span>
        <span>Custom notifications</span>
        <span>•</span>
        <span>Secure chats</span>
      </div>
    </div>
  );
}

export default Login;
