import ChatPanel from "./ChatPanel";
import ChatWindow from "./ChatWindow";

function Home() {
  return (
    <div className="relative w-full h-screen bg-[#f5f3ff]">
      {/* Background layer - modern alternative to your green header */}
      <div className="absolute top-0 h-[180px] w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7]" />
      
      {/* Content container */}
      <div className="absolute top-5 left-5 right-5 bottom-5 flex rounded-xl overflow-hidden shadow-lg">
        {/* Sidebar */}
        <div className="w-[300px] bg-white">
          <ChatPanel />
        </div>
        
        {/* Main chat area */}
        <div className="flex-1 bg-[#f9f9ff]">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}

export default Home;