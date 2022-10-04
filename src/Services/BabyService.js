
const baseURL = 'http://10.254.186.19:8080/babies/';


// gets all babies
export const getBabies = () => {
  return fetch(baseURL).then(res => res.json());
};

// gets baby by id
export const showBaby = id => {
  return fetch(baseURL + id).then(res => res.json());
};

// creates new baby
export const postBaby = payload => {
  return fetch(baseURL, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {'Content-Type': 'application/json'},
  }).then(res => res.json());
};
