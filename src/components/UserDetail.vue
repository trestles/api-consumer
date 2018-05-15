<template>
  <div>
      <div v-if="showModal">
        here is modal:<br />
        user name: <input type='text' v-model="tmpUserName" :placeholder="tmpUserName" />
        <button @click="saveUser">save to store</button>
      </div>
      <strong>user id:</strong>  {{user.id}} <br />
      <strong>user name 2:</strong>  <span @click.prevent="showEdit">{{user.name}}</span>

  </div>
</template>
<script>
export default {
  data(){
    return {
      showModal: false,
      tmpUserName: null
    }
  },
  methods:{
    showEdit(){
      this.tmpUserName = this.user.name;
      this.showModal = true;
    },
    saveUser(){
       const userObj = { name: this.tmpUserName, id: this.$route.params.user_id }
       this.$store.dispatch('SAVE_USER', userObj ).then(() => {
        console.log("this promise loaded and returned")
      });
    }
  },
  computed: {
    user(){
      return this.$store.state.users.find(user => user.id === this.$route.params.user_id);
    }
  }, 
  mounted(){
    console.log(this.$route.params.user_id)
  }
}
</script>
<style>
</style>