const axios = require('axios');

export async function index() {
  try{
    const response = await axios.get('/api/songs');
    console.log('response  ', response);
    return response.data.songs;
  } catch(error) {
    return [];
  }

}

export async function show(id) {
  try{
    const response = await axios.get('/api/songs/' + String(id));
    console.log('response  ', response);
    return response.data.song;
  } catch(error) {
    return {};
  }
}

export async function create(data) {
  const response = await axios.post(`/api/songs`, {song: data});
  return response.data;
}

export async function update(id, data) {
  const response = await axios.post('/api/songs/' + String(id), {song: data});
  return response.data;
}

export async function destroy(id){
  const response = await axios.delete('/api/songs/' + String(id));
  return response.data
}
