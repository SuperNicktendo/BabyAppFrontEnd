const baseURL = 'http://10.158.168.169:8080/temperatures/';

// gets all temps
export const getTemp = () => {
  return fetch(baseURL).then(res => res.json());
};

// gets temps by id
export const showTemp = id => {
  return fetch(baseURL + id).then(res => res.json());
};

// creates new temp
export const postTemp = payload => {
  return fetch(baseURL, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {'Content-Type': 'application/json'},
  }).then(res => res.json());
};
// updates temp
export const updateTemp = (id, payload) => {
  return fetch(baseURL + id, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {'Content-Type': 'application/json'},
  }).then(res => res.json());
};

// Deletes a Temp

export const deleteTemp = id => {
  return fetch(baseURL + id, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
  }).then(res => res.json());
};
