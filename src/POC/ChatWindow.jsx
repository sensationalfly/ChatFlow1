import { MessageSquareText, Plus, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

function ChatWindow() {
    const params = useParams();
    const [msg, setMsg] = useState("");
    const [secondUser, setSecondUser] = useState(null);
    const [msgList, setMsgList] = useState([]);
    const { userData } = useAuth();

    const receiverId = params?.uniqueId;
    const chatId = userData?.id && receiverId 
        ? userData.id > receiverId 
            ? `${userData.id}-${receiverId}` 
            : `${receiverId}-${userData.id}`
        : null;

    const handleSendMsg = async () => {
        if (!msg || !chatId) return;

        try {
            const date = new Date();
            const timeStamp = date.toLocaleString("en-Us", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            });

            const messageData = {
                text: msg,
                time: timeStamp,
                sender: userData.id,
                receiver: receiverId,
            };

            const chatRef = doc(db, "user-chats", chatId);
            const chatSnap = await getDoc(chatRef);

            if (!chatSnap.exists()) {
                await setDoc(chatRef, {
                    chatId: chatId,
                    messages: [messageData],
                });
            } else {
                await updateDoc(chatRef, {
                    messages: arrayUnion(messageData),
                });
            }

            setMsg("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    useEffect(() => {
        if (!receiverId) return;

        const getUser = async () => {
            try {
                const docRef = doc(db, "Users", receiverId);
                const docSnap = await getDoc(docRef);
                setSecondUser(docSnap.exists() ? docSnap.data() : null);
            } catch (error) {
                console.error("Error fetching user:", error);
                setSecondUser(null);
            }
        };
        getUser();

        if (!chatId) return;

        let unsubscribe;
        try {
            unsubscribe = onSnapshot(doc(db, "user-chats", chatId), (doc) => {
                setMsgList(doc.exists() ? doc.data()?.messages || [] : []);
            });
        } catch (error) {
            console.error("Error setting up message listener:", error);
        }

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [receiverId, chatId]);

    if (!receiverId) {
        return (
            <section className="w-full h-full flex flex-col gap-4 items-center justify-center bg-white">
                <MessageSquareText className="w-16 h-16 text-indigo-300" strokeWidth={1.2} />
                <p className="mt-4 text-indigo-400 text-center">Select a contact<br />to start chatting</p>
            </section>
        );
    }

    if (!secondUser) {
        return (
            <section className="w-full h-full flex flex-col gap-4 items-center justify-center bg-white">
                <p className="text-indigo-400">Loading conversation...</p>
            </section>
        );
    }

    return (
        <section className="w-full h-full flex flex-col bg-white">
            {/* Header */}
            <div className="bg-white p-4 border-b border-indigo-100 flex items-center gap-3">
                <img 
                    src={secondUser.profile_pic || "/default-user.png"} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full border-2 border-indigo-100"
                />
                <div>
                    <h3 className="font-medium text-indigo-900">{secondUser.name || "Unknown User"}</h3>
                    {secondUser?.lastSeen && (
                        <p className="text-xs text-indigo-400">
                            Last seen {secondUser.lastSeen}
                        </p>
                    )}
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {msgList.map((m, index) => (
                    <div 
                        key={index}
                        className={`flex ${m.sender === userData.id ? "justify-end" : "justify-start"}`}
                    >
                        <div 
                            className={`max-w-[75%] rounded-xl p-3 ${m.sender === userData.id 
                                ? "bg-indigo-500 text-white rounded-br-none" 
                                : "bg-white text-indigo-900 border border-indigo-100 rounded-bl-none"}`}
                        >
                            <p className="text-sm">{m.text}</p>
                            <p className={`text-xs mt-1 text-right ${m.sender === userData.id ? "text-indigo-200" : "text-indigo-400"}`}>
                                {m.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="bg-white p-4 border-t border-indigo-100">
                <div className="flex items-center gap-2 bg-indigo-50 rounded-full px-4 py-2 w-full">
                    <button className="text-indigo-500 hover:text-indigo-700">
                        <Plus size={20} />
                    </button>
                    <input
                        type="text"
                        className="flex-1 bg-transparent outline-none text-indigo-900 placeholder-indigo-300 text-sm"
                        placeholder="Type a message..."
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMsg()}
                    />
                    <button 
                        onClick={handleSendMsg}
                        className="text-indigo-500 hover:text-indigo-700"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ChatWindow;
