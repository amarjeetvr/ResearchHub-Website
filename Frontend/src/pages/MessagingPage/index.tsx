import { useState } from 'react';
import { Send, Paperclip, Search, MoreVertical, Phone, Video, Smile, Image, File, Check, CheckCheck } from 'lucide-react';
import { ConversationSkeleton } from '../../components/shared/LoadingSkeletons';
import { NoMessages } from '../../components/shared/EmptyState';
import Footer from '../../components/layout/Footer';

export default function MessagingPage() {
  const [messageInput, setMessageInput] = useState('');
  const [selectedChat, setSelectedChat] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const conversations = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      lastMessage: 'I have completed the initial analysis...',
      timestamp: '10m ago',
      unread: 2,
      online: true,
      project: 'Statistical Analysis Project'
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?img=12',
      lastMessage: 'When can we discuss the methodology?',
      timestamp: '2h ago',
      unread: 0,
      online: false,
      project: 'Literature Review Project'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=5',
      lastMessage: 'Thank you for the feedback!',
      timestamp: '1d ago',
      unread: 0,
      online: true,
      project: 'Data Entry Project'
    },
    {
      id: 4,
      name: 'David Miller',
      avatar: 'https://i.pravatar.cc/150?img=13',
      lastMessage: 'The report is ready for review',
      timestamp: '2d ago',
      unread: 5,
      online: false,
      project: 'Market Research'
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'Sarah Johnson',
      isMe: false,
      content: 'Hello! Thank you for accepting my proposal. I am ready to start working on your project.',
      timestamp: '10:30 AM',
      read: true
    },
    {
      id: 2,
      sender: 'You',
      isMe: true,
      content: 'Great! I have uploaded the dataset. Please review it and let me know if you need any clarifications.',
      timestamp: '10:35 AM',
      read: true
    },
    {
      id: 3,
      sender: 'You',
      isMe: true,
      type: 'file',
      fileName: 'project_data.xlsx',
      fileSize: '2.4 MB',
      timestamp: '10:36 AM',
      read: true
    },
    {
      id: 4,
      sender: 'Sarah Johnson',
      isMe: false,
      content: 'I have reviewed the dataset. The data looks good. I have a few questions about some variables.',
      timestamp: '11:20 AM',
      read: true
    },
    {
      id: 5,
      sender: 'You',
      isMe: true,
      content: 'Sure! Feel free to ask any questions. I\'m here to help.',
      timestamp: '11:25 AM',
      read: true
    },
    {
      id: 6,
      sender: 'Sarah Johnson',
      isMe: false,
      content: 'Perfect! I will proceed with the analysis. I should have the initial results ready in 3-4 days.',
      timestamp: '11:30 AM',
      read: true
    },
    {
      id: 7,
      sender: 'Sarah Johnson',
      isMe: false,
      content: 'I have completed the initial analysis. Please review the attached report.',
      timestamp: '2:45 PM',
      read: false
    },
    {
      id: 8,
      sender: 'Sarah Johnson',
      isMe: false,
      type: 'file',
      fileName: 'analysis_report.pdf',
      fileSize: '1.8 MB',
      timestamp: '2:46 PM',
      read: false
    },
  ];

  const handleSend = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 150px)' }}>
          <div className="flex h-full">
            {/* Left Sidebar - Conversations List */}
            <div className="w-full md:w-96 border-r border-gray-200 flex flex-col">
              {/* Search Header */}
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4">Messages</h2>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0084FF] text-sm"
                  />
                </div>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedChat(conv.id)}
                    className={`p-4 cursor-pointer transition-colors border-b border-gray-100 ${
                      selectedChat === conv.id ? 'bg-blue-50 border-l-4 border-l-[#0084FF]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <img
                          src={conv.avatar}
                          alt={conv.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {conv.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-[#1F1F1F] truncate">{conv.name}</h3>
                          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{conv.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-500 truncate mb-1">{conv.project}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                          {conv.unread > 0 && (
                            <span className="flex-shrink-0 ml-2 w-5 h-5 bg-[#0084FF] rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              {selectedConversation && (
                <div className="p-4 border-b border-gray-200 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={selectedConversation.avatar}
                          alt={selectedConversation.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {selectedConversation.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#1F1F1F]">{selectedConversation.name}</h3>
                        <p className="text-sm text-gray-500">
                          {selectedConversation.online ? 'Online' : 'Offline'} • {selectedConversation.project}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Phone size={20} className="text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Video size={20} className="text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical size={20} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] ${message.isMe ? '' : 'flex items-start gap-2'}`}>
                        {!message.isMe && (
                          <img
                            src={selectedConversation?.avatar}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          />
                        )}
                        <div>
                          {message.type === 'file' ? (
                            <div className={`rounded-2xl p-4 ${
                              message.isMe ? 'bg-[#0084FF]' : 'bg-white border border-gray-200'
                            }`}>
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  message.isMe ? 'bg-white/20' : 'bg-blue-50'
                                }`}>
                                  <File size={20} className={message.isMe ? 'text-white' : 'text-[#0084FF]'} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`font-semibold text-sm truncate ${
                                    message.isMe ? 'text-white' : 'text-[#1F1F1F]'
                                  }`}>
                                    {message.fileName}
                                  </p>
                                  <p className={`text-xs ${message.isMe ? 'text-white/80' : 'text-gray-500'}`}>
                                    {message.fileSize}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className={`rounded-2xl px-4 py-3 ${
                              message.isMe
                                ? 'bg-[#0084FF] text-white'
                                : 'bg-white text-gray-800 border border-gray-200'
                            }`}>
                              <p className="leading-relaxed">{message.content}</p>
                            </div>
                          )}
                          <div className={`flex items-center gap-1 mt-1 text-xs text-gray-500 ${
                            message.isMe ? 'justify-end' : 'justify-start'
                          }`}>
                            <span>{message.timestamp}</span>
                            {message.isMe && (
                              message.read ? (
                                <CheckCheck size={14} className="text-blue-500" />
                              ) : (
                                <Check size={14} className="text-gray-400" />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Typing Indicator */}
                <div className="flex items-start gap-2 mt-4">
                  <img
                    src={selectedConversation?.avatar}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="bg-white rounded-2xl px-4 py-3 border border-gray-200">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex items-end gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Paperclip size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Image size={20} className="text-gray-600" />
                  </button>
                  <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-[#0084FF] transition-all">
                    <textarea
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      placeholder="Type a message..."
                      rows={1}
                      className="w-full bg-transparent resize-none focus:outline-none text-gray-800"
                    />
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Smile size={20} className="text-gray-600" />
                  </button>
                  <button
                    onClick={handleSend}
                    disabled={!messageInput.trim()}
                    className={`p-3 rounded-lg transition-all ${
                      messageInput.trim()
                        ? 'bg-[#0084FF] hover:bg-[#0066CC] text-white'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
