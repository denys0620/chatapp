import React from "react";
import { Heart, Download, Clock } from 'lucide-react';


interface Message {
  _id: string;
  user: { username: string };
  message: string;
  timestamp: string;
  file?: { fileUrl: string; fileName: string };
}


interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const getAvatarGradient = (username: string) => {
    const gradients = [
      'bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400',
      'bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400',
      'bg-gradient-to-br from-green-400 via-emerald-400 to-blue-400',
      'bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400',
      'bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400',
      'bg-gradient-to-br from-indigo-400 via-blue-400 to-cyan-400'
    ];
    const index = username.length % gradients.length;    
    return gradients[index];
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 transition-all duration-300">
      {messages.map((msg, index) => (
        <div
          key={msg._id}
          className="group flex items-start space-x-4 animate-fade-in hover:scale-[1.01] transition-all duration-300"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Enhanced Avatar */}
          <div className="flex-shrink-0 relative">
            <div className={`w-12 h-12 rounded-full ${getAvatarGradient(msg.user.username)} flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 ring-2 ring-white dark:ring-gray-700`}>
              {msg.user.username[0].toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"></div>
          </div>

          {/* Enhanced Message Content */}
          <div className="flex-1 max-w-4xl">
            <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm p-5 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:border-purple-200 dark:group-hover:border-purple-600">
              {/* Header with enhanced styling */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {msg.user.username}
                  </span>
                  <Heart className="w-3 h-3 text-pink-400 opacity-60" />
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span className="font-medium">{formatTime(msg.timestamp)}</span>
                </div>
              </div>

              {/* Message text with enhanced typography */}
              <div className="relative">
                <p className="text-base text-gray-800 dark:text-gray-100 leading-relaxed break-words whitespace-pre-wrap font-medium tracking-wide">
                  {msg.message}
                </p>
                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-purple-50/20 dark:to-purple-900/10 pointer-events-none rounded-lg"></div>
              </div>

              {/* Enhanced file attachment */}
              {msg.file && (
                <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                  <a
                    href={msg.file.fileUrl}
                    download={msg.file.fileName}
                    className="flex items-center space-x-3 text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 group/link"
                  >
                    <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg group-hover/link:bg-purple-100 dark:group-hover/link:bg-purple-800 transition-colors duration-200">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{msg.file.fileName}</div>
                      <div className="text-xs opacity-75">Click to download</div>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* Subtle connection line to next message */}
            {index < messages.length - 1 && (
              <div className="ml-6 mt-2 w-px h-4 bg-gradient-to-b from-purple-200 to-transparent dark:from-purple-600 opacity-30"></div>
            )}
          </div>
        </div>
      ))}

      {/* Beautiful bottom spacing with gradient */}
      <div className="h-8 bg-gradient-to-t from-transparent to-purple-50/20 dark:to-purple-900/10"></div>
    </div>
  );
};

export default MessageList;
