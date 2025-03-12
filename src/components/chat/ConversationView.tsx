import React from "react";
import ConversationHeader from "./ConversationHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

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

interface ConversationViewProps {
  conversation?: {
    id: string;
    user: User;
    messages?: Message[];
  };
  currentUserId?: string;
  onSendMessage?: (message: string) => void;
}

const ConversationView: React.FC<ConversationViewProps> = ({
  conversation = {
    id: "1",
    user: {
      id: "user1",
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      status: "online",
      lastSeen: "Last seen 5 minutes ago",
    },
    messages: [],
  },
  currentUserId = "current-user",
  onSendMessage = (message: string) => console.log("Message sent:", message),
}) => {
  return (
    <div className="flex flex-col h-full w-full bg-background">
      <ConversationHeader
        conversationName={conversation.user.name}
        userStatus={conversation.user.status}
        avatarSrc={conversation.user.avatar}
        lastSeen={conversation.user.lastSeen}
      />

      <div className="flex-1 overflow-hidden">
        <MessageList
          messages={conversation.messages}
          currentUserId={currentUserId}
        />
      </div>

      <MessageInput
        onSendMessage={onSendMessage}
        placeholder="Type a message..."
      />
    </div>
  );
};

export default ConversationView;
