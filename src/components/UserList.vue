<template>
  <div>
    <div v-if="users">
    <strong>a list of users</strong>
    <table>
      <tr v-for="user in users" v-bind:key="user.id">
        <td>{{user.id}}</td>
        <td><router-link :to = "{ name: 'user-detail', params: {user_id: user.id}} ">{{user.name}}</router-link></td>  
        <td><div @click="showFriends(user.id)">show friends</div></td>
        <td>{{friendCount(user.id)}}</td>
      </tr>
    </table>

    <div v-if="showFriendsDiv">
      <strong>Friends {{currentFriends.length}}</strong>
      <table>
        <tr v-for="friend in currentFriends" v-bind:key="friend.id">
          <td>{{friend.id}}</td>
          <td>{{friend.name}}</td>
        </tr>   
      </table> 
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
        loading!!!
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      selectedUser: null,
      selectedSecondaryUser: null,
      showFriendsDiv: false,
      currentFriends: null,
      currentSecondaryFriends: null
    }
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
    friends() {
      return this.$store.state.friends;
    } 
  }, 
  methods:{
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
  }
}
</script>
<style>
</style>