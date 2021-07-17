<template>
    <div>
        <form>
            <!-- //somereaseon keys are getting duplicated -->
            <input v-model="data.Title" placeholder="Title" onkeypress="return event.keyCode != 13;"/>
            <!-- <input v-model="data.Author" placeholder="Username" onkeypress="return event.keyCode != 13;"/> -->
            <textarea v-model="data.PostText" placeholder="Post Text" type="textarea" @input="resizeTextbox($event)"/>

            <button v-on:click.prevent='callUpdateFunction'/>
        </form>

        <!-- <h3> {{ data.test }} + test?</h3> -->
    </div>
</template>

<script>

    import { db } from '../firebase.js';

    export default {
        name: "AddPost",
        
        props: {
            user: String,
        },

        data() {
            return {
                data: {
                    // ID: "",
                    Title: "",
                    // Author: "",
                    PostText: "",
                    // test: ""
                }
            }
        },

        methods: { //not updating when stoped work
            callUpdateFunction() {

                if(this.data.Title === '' || this.user === '' || this.data.PostText === ''){
                    console.log("Unfilled Fields");
                    return;
                }

                db.collection("posts").add({     
                    Title: this.data.Title,
                    Username: this.user,
                    PostText: this.data.PostText
                })
                .then(() => {
                    this.$emit('updatePost');
                });

                this.data.Title = "";
                // this.data.Author = "";
                this.data.PostText = "";
            },

            resizeTextbox(e) {

                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`

                // this.data.PostText = e.target.value;

                // console.log(this.data.PostText);

                // this.data.test = this.data.PostText;
                // this.data.test = this.data.PostText;

                // console.log(this.data.test + "datavmodel");

                // this.data.test = this.data.PostText.replace(/(?:\r\n|\r|\n)/g, '<br>');

            }
        }
    }

</script>

<style scoped>

form{
    display: flex;
    flex-direction: column;
}

input, textarea{
    margin: 0.2vw auto;
    width: 20vw;
}

textarea{
    resize: none;
}

button{
    margin: 1vw auto 0 auto;
    background: rgb(255, 255, 255);
    border: none;
    width: 8vw;
    height: 1.8vw;
}

/* h3{
    color: white;
    font-size: 3vw;

    white-space: pre-wrap;
} */

</style>