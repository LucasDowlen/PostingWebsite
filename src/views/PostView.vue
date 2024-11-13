<template>
  <div>
    <article>
      <textarea v-show="editing" v-model="editPostTitle" class="editTitle" />

      <h1 v-if="!editing"> {{ this.postTitle }} </h1>

      <textarea v-show="editing" ref="postInput" v-model="editPostText" @input="resizeTextbox($event)" class="editInput" />

      <p v-if="!editing"> {{ this.postText }} </p>
    </article>

    <div class="editButtonsContainer">
        <button v-if="this.postAuthor === user" @click="updatePost(true)" :style="editing ? { 'color': 'rgb(206, 206, 206)' } : { 'color': 'white' }"> Edit </button>

        <button @click="editing = false" class="cancel" v-if="editing"> Cancel </button>
        <button @click="updatePost(false)" v-if="editing"> Submit Changes </button>
    </div>

    <div class="commentInputSection">
      <textarea placeholder="comment" v-model="comment" @input="resizeTextbox($event)"/>
      <button @click="this.addComment"> Submit </button>
    </div>

    <section>
      <ul v-for="(comment, i) in comments" v-bind:key="i">
        <IndividualComment :comment="comment" :index="i" :path="id"/>
      </ul>
    </section>
  </div>
</template>

<script>
    import { db } from '@/firebase';
    import IndividualComment from "@/components/IndividualComment";
    import CryptoJS from "crypto-js";
    import {sha256} from "js-sha256";

    export default {
      components: {IndividualComment},
      props: {
          user: String
      },

      data() {
        return {
          id: '',
          postAuthor: '',
          postTitle: '',
          postText: '',
          editPostTitle: '',
          editPostText: '',
          editing: true,
          comment: '',
          comments: []
        }
      },

      created() {
        db.collection('posts').doc(this.$route.params.id).collection('comments').onSnapshot(snapshot => {
          let commentList = [];
          let decryptionKey;
          db.collection('Encryption Key').doc('pe9izlV1les8NQ3SsDad').get().then((doc) => {

            decryptionKey = doc.data().Key;
            decryptionKey = sha256(decryptionKey);

            decryptionKey = decryptionKey.substring(0, 16);
          }).then(() => {
            snapshot.forEach((doc) => {

              console.log("DocID: " + doc.id);

              let comment = CryptoJS.AES.decrypt(doc.data().Comment, decryptionKey).toString(CryptoJS.enc.Utf8);
              let author = CryptoJS.AES.decrypt(doc.data().Author, decryptionKey).toString(CryptoJS.enc.Utf8);
              commentList.push([comment, author, doc.id]);
            })
          })
          this.comments = commentList;
        })
      },

      mounted() {

        let decryptionKey;

        db.collection('Encryption Key').doc('pe9izlV1les8NQ3SsDad').get().then((doc) => {

          decryptionKey = doc.data().Key;
          decryptionKey = sha256(decryptionKey);

          decryptionKey = decryptionKey.substring(0, 16);
        }).then(() => {
          db.collection("posts").doc(this.$route.params.id).get().then((doc) => {

            this.id = this.$route.params.id;

            let author = doc.data().Username;
            let postTitle = doc.data().Title;
            let postText = doc.data().PostText;

            this.postAuthor = author;
            this.postTitle = CryptoJS.AES.decrypt(postTitle.toString(), decryptionKey).toString(CryptoJS.enc.Utf8);
            this.postText = CryptoJS.AES.decrypt(postText.toString(), decryptionKey).toString(CryptoJS.enc.Utf8);
        })}).then(() => {
            this.editing = false;
        }).then(() => {
          this.comments = db.collection("posts").doc(this.$route.params.id).collection("comments").get().then(querySnapshot => {

            let newList = [];

            querySnapshot.forEach(doc => {
              let author = CryptoJS.AES.decrypt(doc.data().Author.toString(), decryptionKey).toString(CryptoJS.enc.Utf8);
              let comment = CryptoJS.AES.decrypt(doc.data().Comment.toString(), decryptionKey).toString(CryptoJS.enc.Utf8);

              var data = [author, comment, doc.id]

              newList.push(data);
            })

            this.comments = newList;
          });
        });
      },

      methods: {
        resizeTextbox(e) {

            let scrollLeft = window.pageXOffset ||
                (document.documentElement || document.body.parentNode || document.body).scrollLeft;

            let scrollTop  = window.pageYOffset ||
                (document.documentElement || document.body.parentNode || document.body).scrollTop;

            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`

            window.scrollTo(scrollLeft, scrollTop);
        },

        updatePost(editing) {

            if(editing) {
                this.editPostTitle = this.postTitle;
                this.editPostText = this.postText;

                this.editing = true;

                this.$refs.postInput.style.height = this.$refs.postInput.parentElement.scrollHeight - 80 + "px"; //maybe tweak subtracted  variable
            }

            else {

                this.editing = false;

                if(this.postTitle === this.editPostTitle && this.postText === this.editPostText) return; //prevents unnecessary updates to database


                let decryptionKey;

                db.collection('Encryption Key').doc('pe9izlV1les8NQ3SsDad').get().then((doc) => {

                  decryptionKey = doc.data().Key;
                  decryptionKey = sha256(decryptionKey);

                  decryptionKey = decryptionKey.substring(0, 16);
                }).then(() => {
                  let encryptedTitle = String(CryptoJS.AES.encrypt(this.editPostTitle, decryptionKey));
                  let encryptedText = String(CryptoJS.AES.encrypt(this.editPostText, decryptionKey));

                  this.postTitle = this.editPostTitle
                  this.postText = this.editPostText;

                  db.collection('posts').doc(this.$route.params.id).update({
                    Title: encryptedTitle,
                    PostText: encryptedText
                  })
                })
            }
        },

        addComment() {

          if(this.comment === '' || this.user === '') return;

          let decryptionKey;

          db.collection('Encryption Key').doc('pe9izlV1les8NQ3SsDad').get().then((doc) => {

            decryptionKey = doc.data().Key;
            decryptionKey = sha256(decryptionKey);

            decryptionKey = decryptionKey.substring(0, 16);
          }).then(() => {
              const comment = String(CryptoJS.AES.encrypt(this.comment, decryptionKey));
              const user = String(CryptoJS.AES.encrypt(this.user, decryptionKey));

            db.collection('posts').doc(this.$route.params.id).collection('comments').add({
              Comment: comment,
              Author: user
            })
          }).then(() => {
            db.collection("users").doc(this.user).collection('userComments').add({
              Comment: this.comment,
              Author: this.user
            })
          })
          .then(() => {
            this.comment = "";
          })
          .catch((err) => {
            console.log(err);
          })
        }
      }
    }
</script>

<style scoped>

    h1, .editTitle {
        margin: 5vw auto 3vw auto;
        color: white;
        font-size: 2em;

        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        width: 1000px;

        white-space: pre-wrap;
        resize: none;
    }

    p {
        margin: 0 auto 10px auto;
        color: white;
        font-size: 1.2em;
        width: 90vw;

        white-space: pre-wrap;
        font-family: 'Open Sans', sans-serif;

        padding: 16px;
        border: 1px solid white;
        /*extra border to prevent margin shift when changing to textarea visibility */
    }

    .editTitle {
        background: none;
        display: block;
        outline: none;
    }

    .editInput {
        display: block;
        margin: -37px auto 10px auto;
        background: none;
        outline: none;
        color: white;
        font-size: 1.2em;

        white-space: pre-wrap;
        resize: none;
        font-family: 'Open Sans', sans-serif;
    }

    .editButtonsContainer {
        width: 90vw;
        margin: 0 auto 30px auto;
        display: flex;
        justify-content: space-between;
    }

    .commentInputSection {
        margin: 0 auto;
        width: 1000px;
    }

    .commentInputSection textarea {
        display: block;
        margin: 0 auto;
        resize: none;

        width: 400px;

        background: none;
        color: white;
        font-size: 1.2em;

        height: 1.4em;
        outline: none;
    }

    .commentInputSection button {
        display: block;
        margin: 1vw auto;
        border: 1px solid rgb(118,118,118);
        padding: 7px;
        color: white;
    }

    .commentInputSection button:hover {
        background: rgb(49, 49, 49);
    }

    button {
        text-align: center;
        color: rgb(255, 255, 255);


        font-size: 1.2em;
        background: none;
        border: none;
    }

    .cancel {
        margin-left: 30vw;
    }

    @media screen and (min-width: 1100px) {

        .commentInputSection button {
          margin: 1vw auto 60px 0;
        }

        h1, p, article .editInput {
          width: 1000px;
        }

        .editButtonsContainer {
            width: 900px
        }

        .cancel {
            margin-left: 570px;
        }
    }
</style>
