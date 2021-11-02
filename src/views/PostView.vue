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
<!--          commentUntested and function-->

      <button @click="this.addComment"> Submit </button>
    </div>

    <section class="commentsSection">
      <ul v-for="(comment, i) in comments" v-bind:key="i">
        <IndividualComment :comment="comment" :index="i" :path="id"/>
      </ul>
<!--      not working above-->
    </section>
  </div>
</template>

<script>

    //v-model in on textarea auto updating paragraph
    //either remove model or reverse changes on cancel press

    import { db } from '@/firebase';
    import IndividualComment from "@/components/IndividualComment";

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
        let commentList = [];
        db.collection('posts').doc(this.$route.params.id).collection('comments').onSnapshot(snapshot => {
          commentList = [];
          console.log(snapshot);

          snapshot.forEach((doc) => {
              commentList.push([doc.data().Comment, doc.data().Author, doc.id]);
              console.log("ID: " + doc.id);
          })

          // maybe make a better way then timeout at 0
          setTimeout(() => {
            this.comments = commentList;
          }, 0);
        })

        // console.log(commentList);
        // this.comments = commentList;
      },

      mounted() {
        db.collection("posts").doc(this.$route.params.id).get().then((doc) => {

          this.id = this.$route.params.id;

          this.postAuthor = doc.data().Username;
          this.postTitle = this.editPostTitle = doc.data().Title;
          this.postText = this.editPostText = doc.data().PostText;
        }).then(() => {
            this.$refs.postInput.style.height = this.$refs.postInput.scrollHeight + "px";
        }).then(() => {
            this.editing = false;
        });
      },

      methods: {

        resizeTextbox(e) {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`
        },

        updatePost(editing) {

            if(editing) {
                this.editPostText = this.postText;

                this.editing = true;
            }

            else {

                this.editing = false;

                if(this.postTitle === this.editPostTitle && this.postText === this.editPostText) return; //prevents unnecessary updates to database

                this.postTitle = this.editPostTitle
                this.postText = this.editPostText;

                db.collection('posts').doc(this.$route.params.id).update({
                    Title: this.editPostTitle,
                    PostText: this.postText
                })
            }

            // db.collection('posts').doc(this.$route.params.id).set(() => {
            //     PostText: this.$refs.postText.value;
            // })
        },

        addComment() {

          console.log(`1: ${this.$route.params.id}`);
          //duplicating each comment

          if(this.comment === '' || this.user === '') return;

          db.collection('posts').doc(this.$route.params.id).collection('comments').add({
            Comment: this.comment,
            Author: this.user
          })
          .then(() => {
            console.log("then")
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

            // db.collection('comments').add(() => {

            // })
        }
      }
    }
</script>

<style scoped>

    h1, .editTitle {
        margin: 5vw auto 3vw auto;
        /* width: 90vw; */
        color: white;
        font-size: 2em;

        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        border: 1px solid #22223b;
        /*extra boder to prevent margin shift when changing to textarea visiblity */
    }

    p {
        margin: 0 auto 10px auto;
        color: white;
        font-size: 1.2em;
        width: 90vw;

        white-space: pre-wrap;
        font-family: 'Open Sans', sans-serif;
        border: 1px solid #22223b;
        /*extra boder to prevent margin shift when changing to textarea visiblity */
    }

    .editTitle {

        /* margin: 5vw auto 3vw auto; */

        background: none;
        display: block;
        outline: none;

        /* color: white;
        font-size: 2em; */
    }

    .editInput {
        display: block;
        margin: 0 auto 10px auto;
        background: none;
        outline: none;
        /* border: none; */
        color: white;
        font-size: 1.2em;

        /* width: 90vw; */
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
        /* white-space: pre-wrap; */

        background: none;
        color: white;
        font-size: 1.2em;

        height: 1.4em;
        /* border: none; */
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

    /* .commentInputSection textarea::placeholder {
        color: grey;
    } */

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
          /*margin: 0 auto;*/
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