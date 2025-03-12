import React, { useState } from "react";
import Sidebar from "./Sidebar.tsx";
import ConversationView from "./ConversationView";

interface User {
  id: string;
  name: string;
  avatar?: string;
  status: "online" | "offline" | "away";
  lastSeen?: string;
}

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  isRead: boolean;
  isSent: boolean;
  isOwn: boolean;
}

interface Conversation {
  id: string;
  user: User;
  messages?: Message[];
}

interface ChatLayoutProps {
  conversations?: Conversation[];
  currentUserId?: string;
  userAvatar?: string;
  userName?: string;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({
  conversations = [
    {
      id: "1",
      user: {
        id: "user1",
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        status: "online",
        lastSeen: "Last seen 5 minutes ago",
      },
      messages: [
        {
          id: "1",
          content: "Hey there! How are you doing today?",
          sender: {
            id: "user1",
            name: "Sarah Johnson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
          },
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
          isRead: true,
          isSent: true,
          isOwn: false,
        },
        {
          id: "2",
          content:
            "I'm doing great! Just finished that project we were working on.",
          sender: {
            id: "current-user",
            name: "Current User",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=current",
          },
          timestamp: new Date(Date.now() - 3500000), // 58 minutes ago
          isRead: true,
          isSent: true,
          isOwn: true,
        },
        {
          id: "3",
          content:
            "That's awesome! Can you send me the files when you get a chance?",
          sender: {
            id: "user1",
            name: "Sarah Johnson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
          },
          timestamp: new Date(Date.now() - 3400000), // 56 minutes ago
          isRead: true,
          isSent: true,
          isOwn: false,
        },
      ],
    },
    {
      id: "2",
      user: {
        id: "user2",
        name: "Alex Morgan",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        status: "offline",
        lastSeen: "Last seen yesterday",
      },
      messages: [],
    },
    {
      id: "3",
      user: {
        id: "user3",
        name: "Emily Davis",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
        status: "away",
        lastSeen: "Last seen 30 minutes ago",
      },
      messages: [],
    },
  ],
  currentUserId = "current-user",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=currentUser",
  userName = "John Doe",
}) => {
  const [activeConversationId, setActiveConversationId] = useState<string>(
    conversations[0]?.id || "",
  );

  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeConversationId,
  );

  const handleSelectConversation = (conversationId: string) => {
    setActiveConversationId(conversationId);
  };

  const handleSendMessage = (message: string) => {
    console.log(
      "Message sent:",
      message,
      "to conversation:",
      activeConversationId,
    );
    // In a real app, this would add the message to the conversation and send it to the backend
  };

  return (
    <div className="flex h-full w-full bg-background">
      <div className="w-80 h-full border-r">
        <Sidebar
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          userAvatar={userAvatar}
          userName={userName}
        />
      </div>
      <div className="flex-1 h-full">
        {activeConversation ? (
          <ConversationView
            conversation={activeConversation}
            currentUserId={currentUserId}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">
              Select a conversation to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLayout;
