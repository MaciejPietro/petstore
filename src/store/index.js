import { createStore } from 'vuex'; 
import pets from './modules/pets';

const store = createStore({
    modules: {
      pets,
    },
  });
  
export default store;