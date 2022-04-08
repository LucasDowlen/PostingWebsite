<template>
    <div>
        <form>
          <h1 class="topHeader">Create Account</h1>
          <input v-model="createAccount.email" value="createAccount.email" placeholder="Email" class="returnInput"/>
          <input v-model="createAccount.password" value="loginToAccount.password" placeholder="Password" class="returnInput"/>

          <button v-on:click.prevent="createNewAccount"> Create Account </button>
        </form>
    </div>
</template>

<script>

  import firebase from 'firebase';
  const sha256 = require('js-sha256').sha256; //may be removable
  // import { db } from "../firebase"; //seems removable

    export default {

        data() {
          return {
            createAccount: {
            email: '',
            password: ''
            },
          }
        },

        methods: {

          createNewAccount() {

              console.log("User: " + this.createAccount.email + " Pass: " + this.createAccount.password);

              let newEmail = this.createAccount.email.toString();
              let newPass = this.createAccount.password.toString();

              // let emailSplit = newEmail.split("@")
              //
              // newEmail = sha256(emailSplit[0]) + "@" + emailSplit[1];
              newPass = sha256(newPass);

              console.log("HashedEmail: " + newEmail)
              console.log("HashedPassword: " +  newPass);


              // firebase.auth().sendSignInLinkToEmail(newEmail, {url: "http://localhost:8080/", handleCodeInApp: true}); //for passwordless sign in

              firebase.auth().createUserWithEmailAndPassword(newEmail, newPass)
              .then(() => {
                  firebase.auth().currentUser.sendEmailVerification({url: "http://localhost:8080/"});
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
          }
      },

      mounted() {
          console.log("ye");
          console.log(document.getElementsByClassName('returnInput')[0]);

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

  *{
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
