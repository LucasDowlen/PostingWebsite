<template>
  <div>
    <h1 class="topHeader">Create Account</h1>

    <form>
        <input v-model="createAccount.email" value="createAccount.email" placeholder="Email" onkeypress="return event.keyCode != 13;"/>
        <input v-model="createAccount.password" value="loginToAccount.password" placeholder="Password" onkeypress="return event.keyCode != 13;"/>
        
        <button v-on:click.prevent="createNewAccount" />
    </form>

    <h1>Login Account</h1>

    <form>
        <input v-model="loginToAccount.email" value="loginToAccount.email" placeholder="Email" onkeypress="return event.keyCode != 13;"/>
        <input v-model="loginToAccount.password" value="loginToAccount.password" placeholder="Password" onkeypress="return event.keyCode != 13;"/>

        <button v-on:click.prevent="loginAccount" />
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
          email: '',
          password: ''
        },
        loginToAccount: {
          email: '',
          password: '',
        }
      }
    },

    methods: {
      createNewAccount() {

        console.log("User: " + this.createAccount.email + " Pass: " + this.createAccount.password);

        var newEmail = this.createAccount.email.toString();
        var newPass = this.createAccount.password.toString();

        firebase.auth().createUserWithEmailAndPassword(newEmail, newPass).then(() => {
          console.log("Success! New Account Made");
        })
        .catch((error) => {
          console.log(error);
          console.log("error");
        }); //not working

        // db.collection("accounts").add({     
        //     username: this.createAccount.username,
        //     password: this.createAccount.password,
        //     // PostText: this.data.PostText
        //   })

        this.createAccount.email = '';
        this.createAccount.password = '';
      },

      loginAccount() {

        var newEmail = this.loginToAccount.email.toString();
        var newPass = this.loginToAccount.password.toString();

        console.log("NewLogin: " + newEmail + " pass: " + newPass);
        firebase.auth().signInWithEmailAndPassword(newEmail, newPass)
          .then(() => {
            console.log("successful login");
            this.$emit('userUpdated', newEmail);
          })
          .catch((error) => {
            console.log(error);
          });

        this.loginToAccount.email = '';
        this.loginToAccount.password = '';
      }
    }
  }
</script>

<style scoped>

  .topHeader{
    margin-top: 5vw;
  }

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

  button{
    height: 1vw;
  }

</style>
