import React, { useState } from "react";

const ChatSidebar = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      date: "Today",
      message: "Do I tell my parents about bullying?",
      active: false,
    },
    {
      id: 2,
      date: "Yesterday",
      message: "Where do I report Cyber Bullying?",
      active: false,
    },
    {
      id: 3,
      date: "Yesterday",
      message: "Can I stay anonymous and sue for my rights in legal matters?",
      active: false,
    },
    {
      id: 4,
      date: "Last 30 days",
      message: "Someone stole my belonging from my bag",
      active: false,
    },
    {
      id: 5,
      date: "Last 30 days",
      message: "I lost my money during a trip",
      active: false,
    },
  ]);
  const [hoveredChat, setHoveredChat] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null); // For confirming delete action

  // Filtered chat history based on search query
  const filteredHistory = chatHistory.filter((chat) =>
    chat.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const deleteChat = (id) => {
    setChatHistory((prev) => prev.filter((chat) => chat.id !== id));
    setConfirmDelete(null); // Reset confirmation state
  };

  return (
    <div
      className={`flex flex-col w-72 h-[calc(100vh-16px)] bg-white shadow-lg border rounded-lg p-4 mx-1 transform transition-transform duration-300 ease-in-out translate-x-0`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="text-[#B2B2B2] hover:text-gray-700 transition-all duration-300"
          onClick={onClose}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <img src="/assets/edit.png" alt="edit" className="w-5 h-5" />
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full border border-gray-300 rounded-lg py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
        />
        <div className="absolute top-2 left-3 text-[#B2B2B2]">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-grow overflow-y-auto space-y-4">
        {filteredHistory.length ? (
          filteredHistory.map((chat) => (
            <div key={chat.id}>
              {/* Display date once per group */}
              {(filteredHistory.indexOf(chat) === 0 ||
                filteredHistory[filteredHistory.indexOf(chat) - 1].date !==
                  chat.date) && (
                <p className="text-gray-400 text-xs mb-2">{chat.date}</p>
              )}
              <ul className="space-y-2">
                <li
                  className={`p-1 rounded-lg relative cursor-pointer flex justify-between items-center ${
                    chat.active || hoveredChat === chat.id ? "bg-gray-100" : ""
                  }`}
                  onMouseEnter={() => setHoveredChat(chat.id)}
                  onMouseLeave={() => setHoveredChat(null)}
                >
                  {/* Chat Message with subtle shadow */}
                  <span className="block max-w-[90%] overflow-hidden whitespace-nowrap relative">
                    {chat.message}
                    <span className="absolute inset-y-0 right-0 w-5 bg-gradient-to-l from-white"></span>
                  </span>

                  {/* Show delete icon on hover */}
                  {hoveredChat === chat.id && (
                    <button
                      className="text-red-500 hover:text-red-700 ml-1"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent toggling active state
                        setConfirmDelete(chat.id); // Show confirm delete
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m5-3h4a2 2 0 0 1 2 2v1H8V5a2 2 0 0 1 2-2z" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  )}

                  {/* Confirmation Dialog for Delete */}
                  {confirmDelete === chat.id && (
                    <div className="absolute right-0 top-0 bg-white shadow-md rounded-lg p-2 z-10">
                      <p className="text-sm text-gray-500">Confirm Delete?</p>
                      <div className="flex justify-end space-x-2">
                        <button
                          className="text-gray-600 hover:text-gray-900 text-sm"
                          onClick={() => setConfirmDelete(null)}
                        >
                          Cancel
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 text-sm"
                          onClick={() => deleteChat(chat.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No chat history found.</p>
        )}
      </div>

      {/* Logout Button */}
      <div>
        <button className="w-full bg-blue-500 text-white hover:bg-blue-600 font-semibold py-2 rounded-lg transition-all duration-300">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ChatSidebar;
