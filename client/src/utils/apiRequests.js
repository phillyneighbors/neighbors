import axios from 'axios';

export default {
  getMessages: (locationId) => {
    console.log("getting messages for: ", locationId)
    return new Promise((resolve, reject) => {
      axios.get('/api/message', {locationId,})
      .then((response) => {
        console.log("messages: ",response);
        resolve(response.data.results)
      })
      .catch((error) => {
        console.log(error);
        reject(error)
      })
    })
  },
  postMessage: (message) => {
    console.log(message)
    return new Promise((resolve, reject) => {
      axios.post('/api/message', message)
      .then((response) => {
        console.log("POSTED!")
        console.log(response)
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
    })
  },

  userLogin: (username, password) => {
    console.log(username, password)
    return new Promise((resolve, reject) => {
      axios.post('/api/user', {
        username,
        password,
      })
      .then(response => {
        console.log("FRONTEND RESPONSE: ", response)
        resolve(response)
      })
      .catch(err => {
        console.log("error: ", err)
        reject(err)
      })
    })
  },
  getHoodCoords: (name) => {
    return new Promise((resolve, reject) => {
      axios.get('/api/phillyHood', {
        params: {
          mapname: name,
        }
      })
      .then(response => {
        console.log("RESPON: ",response.data)
        resolve(response.data.results)
      })
      .catch(err => {
        console.log("ERR: ", err)
        reject(err)
      })

    })
  }
}
