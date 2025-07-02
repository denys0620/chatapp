

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Send, Paperclip, X } from "lucide-react";

interface Props {
  onSend: (message: string, file?: File) => void;
}

const MessageInput: React.FC<Props> = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !file) return;
    onSend(message, file);
    setMessage("");
    setFile(undefined);

    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const removeFile = () => {
    setFile(undefined);
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-purple-100 dark:border-purple-800 p-6">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        {/* File preview */}
        {file && (
          <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-100 dark:border-blue-800 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                  <Paperclip className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">{file.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {(file.size / 1024).toFixed(1)} KB
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full transition-colors duration-200"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        )}

        {/* Main input area */}
        <div className="relative">
          <div className="flex items-end space-x-3 bg-gradient-to-r from-white via-purple-50/30 to-white dark:from-gray-800 dark:via-purple-900/20 dark:to-gray-800 p-4 rounded-3xl shadow-lg border border-purple-100 dark:border-purple-800 transition-all duration-300 focus-within:shadow-xl focus-within:border-purple-300 dark:focus-within:border-purple-600">
            {/* File upload button */}
            <div className="relative group w-fit">
              <input
                type="file"
                id="file-input"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) setFile(selectedFile);
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="p-2 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-800 dark:to-blue-800 rounded-xl hover:from-purple-200 hover:to-blue-200 dark:hover:from-purple-700 dark:hover:to-blue-700 transition-all duration-200 cursor-pointer group-hover:scale-105 z-0">
                <Paperclip className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>


            {/* Message input */}
            <div className="flex-1">
              <textarea
                className="w-full bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none outline-none text-base leading-relaxed font-medium tracking-wide min-h-[2.5rem] max-h-32"
                placeholder="Type your beautiful message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                rows={1}
                style={{
                  height: 'auto',
                  minHeight: '2.5rem'
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = target.scrollHeight + 'px';
                }}
              />
            </div>

            {/* Send button */}
            <button
              type="submit"
              disabled={!message.trim() && !file}
              className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-700 text-white rounded-xl shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed group"
            >
              <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>
          </div>

          {/* Subtle glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 dark:from-purple-800 dark:via-pink-800 dark:to-purple-800 rounded-3xl opacity-0 group-focus-within:opacity-20 transition-opacity duration-300 -z-10"></div>
        </div>

        {/* Helpful hint */}
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Press <span className="font-semibold text-purple-600 dark:text-purple-400">Enter</span> to send, <span className="font-semibold text-purple-600 dark:text-purple-400">Shift + Enter</span> for new line
          </p>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
