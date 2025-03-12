import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Search, Settings, MessageSquare, Users, LogOut } from "lucide-react";
import ConversationList from "./ConversationList.tsx";

interface SidebarProps {
  activeConversationId?: string;
  onSelectConversation?: (conversationId: string) => void;
  userAvatar?: string;
  userName?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeConversationId,
  onSelectConversation = () => {},
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=currentUser",
  userName = "John Doe"
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="h-full w-full flex flex-col bg-background border-r">
      {/* User profile section */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{userName}</h3>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      
      <Separator />
      
      {/* Search section */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      
      {/* Navigation tabs */}
      <div className="px-2 flex space-x-1">
        <Button variant="ghost" className="flex-1 justify-start">
          <MessageSquare className="h-5 w-5 mr-2" />
          Chats
        </Button>
        <Button variant="ghost" className="flex-1 justify-start">
          <Users className="h-5 w-5 mr-2" />
          Contacts
        </Button>
      </div>
      
      {/* Conversation list */}
      <div className="flex-1 overflow-hidden">
        <ConversationList 
          activeConversationId={activeConversationId}
          onSelectConversation={onSelectConversation}
        />
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground">
          <LogOut className="h-5 w-5 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;