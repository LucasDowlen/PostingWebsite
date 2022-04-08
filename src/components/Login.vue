<template>
  <div>
    <!-- <h1 class="topHeader">Create Account</h1>

    <form>
        <input v-model="createAccount.email" value="createAccount.email" placeholder="Email" onkeypress="return event.keyCode != 13;"/>
        <input v-model="createAccount.password" value="loginToAccount.password" placeholder="Password" onkeypress="return event.keyCode != 13;"/>

        <button v-on:click.prevent="createNewAccount" />
    </form> -->


    <form>
        <h1>Login Account</h1>
        <input v-model="loginToAccount.email" value="loginToAccount.email" placeholder="Email" class="returnInput"/>
        <input v-model="loginToAccount.password" value="loginToAccount.password" placeholder="Password" class="returnInput"/>

        <button v-on:click.prevent="loginAccount"> Login </button>
    </form>
  </div>
</template>

<script>

  //emit to correct location

  // import { db } from '../firebase.js';
  import firebase from 'firebase';
  const sha256 = require('js-sha256').sha256;

  export default {
    // name: 'login',

    data() {
      return{
        loginToAccount: {
          email: '',
          password: '',
        }
      }
    },

    methods: {
      // createNewAccount() {

      //   console.log("User: " + this.createAccount.email + " Pass: " + this.createAccount.password);

      //   var newEmail = this.createAccount.email.toString();
      //   var newPass = this.createAccount.password.toString();

      //   firebase.auth().createUserWithEmailAndPassword(newEmail, newPass)
      //     .then(() => {
      //       console.log("Success! New Account Made");
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //       console.log("error");
      //     }); //not working

      //   // db.collection("accounts").add({
      //   //     username: this.createAccount.username,
      //   //     password: this.createAccount.password,
      //   //     // PostText: this.data.PostText
      //   //   })

      //   this.createAccount.email = '';
      //   this.createAccount.password = '';
      // },

      loginAccount() {

        let newEmail = this.loginToAccount.email.toString();
        let newPass = this.loginToAccount.password.toString();

        // let emailSplit = newEmail.split("@")

        // newEmail = sha256(emailSplit[0]) + "@" + emailSplit[1];
        newPass = sha256(newPass);

        console.log("NewLogin: " + newEmail);
        console.log("NewPass: " + newPass);
        firebase.auth().signInWithEmailAndPassword(newEmail, newPass)
          .then(() => {
            console.log("successful login");
            this.$parent.$emit('userUpdated', newEmail);

            console.log(firebase.auth().currentUser.email);
          })
          .catch((error) => {
            console.log(error);
          });

        this.loginToAccount.email = '';
        this.loginToAccount.password = '';
      }
    },

    mounted() {
      // console.log("ye");
      // console.log(document.getElementsByClassName('returnInput')[0] + " kdlef");

      for (let i = 0; i < document.getElementsByClassName('returnInput').length; i++) {
        document.getElementsByClassName('returnInput')[i].addEventListener("keydown", (event) => {
          console.log(event.key);
          if (event.key === "Enter") {
            event.preventDefault();
          }
        })
      }
    }
  }
</script>

<style scoped>

  * {
    background: rgb(61, 64, 91);
  }

  div {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;

    height: 50vh;
    width: 70vw;
    position: absolute;
    z-index: 1;
  }

  h1{
    margin-bottom: 1vw;
    text-align: center;
    color: white;
  }

  form{
    margin: 3vw auto 0 auto;
    /*margin-top: 3vw;*/
    display: flex;
    flex-direction: column;
  }

  input, button{
    margin: 0.2vw auto;
    width: 20vw;
    color: white;
  }

  button{
    height: 2vw;
  }

</style>
