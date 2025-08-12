import React from 'react';
import SearchUser from '../components/SearchUser';
import FriendRequestList from '../components/FriendRequestList';
import FriendList from '../components/FriendList';

const SocialHub = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">👥 Social Hub</h1>
      <SearchUser token={token} />
      <FriendRequestList token={token} />
      <FriendList token={token} />
    </div>
  );
};

export default SocialHub;
