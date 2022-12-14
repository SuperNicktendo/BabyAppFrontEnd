const baseURL = 'http://10.254.186.19:8080/feeds/';

// gets all feeds
export const getFeeds = () => {
  return fetch(baseURL).then(res => res.json());
};

// gets feeds by id
export const showFeed = id => {
  return fetch(baseURL + id).then(res => res.json());
};

// creates new Feed
export const postFeed = payload => {
  return fetch(baseURL, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {'Content-Type': 'application/json'},
  }).then(res => res.json());
};
// updates feed
export const updateFeed = (id, payload) => {
  return fetch(baseURL + id, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {'Content-Type': 'application/json'},
  }).then(res => res.json());
};

// Deletes a Feed

export const deleteFeed = id => {
  return fetch(baseURL + id, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
  }).then(res => res.json());
};
