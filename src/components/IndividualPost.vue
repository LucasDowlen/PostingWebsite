<template>
    <div v-on:click='deletePost'>
        <li class="id"> {{ postData.id }} </li>
        <li class="title"> {{ postData.title }} </li>
        <li class="username"> {{ postData.username }} </li>
        <li class="postText"> {{ postData.postText }} </li>
    </div>
</template>

<script>

    import { db } from '../firebase.js'; 

    export default {
        name: "IndividualPost",

        props: {
            postData: Object
        },

        methods: {
            deletePost: function() {

                db.collection('posts').doc(this.postData.id).delete().then(
                    this.$emit('updatePost',
                    console.log("update/?")
                ));

                // this.$emit('updatePost');
            }
        }
    }
</script>

<style scoped>

div {
    width: 30vw;
    margin: 0 auto;
}

div li {
    text-align: center;
    color: white;

    white-space: pre-wrap;
}

</style>