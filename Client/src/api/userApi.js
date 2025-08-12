import axios from 'axios';

const API = axios.create({ baseURL: '/api/users' });

export const searchUsers = (username, token) =>
  API.get(`/search?username=${username}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const sendFriendRequest = (receiverId, token) =>
  API.post(`/friend-request/${receiverId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getFriendRequests = (token) =>
  API.get('/requests', {
    headers: { Authorization: `Bearer ${token}` },
  });

export const acceptFriendRequest = (senderId, token) =>
  API.post(`/accept-request/${senderId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  export const getFriends = (token) =>
    API.get('/friends', {
      headers: { Authorization: `Bearer ${token}` },
    });
  