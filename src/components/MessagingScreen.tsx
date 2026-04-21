import { useState } from 'react';
import { Send, Smile } from 'lucide-react';
import { Button } from './ui/button';

export function MessagingScreen() {
  const [messages] = useState([
    { id: 1, sender: 'Emma', avatar: '👧', content: '👋', timestamp: '10:30 AM', isMine: false },
    { id: 2, sender: 'You', avatar: '🧒', content: '👋 Hey!', timestamp: '10:31 AM', isMine: true },
    { id: 3, sender: 'Emma', avatar: '👧', content: 'Great job on your quests! 🎉', timestamp: '10:32 AM', isMine: false },
    { id: 4, sender: 'You', avatar: '🧒', content: 'Thanks! 😊', timestamp: '10:33 AM', isMine: true },
    { id: 5, sender: 'You', avatar: '🧒', content: 'You too! 🌟', timestamp: '10:33 AM', isMine: true },
    { id: 6, sender: 'Emma', avatar: '👧', content: '💪 Let\'s do this!', timestamp: '10:35 AM', isMine: false },
  ]);

  const stickers = ['👍', '❤️', '😊', '🎉', '⭐', '🔥', '💯', '🚀'];
  const quickEmojis = ['😀', '😂', '🥳', '😎', '🤔', '👏', '🙌', '✨'];

  return (
    <div className="h-full bg-gradient-to-b from-pink-50 to-white pb-20 overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 to-purple-500 px-6 pt-12 pb-6 rounded-b-[3rem] shadow-lg">
        <div className="flex items-center gap-5">
          <div className="text-4xl bg-white rounded-full p-2">👧</div>
          <div>
            <h2 className="text-white">Emma</h2>
            <p className="text-pink-100">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-6 py-6 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.isMine ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className="text-2xl">{message.avatar}</div>
            <div className={`max-w-[70%] ${message.isMine ? 'items-end' : 'items-start'}`}>
              <div
                className={`rounded-2xl px-4 py-3 ${
                  message.isMine
                    ? 'bg-blue-500 text-white rounded-br-sm'
                    : 'bg-white border-2 border-blue-100 text-slate-700 rounded-bl-sm'
                }`}
              >
                <p>{message.content}</p>
              </div>
              <p className={`text-xs text-slate-400 mt-1 px-2 ${message.isMine ? 'text-right' : 'text-left'}`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stickers */}
      <div className="px-6 pb-3">
        <div className="bg-white border-2 border-blue-100 rounded-3xl p-5">
          <p className="text-slate-500 text-sm mb-2 px-2">Quick Stickers</p>
          <div className="flex gap-4 overflow-x-auto pb-1">
            {stickers.map((sticker, idx) => (
              <button
                key={idx}
                className="text-2xl bg-blue-50 hover:bg-blue-100 rounded-2xl p-5 min-w-[3rem] transition-all hover:scale-110"
              >
                {sticker}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="px-6 pb-4">
        <div className="bg-white border-2 border-blue-200 rounded-3xl px-4 py-3 flex items-center gap-5">
          <button className="text-blue-500">
            <Smile size={24} />
          </button>
          
          <div className="flex-1 flex gap-4 overflow-x-auto">
            {quickEmojis.map((emoji, idx) => (
              <button
                key={idx}
                className="text-xl hover:scale-125 transition-transform"
              >
                {emoji}
              </button>
            ))}
          </div>
          
          <Button className="bg-blue-500 hover:bg-blue-600 rounded-full w-10 h-10 p-0">
            <Send size={18} />
          </Button>
        </div>
        <p className="text-center text-slate-400 text-sm mt-2">
          Only emojis & stickers allowed 😊
        </p>
      </div>
    </div>
  );
}
