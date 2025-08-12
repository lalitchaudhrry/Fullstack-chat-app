import React, { useEffect, useState } from 'react';
import { getFriends } from '../api/userApi';
import { useNavigate } from 'react-router-dom';

const FriendList = ({ token }) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchFriends = async () => {
    try {
      const res = await getFriends(token);
      setFriends(res.data); // Make sure the API returns an array
    } catch (err) {
      console.error('Error fetching friends:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChatStart = (friend) => {
    navigate(`/chat/${friend._id}`, { state: { friend } });
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  if (loading) return <p>Loading friends...</p>;

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Your Friends</h2>
      {Array.isArray(friends) && friends.length === 0 ? (
        <p>You have no friends yet.</p>
      ) : (
        <ul className="space-y-2">
          {Array.isArray(friends) &&
            friends.map((friend) => (
              <li
                key={friend._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>@{friend.username}</span>
                <button
                  onClick={() => handleChatStart(friend)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Chat
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default FriendList;
