<template>
  <div id="app">
    <Header :user='username'/>
    <router-view v-on:userUpdated="updateUser" :user='username'/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
// import Header from './components/Header.vue';
// import PostSection from './components/PostSection.vue';
// import AddPost from './components/AddPost.vue'

// import { db } from './firebase'; 

// const documentPath = 'posts/giA7TxfrlsdtXVphCNtb';

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
      username: ''
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
    updateUser(updatedUsername) {
      console.log("updatingUser");
      this.username = updatedUsername;
    }
  }
}
</script>

<style>

  *{
    list-style: none;
    cursor: default;
  }

  body{
    /* background: rgb(46, 62, 80); */
        /* background: #3d405b; */
      background: #2f3e46;
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
