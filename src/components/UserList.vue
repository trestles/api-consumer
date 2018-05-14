<template>
  <div>
    <strong>a list of users</strong>
    <table v-if="users">
      <tr v-for="user in users">
        <td>{{user.id}}</td>
        <td><router-link :to = "{ name: 'user-detail', params: {user_id: user.id}} ">{{user.name}}</router-link></td>  
        <td><router-link :to="{path:'users', params: {user_id: user.id}}">{{user.name}}</router-link></td>  
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  computed: {
    users() {
      return this.$store.state.users;
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