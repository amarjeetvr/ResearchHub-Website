import { useState } from 'react';
import { Send, Paperclip, Download, FileText, Shield, AlertTriangle } from 'lucide-react';

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
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="max-w-[1600px] mx-auto p-6">
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <Shield className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
          <div className="text-sm text-gray-700">
            <span className="font-bold">Secure In-Platform Messaging:</span> All communications are monitored to protect your privacy. External contact information (email, phone, social media) is not allowed and will be automatically blocked.
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          <div className="lg:col-span-4 bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-[#1F1F1F]">Messages</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {chatList.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                    selectedChat === chat.id ? 'bg-[#2D6CDF]/5 border-l-4 border-l-[#2D6CDF]' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#2D6CDF] to-[#1F1F1F] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {chat.participant}
                      </div>
                      <div>
                        <div className="font-bold text-[#1F1F1F]">{chat.participant}</div>
                        <div className="text-sm text-gray-500">{chat.project}</div>
                      </div>
                    </div>
                    {chat.unread > 0 && (
                      <div className="w-6 h-6 bg-[#2D6CDF] rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 truncate">{chat.lastMessage}</div>
                  <div className="text-xs text-gray-400 mt-1">{chat.timestamp}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2D6CDF] to-[#1F1F1F] rounded-full flex items-center justify-center text-white font-bold">
                    RM
                  </div>
                  <div>
                    <div className="font-bold text-[#1F1F1F]">Researcher RM</div>
                    <div className="text-sm text-gray-500">Statistical Analysis Project</div>
                  </div>
                </div>
                <button className="text-[#2D6CDF] font-semibold hover:text-[#1F1F1F] transition-colors">
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
                            ? 'bg-[#2D6CDF] text-white'
                            : 'bg-[#F5F7FA] text-gray-800'
                        }`}
                      >
                        <p className="leading-relaxed">{message.content}</p>
                      </div>
                    ) : (
                      <div className="border-2 border-gray-200 rounded-2xl p-4 bg-white hover:border-[#2D6CDF] transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-[#2D6CDF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <FileText className="text-[#2D6CDF]" size={24} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-[#1F1F1F] truncate">{message.fileName}</div>
                            <div className="text-sm text-gray-500">{message.fileSize}</div>
                          </div>
                          <button className="text-[#2D6CDF] hover:text-[#1F1F1F] transition-colors">
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

            <div className="p-4 border-t border-gray-200 bg-[#F5F7FA]">
              <div className="bg-white rounded-xl border border-gray-300 focus-within:border-[#2D6CDF] focus-within:ring-2 focus-within:ring-[#2D6CDF]/20 transition-all">
                <div className="flex items-end gap-2 p-3">
                  <button className="text-gray-400 hover:text-[#2D6CDF] transition-colors p-2">
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
                    className="flex-1 resize-none focus:outline-none text-gray-800 max-h-32"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!messageInput.trim()}
                    className={`p-2 rounded-lg transition-all ${
                      messageInput.trim()
                        ? 'bg-[#2D6CDF] text-white hover:bg-[#1F1F1F]'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <AlertTriangle size={14} />
                <span>Messages are monitored. Do not share email, phone, or external links.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
