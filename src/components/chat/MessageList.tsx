import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check } from "lucide-react";

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

interface MessageListProps {
  messages?: Message[];
  currentUserId?: string;
}

const MessageList: React.FC<MessageListProps> = ({
  messages = [
    {
      id: "1",
      content: "Hey there! How are you doing today?",
      sender: {
        id: "user1",
        name: "Jane Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
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
        name: "Jane Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      },
      timestamp: new Date(Date.now() - 3400000), // 56 minutes ago
      isRead: true,
      isSent: true,
      isOwn: false,
    },
    {
      id: "4",
      content: "Sure thing! I'll send them over right away.",
      sender: {
        id: "current-user",
        name: "Current User",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=current",
      },
      timestamp: new Date(Date.now() - 3300000), // 55 minutes ago
      isRead: true,
      isSent: true,
      isOwn: true,
    },
    {
      id: "5",
      content:
        "Just sent you an email with all the files attached. Let me know if you need anything else!",
      sender: {
        id: "current-user",
        name: "Current User",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=current",
      },
      timestamp: new Date(Date.now() - 60000), // 1 minute ago
      isRead: false,
      isSent: true,
      isOwn: true,
    },
  ],
  currentUserId = "current-user",
}) => {
  // Format timestamp to display time in 12-hour format
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="h-full w-full bg-background flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex ${message.isOwn ? "flex-row-reverse" : "flex-row"} max-w-[80%] items-end gap-2`}
              >
                {!message.isOwn && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={message.sender.avatar}
                      alt={message.sender.name}
                    />
                    <AvatarFallback>
                      {message.sender.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="flex flex-col">
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.isOwn
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <div
                    className={`flex items-center mt-1 text-xs text-muted-foreground ${message.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <span>{formatTime(message.timestamp)}</span>
                    {message.isOwn && (
                      <div className="flex items-center ml-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span>
                                {message.isSent && (
                                  <Check
                                    size={14}
                                    className={
                                      message.isRead
                                        ? "text-blue-500"
                                        : "text-muted-foreground"
                                    }
                                    strokeWidth={message.isRead ? 2.5 : 2}
                                  />
                                )}
                                {message.isRead && (
                                  <Check
                                    size={14}
                                    className="text-blue-500 -ml-1"
                                    strokeWidth={2.5}
                                  />
                                )}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {message.isRead
                                  ? "Read"
                                  : message.isSent
                                    ? "Delivered"
                                    : "Sending..."}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                  </div>
                </div>
                {message.isOwn && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={message.sender.avatar}
                      alt={message.sender.name}
                    />
                    <AvatarFallback>
                      {message.sender.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}

          {/* Date separator */}
          <div className="flex items-center justify-center my-4">
            <Badge variant="outline" className="text-xs font-normal">
              Today
            </Badge>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default MessageList;
