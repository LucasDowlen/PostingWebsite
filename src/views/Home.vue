<template>
    <div>
        <video id="background" autoplay loop muted poster="src/assets/philippines-night--.png">
          <source src="https://media.publit.io/file/Philippines-night.mp4" />
        </video>

        <h1>Home</h1>

        <h2>"Communication is the predecessor to invention"</h2>

        <router-link v-if="user === ''" to="/" class="loginLink">Please Login Before Posting</router-link>
        <h2 v-else-if="!this.checkIfVerified()">Please Verify Your Email</h2>
        <h2 v-else> Hello {{ user }}, You Are Logged In </h2>
    </div>
</template>

<script>

    import firebase from "firebase";

    export default {
        name: 'home',

        props: {
            user: String
        },

        methods: {
          // callLogin() {
          //   this.$parent.$emit('callLogin'); //first to get
          // }

          checkIfVerified() {
            if(firebase.auth().currentUser.emailVerified) {
              console.log("True!");
              return true;
            }
            else {
              console.log("False!");
              return false;

            }
          }
        }
    }
</script>

<style scoped>

  #background{
    z-index: -1;
    position: absolute;
    right: 0;
    bottom: 0;
  }

  h1 {
    font-size: 3em;
    margin: 5vw auto 0 20vw;
    color: white;
  }

  h2 {
    font-size: 2em;
    color: white;
    margin: 5vw auto 0 20vw;
  }

  .loginLink {
    color: white;
    font-size: 1.6vw;
    width: 10vw;
    height: 1.4vw;
    display: block;
    margin: 5vw auto 0 20vw;
    text-decoration: none;
  }

</style>
