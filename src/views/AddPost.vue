<template>
    <section>

        <section>
          <h1>Create a Post Under /General</h1>
          <h3 :style="{ color: this.errColor }"> {{ this.errMessage }} </h3>
        </section>

        <form>
            <input v-model="data.Title" placeholder="Title" class="returnInput"/>
            <textarea v-model="data.PostText" placeholder="Post Text" @input="resizeTextbox($event)"/>

            <button v-on:click.prevent='callUpdateFunction'> Submit </button>
        </form>
    </section>
</template>

<script>

    import { db } from '@/firebase'
    import firebase from 'firebase';
    var CryptoJS = require("crypto-js");
    const sha256 = require('js-sha256').sha256;

    export default {
        name: "AddPost",

        props: {
            user: String,
        },

        data() {
            return {
                data: {
                    Title: "",
                    PostText: ""
                },
                errMessage: "You can create a post here. You must include a title and content.",
                errColor: "white"
            }
        },

        methods: {
            callUpdateFunction() {

                if(this.data.Title === '' || this.user === '' || this.data.PostText === '' || !firebase.auth().currentUser.emailVerified){
                    this.errColor = "#e73952";
                    if(this.user === '') {
                      console.log("Please Login");
                      this.errMessage = "Please Login";
                      console.log(this.errMessage)
                    }
                    else if (!firebase.auth().currentUser.emailVerified) {
                      console.log("Please Verify your Email Address");
                      this.errMessage = "Please Verify your Email Address";
                    }
                    else {
                      console.log("Please Provide a valid Title and Post");
                      this.errMessage = "Please Provide a valid Title and Post";
                    }
                    return;
                }

                let decryptionkey;

                db.collection('Encryption Key').doc('pe9izlV1les8NQ3SsDad').get().then((doc) => {
                  console.log("---------- DATA -----------");

                  decryptionkey = doc.data().Key;
                  console.log("DK1: " + decryptionkey);
                  decryptionkey = sha256(decryptionkey);

                  decryptionkey = decryptionkey.substring(0, 16);
                }).then(() => {
                  let encryptedTitle = String(CryptoJS.AES.encrypt(this.data.Title, decryptionkey));
                  let encryptedPostText = String(CryptoJS.AES.encrypt(this.data.PostText, decryptionkey));

                  db.collection("posts").add({
                    Title: encryptedTitle,
                    Username: this.user,
                    PostText: encryptedPostText,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp() //new
                  })
                  .then(() => {
                    this.$router.push({ path: '/posts' })
                    this.data.Title = "";
                    this.data.PostText = "";
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                });
            },

            resizeTextbox(e) {
                e.target.style.height = 'auto';
                console.log(e.target.scrollHeight);

                if(e.target.scrollHeight > 400) {
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`
                }
                else {
                  e.target.style.height = "400px";
                }
            }
        },

        mounted() {
          console.log(document.getElementsByClassName('returnInput')[0]);

          for (let i = 0; i < document.getElementsByClassName('returnInput').length; i++) {
            document.getElementsByClassName('returnInput')[i].addEventListener("keydown", (event) => {
              console.log(event.key + " Key");
              if (event.key === "Enter") {
                event.preventDefault();
              }
            })
          }
        }
    }

</script>
<style scoped>

section{
  margin-top: 5vw;
}

section section {
  display: flex;
  flex-direction: column;
}

h1 {
  margin: 0 auto 0 20vw;
  color: white;
  font-size: 2em;
}

h3 {
  margin: 0 auto 2em 20vw;
  color: white;
  font-size: 1em;
}

form{
    display: flex;
    flex-direction: column;
}

input, textarea{
  background: none;
  font-size: 1.6em;
  color: white;
  border: none;
  outline: none;

  transition: all 0.2s linear;
}

input::placeholder, textarea::placeholder {
  color: #7f9ba2;
}

input{
  border-radius: 3px;
  border-bottom: 2px solid white;
  margin: 0.2vw auto 0 20vw;
  width: 20vw;
}

input:focus {
  border-bottom: 2px solid cyan;
  background: rgb(39, 39, 66);
  width: 60vw;
}

textarea{
  height: 20vh;
  width: 60vw;
  margin: 2vw auto;
  resize: none;
  border: 2px solid white;

}

textarea:focus {
  height: 400px;
}

button{
    margin: 0.5vw auto 0 20vw;
    background: none;
    border: 2px solid white;
    width: 7.5vw;
    height: 2.6vw;
    color: white;

    font-size: 1.4em;
}
</style>
