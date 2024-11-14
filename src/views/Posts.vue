<template>
  <div class="wrapper">
    <section></section>
    <PostSection :posts="postsData" :user='user' v-on:updatePost='updatePosts' />
    <section></section>
  </div>
</template>

<script>
import PostSection from '../components/PostSection.vue';

import { db } from '@/firebase';
import {sha256} from "js-sha256";
var CryptoJS = require("crypto-js");

export default {
  name: 'Posts',
  components: {
    PostSection,
  },

  props: {
    user: String,
  },

  data() {
    return {
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

      console.log(decryptionKey);
    }).then(() => {
      db.collection('posts').orderBy('createdAt', 'desc').get().then(querySnapshot => {
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
    updatePosts() {
      db.collection('posts').orderBy('createdAt', 'desc').get().then(querySnapshot => {
        let decryptionkey;
        db.collection('Encryption Key').doc('pe9izlV1les8NQ3SsDad').get().then((doc) => {
          console.log("---------- DATA -----------");

          decryptionkey = doc.data().Key;
          console.log("DK1: " + decryptionkey);
          decryptionkey = sha256(decryptionkey);

          decryptionkey = decryptionkey.substring(0, 16);

          console.log("DK2: " + decryptionkey);

          console.log(decryptionkey);
        }).then(() => {
          this.postsData = [];
          querySnapshot.forEach(doc => {
            const data = {
              'id': doc.id,
              'username': doc.data().Username,
              'title': doc.data().Title,
              'postText': doc.data().PostText
            }

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
<style scoped>
  .wrapper {
    display: flex;
    justify-content: space-around;
  }

  section {
    margin: calc(6.1vw + 2.5em) 2vw 0 2vw;
    width:20vw;
    height: 80vh;
    background: rgb(29,28,33);
  }
</style>
