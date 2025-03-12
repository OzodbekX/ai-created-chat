import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Phone, Video, MoreVertical } from "lucide-react";

interface ConversationHeaderProps {
  conversationName?: string;
  userStatus?: "online" | "offline" | "away";
  avatarSrc?: string;
  lastSeen?: string;
}

const ConversationHeader = ({
  conversationName = "Sarah Johnson",
  userStatus = "online",
  avatarSrc = "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  lastSeen = "Last seen 5 minutes ago",
}: ConversationHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white h-20 w-full">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Avatar>
            <AvatarImage src={avatarSrc} alt={conversationName} />
            <AvatarFallback>{conversationName.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${userStatus === "online" ? "bg-green-500" : userStatus === "away" ? "bg-yellow-500" : "bg-gray-400"}`}
          ></div>
        </div>
        <div>
          <h2 className="font-semibold text-lg">{conversationName}</h2>
          <p className="text-xs text-gray-500">
            {userStatus === "online" ? (
              <Badge
                variant="secondary"
                className="text-xs bg-green-100 text-green-800 hover:bg-green-100"
              >
                Online
              </Badge>
            ) : (
              lastSeen
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Phone className="h-5 w-5 text-gray-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Voice call</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Video className="h-5 w-5 text-gray-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Video call</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVertical className="h-5 w-5 text-gray-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>More options</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ConversationHeader;
