import React from "react";
import ChatLayout from "./chat/ChatLayout";

const Home: React.FC = () => {
  // Mock data for the chat application
  const currentUserId = "current-user";
  const userAvatar =
    "https://api.dicebear.com/7.x/avataaars/svg?seed=currentUser";
  const userName = "John Doe";

  // Sample conversations
  const conversations = [
    {
      id: "1",
      user: {
        id: "user1",
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        status: "online" as const,
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
            name: "John Doe",
            avatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=currentUser",
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
        status: "offline" as const,
        lastSeen: "Last seen yesterday",
      },
      messages: [
        {
          id: "1",
          content: "Hi John, I just sent you the project files.",
          sender: {
            id: "user2",
            name: "Alex Morgan",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
          },
          timestamp: new Date(Date.now() - 86400000), // 1 day ago
          isRead: true,
          isSent: true,
          isOwn: false,
        },
        {
          id: "2",
          content: "Thanks Alex! I'll take a look at them right away.",
          sender: {
            id: "current-user",
            name: "John Doe",
            avatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=currentUser",
          },
          timestamp: new Date(Date.now() - 82800000), // 23 hours ago
          isRead: true,
          isSent: true,
          isOwn: true,
        },
      ],
    },
    {
      id: "3",
      user: {
        id: "user3",
        name: "Emily Davis",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
        status: "away" as const,
        lastSeen: "Last seen 30 minutes ago",
      },
      messages: [
        {
          id: "1",
          content: "Are we still meeting for coffee tomorrow?",
          sender: {
            id: "current-user",
            name: "John Doe",
            avatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=currentUser",
          },
          timestamp: new Date(Date.now() - 7200000), // 2 hours ago
          isRead: false,
          isSent: true,
          isOwn: true,
        },
      ],
    },
  ];

  return (
    <div className="h-screen w-full bg-background">
      <ChatLayout
        conversations={conversations}
        currentUserId={currentUserId}
        userAvatar={userAvatar}
        userName={userName}
      />
    </div>
  );
};

export default Home;
