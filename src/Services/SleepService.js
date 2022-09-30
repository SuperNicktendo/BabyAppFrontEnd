const baseURL = 'http://192.168.0.65:8080/sleeps'


// gets all babies
export const getSleeps = () => {
    return fetch(baseURL)
    .then(res => res.json())
}

// gets baby by id
export const showSleeps = (id) => {
    return fetch(baseURL + id)
    .then(res => res.json())
}

// creates new baby
export const postSleep = (payload) => {
    return fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
}