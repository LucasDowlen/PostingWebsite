<template>
  <div class="whole-component">
    <div class="container">
      <span @click="this.destroy"> X </span>
      <h1> {{ comment[1] }} </h1>
      <p> {{ comment[0] }} </p>
    </div>
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
        console.log(this.comment);

        //only destroying after comment is added (bug/fix)
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


  /*template {*/
  /*  margin-right: 600px;*/
  /*}*/

  .whole-component {
    margin-right: 600px;
  }

  div .container{
    margin: 1em auto;  /*395px*/
    padding: 5px 15px 5px 5px;
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

  span {
    position: absolute;
    margin: 0 0 0 400px;

    color: white;

  }

  @media screen and (max-width: 1100px) {
    .whole-component {
      margin-right: 0;
    }
  }
</style>
