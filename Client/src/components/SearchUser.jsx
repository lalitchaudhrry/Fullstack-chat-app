import React, { useState } from 'react';
import { searchUsers, sendFriendRequest } from '../api/userApi';

const SearchUser = ({ token }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState({}); // { userId: 'sent' }

  const handleSearch = async () => {
    try {
      const res = await searchUsers(searchTerm, token);
      setResults(res.data);
    } catch (err) {
      console.error('Search failed', err);
    }
  };

  const handleSendRequest = async (userId) => {
    try {
      await sendFriendRequest(userId, token);
      setStatus((prev) => ({ ...prev, [userId]: 'sent' }));
    } catch (err) {
      console.error('Failed to send request', err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Search Users</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-3 py-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {results.length > 0 && (
        <ul className="space-y-2">
          {results.map((user) => (
            <li
              key={user._id}
              className="flex justify-between items-center border-b pb-2"
            >
              <span>@{user.username}</span>
              {status[user._id] === 'sent' ? (
                <span className="text-green-600 font-semibold">Sent</span>
              ) : (
                <button
                  onClick={() => handleSendRequest(user._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Add Friend
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchUser;
