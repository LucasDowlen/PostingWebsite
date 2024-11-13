<template>
  <div id="app">
    <Header :user='user' v-on:userUpdated="updateUser" ref="header"/>
    <router-view :user='user'/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import firebase from 'firebase';

export default {
  components: { Header },

  data() {
    return {
      user: ''
    };
  },

  methods: {
    updateUser() {
      console.log("!...");

      if(firebase.auth().currentUser != null) {
        this.user = firebase.auth().currentUser.email;
        console.log("User Updated: " + firebase.auth().currentUser.email);
      }
    }
  },

  created() {
    this.updateUser();
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        console.log("User True");
        this.updateUser();
      }
      else {
        console.log("User False");
        this.user = '';
      }
    });
  },
}

</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto&display=swap');
  *{
    list-style: none;
    cursor: default;
    margin: 0;
    padding: 0;
  }
  body{
    background: #111111;
  }
</style>
