import { useState } from 'react';
import { Send, Paperclip, Download, FileText, Shield, AlertTriangle } from 'lucide-react';
import Footer from '../../components/layout/Footer';

export default function MessagingPage() {
  const [messageInput, setMessageInput] = useState('');
  const [selectedChat, setSelectedChat] = useState(1);

  const chatList = [
    {
      id: 1,
      participant: 'RM',
      lastMessage: 'I have completed the initial analysis...',
      timestamp: '10 min ago',
      unread: 2,
      project: 'Statistical Analysis Project'
    },
    {
      id: 2,
      participant: 'SK',
      lastMessage: 'When can we discuss the methodology?',
      timestamp: '2 hours ago',
      unread: 0,
      project: 'Literature Review Project'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'RM',
      isMe: false,
      content: 'Hello! Thank you for accepting my proposal. I am ready to start working on your project.',
      timestamp: '2 days ago',
      type: 'text'
    },
    {
      id: 2,
      sender: 'BN',
      isMe: true,
      content: 'Great! I have uploaded the dataset to the project files. Please review it and let me know if you need any clarifications.',
      timestamp: '2 days ago',
      type: 'text'
    },
    {
      id: 3,
      sender: 'BN',
      isMe: true,
      fileName: 'patient_data_final.xlsx',
      fileSize: '2.4 MB',
      timestamp: '2 days ago',
      type: 'file'
    },
    {
      id: 4,
      sender: 'RM',
      isMe: false,
      content: 'I have reviewed the dataset. The data looks good. I have a few questions about some variables. Can we have a quick discussion about the coding for the "treatment_outcome" variable?',
      timestamp: '1 day ago',
      type: 'text'
    },
    {
      id: 5,
      sender: 'BN',
      isMe: true,
      content: 'Sure! The treatment_outcome is coded as: 1 = Complete Recovery, 2 = Partial Recovery, 3 = No Change, 4 = Deterioration. Does that help?',
      timestamp: '1 day ago',
      type: 'text'
    },
    {
      id: 6,
      sender: 'RM',
      isMe: false,
      content: 'Perfect! That clarifies everything. I will proceed with the analysis. I should have the initial results ready in 3-4 days.',
      timestamp: '1 day ago',
      type: 'text'
    },
    {
      id: 7,
      sender: 'RM',
      isMe: false,
      content: 'I have completed the initial descriptive statistics and regression analysis. Please review the attached preliminary report.',
      timestamp: '10 min ago',
      type: 'text'
    },
    {
      id: 8,
      sender: 'RM',
      isMe: false,
      fileName: 'preliminary_analysis_report.pdf',
      fileSize: '1.8 MB',
      timestamp: '10 min ago',
      type: 'file'
    }
  ];

  const handleSend = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629]">
      <div className="max-w-[1600px] mx-auto p-6">
        <div className="bg-yellow-500/20 border-2 border-yellow-400/30 rounded-xl p-4 mb-6 flex items-start gap-3">
          <Shield className="text-yellow-400 flex-shrink-0 mt-0.5" size={20} />
          <div className="text-sm text-yellow-200">
            <span className="font-bold">Secure In-Platform Messaging:</span> All communications are monitored to protect your privacy. External contact information (email, phone, social media) is not allowed and will be automatically blocked.
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          <div className="lg:col-span-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-md overflow-hidden flex flex-col">
            <div className="p-6 border-b border-white/20">
              <h2 className="text-2xl font-bold text-white">Messages</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {chatList.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`p-4 border-b border-white/10 cursor-pointer transition-colors ${
                    selectedChat === chat.id ? 'bg-cyan-500/20 border-l-4 border-l-cyan-400' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {chat.participant}
                      </div>
                      <div>
                        <div className="font-bold text-white">{chat.participant}</div>
                        <div className="text-sm text-gray-400">{chat.project}</div>
                      </div>
                    </div>
                    {chat.unread > 0 && (
                      <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-300 truncate">{chat.lastMessage}</div>
                  <div className="text-xs text-gray-400 mt-1">{chat.timestamp}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-md overflow-hidden flex flex-col">
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    RM
                  </div>
                  <div>
                    <div className="font-bold text-white">Researcher RM</div>
                    <div className="text-sm text-gray-400">Statistical Analysis Project</div>
                  </div>
                </div>
                <button className="text-cyan-400 font-semibold hover:text-white transition-colors">
                  View Project
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] ${message.isMe ? 'order-2' : 'order-1'}`}>
                    {message.type === 'text' ? (
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.isMe
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                            : 'bg-white/10 text-gray-200 border border-white/20'
                        }`}
                      >
                        <p className="leading-relaxed">{message.content}</p>
                      </div>
                    ) : (
                      <div className="border-2 border-white/20 rounded-2xl p-4 bg-white/5 hover:border-cyan-400 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <FileText className="text-cyan-400" size={24} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-white truncate">{message.fileName}</div>
                            <div className="text-sm text-gray-400">{message.fileSize}</div>
                          </div>
                          <button className="text-cyan-400 hover:text-white transition-colors">
                            <Download size={20} />
                          </button>
                        </div>
                      </div>
                    )}
                    <div className={`text-xs text-gray-400 mt-1 ${message.isMe ? 'text-right' : 'text-left'}`}>
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/20 bg-white/5">
              <div className="bg-white/10 rounded-xl border border-white/20 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20 transition-all">
                <div className="flex items-end gap-2 p-3">
                  <button className="text-gray-400 hover:text-cyan-400 transition-colors p-2">
                    <Paperclip size={20} />
                  </button>
                  <textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Type your message... (No external contact info allowed)"
                    rows={1}
                    className="flex-1 resize-none focus:outline-none text-white bg-transparent placeholder-gray-400 max-h-32"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!messageInput.trim()}
                    className={`p-2 rounded-lg transition-all ${
                      messageInput.trim()
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400'
                        : 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                <AlertTriangle size={14} />
                <span>Messages are monitored. Do not share email, phone, or external links.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
