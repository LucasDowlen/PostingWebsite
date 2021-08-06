<template>
    <div>
        <h1 class="topHeader">Create Account</h1>

        <form>
            <input v-model="createAccount.email" value="createAccount.email" placeholder="Email" onkeypress="return event.keyCode != 13;"/>
            <input v-model="createAccount.password" value="loginToAccount.password" placeholder="Password" onkeypress="return event.keyCode != 13;"/>
            
            <button v-on:click.prevent="createNewAccount"> Create Account </button>
        </form>
    </div>
</template>

<script>

  import firebase from 'firebase';

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

              var newEmail = this.createAccount.email.toString();
              var newPass = this.createAccount.password.toString();

              firebase.auth().createUserWithEmailAndPassword(newEmail, newPass)
              .then(() => {
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
    
    height: 40vh;
    width: 60vw;
    position: absolute;
    z-index: 1;
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
    color: white;
  }

  button{
    height: 2vw;
  }

</style>