<template>
  <div>
    <!-- <Header /> -->
    <PostSection :posts="postsData" :user='user' v-on:updatePost='updatePosts' />
    <!-- <AddPost v-on:updatePost='updatePosts' :user='user'/> -->
  </div>
</template>

<script>
import PostSection from '../components/PostSection.vue';
// import AddPost from '../components/AddPost.vue'

import { db } from '@/firebase';
import {sha256} from "js-sha256";
var CryptoJS = require("crypto-js");

// const documentPath = 'posts/giA7TxfrlsdtXVphCNtb';

export default {
  name: 'Posts',
  components: {
    // Header,
    PostSection,
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

    let decryptionKey;

    db.collection('Encryption Key').doc('pe9izlV1les8NQ3SsDad').get().then((doc) => {
      console.log("---------- DATA -----------");

      decryptionKey = doc.data().Key;
      console.log("DK1: " + decryptionKey);
      decryptionKey = sha256(decryptionKey);

      decryptionKey = decryptionKey.substring(0, 16);

      console.log("DK2: " + decryptionKey);

      console.log(decryptionKey); //grabs encryption key
    }).then(() => {
      db.collection('posts').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            'id': doc.id,
            'username': doc.data().Username,
            'title': doc.data().Title,
            'postText': doc.data().PostText
          }

          console.log("Encrypted Titles: " + data.title);
          data.title = CryptoJS.AES.decrypt(data.title.toString(), decryptionKey).toString(CryptoJS.enc.Utf8);
          data.postText = CryptoJS.AES.decrypt(data.postText.toString(), decryptionKey).toString(CryptoJS.enc.Utf8);

          this.postsData.push(data);
        })
      })
    });
  },

  methods: {
    updatePosts() { //sometimes called too early*
      db.collection('posts').get().then(querySnapshot => {


        let decryptionkey;
        // let crypt;
        // let productKey;

        db.collection('Encryption Key').doc('pe9izlV1les8NQ3SsDad').get().then((doc) => {
          console.log("---------- DATA -----------");

          decryptionkey = doc.data().Key;
          console.log("DK1: " + decryptionkey);
          decryptionkey = sha256(decryptionkey);

          decryptionkey = decryptionkey.substring(0, 16);

          console.log("DK2: " + decryptionkey);

          console.log(decryptionkey); //grabs encryption key
        }).then(() => {
          this.postsData = [];
          querySnapshot.forEach(doc => {
            const data = {
              'id': doc.id,
              'username': doc.data().Username,
              'title': doc.data().Title,
              'postText': doc.data().PostText
            }

            // //two lines below may be unnessesary
            data.title = CryptoJS.AES.decrypt(data.title.toString(), decryptionkey).toString(CryptoJS.enc.Utf8);
            data.postText = CryptoJS.AES.decrypt(data.postText.toString(), decryptionkey).toString(CryptoJS.enc.Utf8);

            this.postsData.push(data);
          })})
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
