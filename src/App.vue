<template>
  <div id="app">
    <h1>Hello App!</h1>
    <p>
      <!-- use router-link component for navigation. -->
      <!-- specify the link by passing the `to` prop. -->
      <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
      <router-link to="/users">Go to Users</router-link>
      <router-link to="/bar">Go to Bar</router-link>
    </p>
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>  
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import UserList from './components/UserList'


export default {
  name: 'app',
  components: {
    UserList
  }
}
</script>

<style>
</style>
