<template>
  <div class="row">
    <div v-if="message" class="col-md-12">
      {{message}} 
      <br />
      <input type='text' v-model="message" size='40' /><br />
      <br /><input size='40' type='text' :placeholder="message" v-model="tmpMessage" /><button v-on:click="saveMessage">save</button>
      <br /><br />
    </div>
    <div v-else>
      loading message!!!
    </div>



    <div v-if="users">
    <strong>a list of users</strong> <span @click="showOnlyEnabled = !showOnlyEnabled">toggle enabled</span>
    <table class="table">
      <thead>
        <tr>
          <td>id</td>
          <td>name</td>
          <td>friends</td>
          <td>friends count</td>
          <td>enabled</td>
        </tr>
      </thead>
      <tr v-for="user in users" v-bind:key="user.id" v-if="user.isEnabled || !showOnlyEnabled">
        <td>{{user.id}}</td>
        <td><router-link :to = "{ name: 'user-detail', params: {user_id: user.id}} ">{{user.name}}</router-link></td>  
        <td><button class="btn btn-outline-secondary" @click="showFriends(user.id)">show friends</button></td>
        <td>{{friendCount(user.id)}}</td>
        <td v-bind:class="{enabled: user.isEnabled, unenabled: !user.isEnabled }">{{user.isEnabled}}</td>
      </tr>
    </table>

    <div v-if="showFriendsDiv">
      <strong>Friends {{currentFriends.length}}</strong>
      <table class='table'>
        <thead>
          <tr>
            <td>friend id</td>
            <td>friend name</td>
          </tr>
        </thead>
        <tr v-for="friend in currentFriends" v-bind:key="friend.id">
          <td>{{friend.id}}</td>
          <td>{{friend.name}}</td>
        </tr>   
      </table> 
      <friends-list @removeAsFriend="removeFriend" :current-friends="currentFriends"></friends-list> 
    </div>

    <select v-model="selectedUser">
      <option v-for="user in users" v-bind:key="user.id" :value="user.id">{{user.name}}</option>
    </select>
    <span v-if="selectedUser">
      selectedUser: {{selectedUser}}
      <select v-model="selectedSecondaryUser">
        <option v-for="friend in currentFriends" v-bind:key="friend.id" :value="friend.id">{{friend.name}}</option>
      </select>
      <span v-if="selectedSecondaryUser">
        selectedUser: {{selectedSecondaryUser}}
      </span>
    </span>
    </div>
    <div v-else>
        loading users!!! or to load
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import FriendsList from './FriendsList'

export default {
  data(){
    return {
      message: null, 
      tmpMessage: null,
      selectedUser: null,
      selectedSecondaryUser: null,
      showFriendsDiv: false,
      currentFriends: null,
      currentSecondaryFriends: null,
      showOnlyEnabled: false

    }
  },
  components: {FriendsList},
  computed: {
    users() {
      return this.$store.state.users;
    },
    friends() {
      return this.$store.state.friends;
    } 
  }, 
  methods:{

    saveMessage(){
      alert('calling save message');
      this.message = this.tmpMessage;
    },
    removeFriend(user_id){
      alert('removing friend: ' + user_id);
    },
    friendCount(user_id){
      let friend_obj = this.friends.find(user =>  user.user_id == user_id)
      if(friend_obj){
       return friend_obj.friend_ids.length
      }else{
        return 0;
      }
    },
    getFriends(user_id){
      let friend_obj = this.friends.find(user =>  user.user_id == user_id)
      if(friend_obj){
        this.currentFriends = this.users.filter(user =>  friend_obj.friend_ids.includes(user.id));
      }else{
        this.currentFriends = []; 
      }
    },
    showFriends(user_id){
      this.showFriendsDiv = true;
      let friend_obj = this.friends.find(user =>  user.user_id == user_id)
      if(friend_obj){
        console.log(friend_obj.friend_ids)
        this.currentFriends = this.users.filter(user =>  friend_obj.friend_ids.includes(user.id));
        console.log(this.currentFriends);
      }else{
        this.currentFriends = []; 
      }
    }
  },
  created(){
    this.$store.dispatch('LOAD_USERS').then(() => {
       console.log("this promise loaded and returned")
    });
  },
  mounted(){
    axios.get(`https://api.jsonbin.io/b/5b04a713c83f6d4cc7349bba`, { dataType: 'json' })
      .then((response) => {
        // console.log(response.data)
        this.message = response.data.message;
      })
      .catch((error) => {
        // reject(error);
        console.log(error);
    });
  }
}
</script>
<style>
.table {
  border: 2px solid red;
}

.enabled{
  background-color: aliceblue;
}
.unenabled{
  background-color: lavenderblush;
}
</style>