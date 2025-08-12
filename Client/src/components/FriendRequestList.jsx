import React, { useEffect, useState } from 'react';
import { getFriendRequests } from '../api/userApi'; // Make sure this API exists

const FriendRequestList = ({ token }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await getFriendRequests(token);
        setRequests(res.data); // Expecting array
      } catch (err) {
        console.error('Error fetching friend requests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <p>Loading friend requests...</p>;

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Friend Requests</h2>
      {Array.isArray(requests) && requests.length === 0 ? (
        <p>No friend requests.</p>
      ) : (
        <ul className="space-y-2">
          {Array.isArray(requests) &&
            requests.map((request) => (
              <li
                key={request._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>@{request.username}</span>
                <div>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Accept</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">Decline</button>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default FriendRequestList;
