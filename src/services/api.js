const API_BASE_URL = 'https://api.github.com/';

function checkStatus(response) {
  if (response.ok) return response;
  throw new Error(response);
}

function getHeaders() {
  return {
    'Accept': 'application/vnd.github.v3+json'
  };
}

export async function getUser(username) {
  const response = await fetch(`${API_BASE_URL}users/${username}`, { headers: getHeaders() });
  checkStatus(response);
  return response.json();
}

export async function getUserFollowers(username, page = 1) {
  const response = await fetch(`${API_BASE_URL}users/${username}/followers?page=${page}`, { headers: getHeaders() });
  checkStatus(response);
  return response.json();
}

export default {
  getUser,
  getUserFollowers
}
