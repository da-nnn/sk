// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import api from '../services/apiService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    scholarships: []
  },
  mutations: {
    SET_SCHOLARSHIPS(state, scholarships) {
      state.scholarships = scholarships;
    }
  },
  actions: {
    fetchScholarships({ commit }) {
      return api.get('/api/scholarships')
        .then(response => {
          commit('SET_SCHOLARSHIPS', response.data);
        })
        .catch(error => {
          console.error('Error fetching scholarships:', error);
        });
    }
  },
  getters: {
    allScholarships: state => state.scholarships
  }
});
