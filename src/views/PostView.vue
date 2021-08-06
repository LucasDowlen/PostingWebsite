<template>
    <div>

        <textarea v-show="editing" v-model="editPostTitle" class="editTitle" />

        <h1 v-if="!editing"> {{ this.postTitle }} </h1>

        <textarea v-show="editing" ref="postInput" v-model="editPostText" @input="resizeTextbox($event)" class="editInput" /> 

        <p v-if="!editing"> {{ this.postText }} </p>

        <div class="editButtonsContainer">
            <button v-if="this.postAuthor === user" @click="updatePost(true)" :style="editing ? { 'color': 'rgb(206, 206, 206)' } : { 'color': 'white' }"> Edit </button>

            <button @click="editing = false" class="cancel" v-if="editing"> Cancel </button>
            <button @click="updatePost(false)" v-if="editing"> Submit Changes </button>
        </div>
    </div>
</template>

<script>

    //v-model in on textarea auto updating paragraph
    //either remove model or reverse changes on cancel press

    import { db } from '../firebase.js'; 

    export default {

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
                editing: true
            }
        },

        mounted() {
            console.log(this.$route.params.id);

            this.id = this.$route.params.id;

            db.collection("posts").doc(this.id).get().then((doc) => {
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
                console.log(this.$refs);
            },

            updatePost(editing) {

                if(editing) {
                    this.editPostText = this.postText;

                    this.editing = true;
                }

                else {

                    this.editing = false;

                    if(this.postTitle === this.editPostTitle && this.postText === this.editPostText) return; //prevents unnessesary updates to database

                    this.postTitle = this.editPostTitle
                    this.postText = this.editPostText;

                    db.collection('posts').doc(this.id).update({
                        Title: this.editPostTitle,
                        PostText: this.postText
                    })
                }

                // db.collection('posts').doc(this.$route.params.id).set(() => {
                //     PostText: this.$refs.postText.value;
                // })
            }

            // updateEditingView() {

            //     console.log("run");
            // }
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
    }

    p {
        margin: 0 auto 10px auto;
        color: white;
        font-size: 1.2em;
        width: 90vw;

        white-space: pre-wrap;
        font-family: 'Open Sans', sans-serif;
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
        margin: 0 auto 80px auto;
        display: flex;
        justify-content: space-between;
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
        h1, p, textarea {
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