<template>
  <div id="app">
    <Header :user='user' v-on:userUpdated="updateUser" ref="header"/>
    <router-view :user='user'/>
<!--    third to get [v-on:callLogin="this.callLogin()"]-->
<!--    figure out if v-on:userUpdated="updateUser" is unnecessary/broken/partial code;-->
  </div>
</template>

<script>
import Header from './components/Header.vue';
import firebase from 'firebase';
// import Masonry from "masonry-layout";
// import onAuthStateChanged from "firebase/auth";
// import Header from './components/Header.vue';
// import PostSection from './components/PostSection.vue';
// import AddPost from './components/AddPost.vue'

// import { db } from './firebase';

// const documentPath = 'posts/giA7TxfrlsdtXVphCNtb';.parentElement.

export default {
  components: { Header },
  // name: 'App',
  // components: {
  //   Header,
  //   PostSection,
  //   AddPost
  // },

  data() {
    return {
      user: ''
    };
  },

  // created() {
  //    db.collection('posts').get().then(querySnapshot => {
  //      querySnapshot.forEach(doc => {
  //        const data = {
  //           'id': doc.id,
  //           'username': doc.data().Username,
  //           'title': doc.data().Title,
  //           'postText': doc.data().PostText
  //        }

  //        this.postsData.push(data);
  //      })
  //    })
  // },

  methods: {
    // updateUser(updatedUsername) {
    //   // console.log(updatedUsername);
    //   console.log(`Updating User..(${updatedUsername})`);
    //   this.user = updatedUsername;
    // },

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
    /* background: rgb(46, 62, 80); */
        /* background: #3d405b; */

      /*background: #22223b;*/

    background: #111111;
  }

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
