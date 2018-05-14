import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)


export const store = new Vuex.Store({ 
  state:{
    users: null
  },
  mutations:{
    SET_USER: (state, {userObj}) => {
      let user =  state.users.find(user => user.id === userObj.id);
      if(user){
        console.log("you have a user");
        console.log(user);
        user.name = userObj.name;
      }else{
        console.log("no user");
      }


    },
    SET_USERS: (state, { users }) => {
      state.users = users; // eslint-disable-line no-param-reassign
    },
  },
  actions:{

    SAVE_USER({ commit }, payload) {
      console.log('saving user!!!');
      console.log(payload);
      commit('SET_USER', { userObj: payload });
    },  
    LOAD_USERS({ commit }, payload ) {
      return new Promise((resolve, reject) => {
        axios.get(`http://api.jsonbin.io/b/5af9add30fb4d74cdf23dcb7`, { dataType: 'json' })
          .then((response) => {
            console.log(response.data)
            commit('SET_USERS', { users: response.data.users });
            resolve();
          })
          .catch((error) => {
            // console.log(error.message); // eslint-disable-line no-console
            reject(error);
          });
        });
    }
  }
})