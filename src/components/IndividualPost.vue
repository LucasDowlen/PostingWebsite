<template>
    <section>
        <span v-on:click='deletePost'>X</span>

        <router-link :to="'/posts/' + this.postData.id" class="routerLink">
            <ul>
                <!-- <li class="id"> {{ postData.id }} </li> -->
                <li class="title"> {{ postData.title }} </li>
                <li class="username"> Posted By: {{ postData.username }} - {{ postData.id }} </li>
                <li class="postText"> {{ postData.postText }} </li>
            </ul>
        </router-link>
    </section>
</template>

<script>

    import { db } from '@/firebase';

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
                        console.log("same");

                        db.collection('posts').doc(this.postData.id).delete().then(() => { //possible remove delay or make it wait for required variable
                            setTimeout(() => {
                            this.$emit('updatePost');
                            }, 10);
                        })
                    }

                    else {
                        console.log('User does not own this post');
                    }
                })
            }
        }
    }
</script>

<style scoped>

    .routerLink {
        text-decoration: none;
    }

    section {
        width: 95vw;
        margin: 2em auto;
        padding: 15px 0;
        /* background: #81b29a; */
        /* background: #81b29a; */
        /*background: #4a4e69;*/
        background: #1D1C21;
        border-radius: 0.3vw;
    }

    ul li {
        margin: 0 auto;
        width: 80vw;
        /* font-size: 3.4vw; */
        font-size: 1.05em;
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
        /* font-size: 5vw; */
        font-size: 1.8em;
        margin-bottom: 0.2vw;

        white-space: nowrap;
        display: block;

        font-family: 'Roboto', sans-serif;
    }

    .username {
        font-family: 'Open Sans', sans-serif;
        font-size: 1.15em;
    }

    .postText {
        margin-top: 1em;
        font-family: 'Open Sans', sans-serif;
    }

    span{
        margin: 0.2vw 0 0 90vw;
        font-size: 1.4em;
        position: absolute;
        color: white;
    }

    @media screen and (min-width: 800px) {
        section {
            width: 50vw;
        }

        ul li {
            width: 45vw;
        }

        /* div ul li {
            font-size: 1.2vw;
        } */

        .title {
            /* font-size: 1.8vw; */
            width: 45vw;
            margin-bottom: 0.2vw;
        }

        span{
            margin: -0.2vw 0 0 48vw;
            /* font-size: 1.4vw; */
        }
    }
</style>
