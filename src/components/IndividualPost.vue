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
            postData: Object,
            user: String
        },

        methods: {
            deletePost() {
                db.collection('posts').doc(this.postData.id).get().then((doc) => {
                    if(doc.data().Username === this.user) {
                        console.log("same")

                        db.collection('posts').doc(this.postData.id).delete().then(() => {
                            setTimeout(() => {
                            this.$emit('updatePost');
                            }, 10);
                        })
                    }

                    else {
                        console.log(`User does not own this post`);
                    }
                })
            }
        }
    }
</script>

<style scoped>

    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto&display=swap');

    div {
        width: 95vw;
        margin: 2vw auto;
        padding: 2vw 0;
        /* background: #81b29a; */
        /* background: #81b29a; */
        background: #52796f;
        border-radius: 0.3vw;
    }

    div ul li {
        margin: 0 auto;
        width: 80vw;
        font-size: 3.4vw;
        /* text-align: center; */
        color: white;

        /* white-space: nowrap; */

        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .title {
        width: 80vw;
        font-size: 5vw;
        margin-bottom: 0.2vw;

        white-space: nowrap;
        display: block;

        font-family: 'Roboto', sans-serif;
    }

    .username {
        margin-bottom: 1.8vw;
        font-family: 'Open Sans', sans-serif;
    }

    .postText {
        font-family: 'Open Sans', sans-serif;
    }

    span{
        margin: -0.4vw 0 0 86.6vw;
        font-size: 4vw;
        position: absolute;
        color: white;
    }

    @media screen and (min-width: 1000px) {
        div {
            width: 90vw;
        }

        div ul li {
            font-size: 1.2vw;
        }

        .title {
            font-size: 1.8vw;
            /* margin-bottom: 0.2vw; */
        }

        span{
            /* margin: -0.4vw 0 0 86.6vw; */
            font-size: 1.4vw;
        }
    }

</style>