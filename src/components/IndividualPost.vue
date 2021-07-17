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
            deletePost() {

                db.collection('posts').doc(this.postData.id).delete().then(() => {
                    setTimeout(() => {
                        this.$emit('updatePost');
                    }, 10);
                });

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
    margin: 0 auto;
    width: 22vw;
    /* text-align: center; */
    color: white;

    white-space: pre-wrap;
}

</style>