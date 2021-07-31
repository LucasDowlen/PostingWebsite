<template>
  <div>
    <!-- <Header /> -->
    <PostSection :posts="postsData" :user='user' v-on:updatePost='updatePosts' />
    <AddPost v-on:updatePost='updatePosts' :user='user'/>
  </div>
</template>

<script>
import PostSection from '../components/PostSection.vue';
import AddPost from '../components/AddPost.vue'

import { db } from '../firebase'; 

// const documentPath = 'posts/giA7TxfrlsdtXVphCNtb';

export default {
  name: 'Posts',
  components: {
    // Header,
    PostSection,
    AddPost
  },

  props: {
    user: String,
  },

  data() {
    return {
      // firebaseData: null,
      postsData: [],
    };
  },

  created() {
     db.collection('posts').get().then(querySnapshot => {
       querySnapshot.forEach(doc => {
         const data = {
            'id': doc.id,
            'username': doc.data().Username,
            'title': doc.data().Title,
            'postText': doc.data().PostText
         }

         this.postsData.push(data);
       })
     })
  },

  methods: {
    updatePosts() { //sometimes called too early*
      db.collection('posts').get().then(querySnapshot => {
          this.postsData = [];
          querySnapshot.forEach(doc => {
              const data = {
                  'id': doc.id,
                  'username': doc.data().Username,
                  'title': doc.data().Title,
                  'postText': doc.data().PostText
              }

              this.postsData.push(data);

              // console.log(this.postsData[0].username);
          })
          // .then(() => { //not tested but may call from server too many times and does not account for inital render;
          //   if(oldPostsData === this.postsData){
          //     setTimeout(() => {
          //       this.updatePosts();
          //     }, 1000);
          //   }
          // })
      })
      .catch((error) => {
        console.log("Update-Error: " + error);
      })
    }
  }
}
</script>


<style>

  /* *{
    list-style: none;
  }

  body{
    background: rgb(46, 62, 80);
  } */

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
