<template>
  <div>
    <h1> {{ comment[1] }} </h1>
    <p> {{ comment[0] }} </p>
    <span @click="this.destroy"> X </span>
  </div>
</template>

<script>

  import { db } from '@/firebase'

  export default {

    props: {
      path: String,
      // index: Number,
      user: String, //use to verify permision to delete;
      comment: Array
    },

    methods: {
      destroy() {
        console.log("Destroy!")

        db.collection('posts').doc(this.path).collection("comments").doc(this.comment[2]).delete().then(() => {
          console.log(`Path: ${this.path} ID: ${this.comment[2]}`);
        });

        // this.$el.parentNode.removeChild(this.$el);
      },
    },

    name: "IndividualComment"
  }
</script>

<style scoped>

  div {
    margin: 1em auto 1em 395px;
    padding: 5px;
    /*background: #253138;*/
    width: 400px;
    /*height: 5em;*/
    border: 1px solid #ebf4fa;
  }

  h1 {
    font-size: 1.2em;
    color: white;
  }

  p {
    color: white;
  }
</style>