import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  ? (baseURL = 'https://my-watch-lists.herokuapp.com')
  : (baseURL = 'http://localhost:3000');

const service = axios.create({ withCredentials: true, baseURL });

const actions = {
  isLoggedIn: async () => {
    return await service.get('/is-logged-in');
  },
  signUp: async (user) => {
    return await service.post('/signup', user);
  },
  logIn: async (user) => {
    return await service.post('/login', user);
  },
  logOut: async () => {
    return await service.get('/logout');
  },
  validEmail: async (email) => {
    return await service.post('/validEmail', email);
  },
  addMovie: async (data) => {
    return await service.post('/add-movie', data);
  },
  getList: async (data) => {
    return await service.get('/movie-list', data);
  }
};

export default actions;
