import { fetchPets } from "@/api/lib/pets";
import statuses from '@/lib/pet/statuses'
import { toast } from 'vue3-toastify';

export const petsActions = {
    GET_PETS: 'getPets',
    SET_STATUS: 'setStatus',
}

const petsMutations = {
    SET_PETS: 'setPets',
    SET_STATUS: 'setStatus',
}


const state = {
    pets: null,
    filterStatus: statuses[0].value
  };
  
  const mutations = {
    [petsMutations.SET_PETS](state, pets) {
      state.pets = pets;
    },
    [petsMutations.SET_STATUS](state, status) {
      state.filterStatus = status;
    },
  };
  
  const actions = {
    [petsActions.SET_STATUS]({commit}, status) {
      commit(petsMutations.SET_STATUS, status)
    },
    async [petsActions.GET_PETS]({ commit, state }) {
      try {
        const status = state.filterStatus
        const res = await fetchPets(status)
        if(res.status === 200) {
          commit(petsMutations.SET_PETS, res.data)
        }
        
      } catch(err) {
        toast("Something went wrong", {
          autoClose: 1000,
        });
        throw err
      }
    },
  };
  
  const getters = {};
  
  export default {
    state,
    mutations,
    actions,
    getters,
  };