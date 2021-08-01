<template>
    <div>
        <h1> {{ this.postTitle }} </h1>

        <p> {{ this.postText }} </p>
    </div>
</template>

<script>

    import { db } from '../firebase.js'; 

    export default {

        data() {

            return {
                postTitle: '',
                postText: ''
            }
        },

        created() {
            console.log(this.$route.params.id);
            db.collection("posts").doc(this.$route.params.id).get().then((doc) => {
                this.postTitle = doc.data().Title;
                this.postText = doc.data().PostText;
            })
        }

        // props: {
        //     id: String
        // }
    }
</script>

<style scoped>

    h1 {
        margin: 5vw auto 3vw auto;
        width: 90vw;
        color: white;
    }

    p {
        margin: 0 auto 80px auto;
        color: white;
        font-size: 1.2em;
        width: 90vw;

        white-space: pre-wrap;
    }

    @media screen and (min-width: 1100px) {
        h1, p {
            width: 1000px;
        }
    }

</style>