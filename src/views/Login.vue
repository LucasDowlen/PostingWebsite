<template>
  <div>

    <h1>Create Account</h1>

    <form>
        <input v-model="createAccount.username" value="username" placeholder="Username" onkeypress="return event.keyCode != 13;"/>
        <input v-model="createAccount.password" value="password" placeholder="Password" onkeypress="return event.keyCode != 13;"/>
        
        <button v-on:click.prevent="createNewAccount" />
    </form>

    <h1>Login Account</h1>

    <form>
        <input v-model="loginAccount.username" value="username" placeholder="Username" onkeypress="return event.keyCode != 13;"/>
        <input v-model="loginAccount.password" value="password" placeholder="Password" onkeypress="return event.keyCode != 13;"/>
        
        <button v-on:click.prevent="loginToAccount" />
    </form>
  </div>
</template>

<script>

  // import { db } from '../firebase.js';
  import firebase from 'firebase';

  export default {
    name: 'login',

    data() {
      return{

        createAccount: {
          username: '',
          password: ''
        },
        loginToAccount: {
          username: '',
          password: '',
        }
      }
    },

    methods: {
      createNewAccount() {

        console.log("User: " + this.createAccount.username + " Pass: " + this.createAccount.password);

        firebase.auth().createUserWithEmailAndPassword(this.createNewAccount.username, this.createNewAccount.password); //not working

        // db.collection("accounts").add({     
        //     username: this.createAccount.username,
        //     password: this.createAccount.password,
        //     // PostText: this.data.PostText
        //   })

        this.createAccount.username = '';
        this.createAccount.password = '';
      },

      loginAccount() {
        firebase.auth().signInWithEmailAndPassword(this.loginAccount.username, this.loginAccount.password).then(console.log("success"));

        this.loginAccount.username = '';
        this.loginAccount.password = '';
      }
    }
  }
</script>

<style scoped>

  h1{
    text-align: center;
    color: white;
  }

  form{
    margin-top: 3vw;
    display: flex;
    flex-direction: column;
  }

  input, button{
    margin: 0.2vw auto;
    width: 20vw;
  }

</style>
