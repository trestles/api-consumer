import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)


export const store = new Vuex.Store({ 
  state:{
    users: null,
    friends: null
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
    SET_FRIENDS: (state, { friends }) => {
        state.friends = friends; // eslint-disable-line no-param-reassign
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
        axios.get('https://api.jsonbin.io/b/5b04bc9f7a973f4ce57844a4/1', { dataType: 'json' })
          .then((response) => {
            console.log(response.data)
            commit('SET_USERS', { users: response.data.users });
            commit('SET_FRIENDS', { friends: response.data.friends });
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