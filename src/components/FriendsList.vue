<template>
  <div>
    <strong>Friends {{currentFriends.length}}</strong>
    <table class='table'>
      <thead>
        <tr>
          <td>friend id</td>
          <td>friend name</td>
          <td>remove as friend</td>
        </tr>
      </thead>
      <tr v-for="friend in currentFriends" v-bind:key="friend.id">
        <td>{{friend.id}}</td>
        <td>{{friend.name}}</td>
        <td><button @click="$emit('removeAsFriend', friend.id)">remove as friend</button></td>
      </tr>   
    </table> 
  </div>
</template>
<script>
export default {
 props: ['currentFriends']
}
</script>
<style>
</style>