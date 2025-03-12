import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { MessageCircle, Circle } from "lucide-react";

interface User {
  id: string;
  name: string;
  avatar?: string;
  online: boolean;
}

interface Message {
  id: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  user: User;
  lastMessage: Message;
  unreadCount: number;
}

interface ConversationListProps {
  conversations?: Conversation[];
  activeConversationId?: string;
  onSelectConversation?: (conversationId: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations = defaultConversations,
  activeConversationId = defaultConversations[0]?.id,
  onSelectConversation = () => {},
}) => {
  return (
    <div className="h-full w-full bg-background border-r">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Messages</h2>
      </div>
      <ScrollArea className="h-[calc(100%-4rem)]">
        <div className="p-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${conversation.id === activeConversationId ? "bg-accent" : "hover:bg-accent/50"}`}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage
                    src={
                      conversation.user.avatar ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${conversation.user.id}`
                    }
                    alt={conversation.user.name}
                  />
                  <AvatarFallback>
                    {conversation.user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {conversation.user.online && (
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium truncate">
                    {conversation.user.name}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {conversation.lastMessage.timestamp}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage.content}
                  </p>
                  {conversation.unreadCount > 0 && (
                    <Badge
                      variant="default"
                      className="ml-2 px-2 py-0.5 rounded-full"
                    >
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  {conversation.lastMessage.read ? (
                    <span className="flex items-center">
                      Read <MessageCircle className="ml-1 h-3 w-3" />
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Delivered <Circle className="ml-1 h-3 w-3" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

// Default mock data
const defaultConversations: Conversation[] = [
  {
    id: "1",
    user: {
      id: "user1",
      name: "Jane Cooper",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
      online: true,
    },
    lastMessage: {
      id: "msg1",
      content: "Hey, are we still meeting today?",
      timestamp: "10:42 AM",
      read: true,
    },
    unreadCount: 0,
  },
  {
    id: "2",
    user: {
      id: "user2",
      name: "Alex Morgan",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
      online: true,
    },
    lastMessage: {
      id: "msg2",
      content: "I just sent you the project files",
      timestamp: "9:30 AM",
      read: false,
    },
    unreadCount: 2,
  },
  {
    id: "3",
    user: {
      id: "user3",
      name: "Sarah Williams",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
      online: false,
    },
    lastMessage: {
      id: "msg3",
      content: "Let me know when youre free to discuss",
      timestamp: "Yesterday",
      read: true,
    },
    unreadCount: 0,
  },
  {
    id: "4",
    user: {
      id: "user4",
      name: "Michael Johnson",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
      online: false,
    },
    lastMessage: {
      id: "msg4",
      content: "Thanks for your help with the presentation",
      timestamp: "Yesterday",
      read: true,
    },
    unreadCount: 0,
  },
  {
    id: "5",
    user: {
      id: "user5",
      name: "Emily Davis",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80",
      online: true,
    },
    lastMessage: {
      id: "msg5",
      content: "Can we schedule a call for tomorrow?",
      timestamp: "Monday",
      read: false,
    },
    unreadCount: 1,
  },
];

export default ConversationList;
