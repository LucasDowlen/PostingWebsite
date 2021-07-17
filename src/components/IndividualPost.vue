<template>
    <div>
        <span v-on:click='deletePost'>X</span>
        <ul>
            <!-- <li class="id"> {{ postData.id }} </li> -->
            <li class="title"> {{ postData.title }} </li>
            <li class="username"> Posted By: {{ postData.username }} - {{ postData.id }} </li>
            <br />
            <li class="postText"> {{ postData.postText }} </li>
        </ul>
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
    margin: 1vw auto;
    padding: 1vw 0;
    /* background: #81b29a; */
    /* background: #81b29a; */
    background: #52796f;
    border-radius: 0.3vw;
}

div li {
    margin: 0 auto;
    width: 22vw;
    /* text-align: center; */
    color: white;

    white-space: pre-wrap;
}

span{
    margin: -0.4vw 0 0 28.5vw;
    position: absolute;
    color: white;
}

</style>