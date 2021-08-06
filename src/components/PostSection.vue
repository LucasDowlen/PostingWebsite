<template>
  <div>
    <h1>Posts:</h1>

    <div v-for="data in posts" v-bind:key="data.id">
      <IndividualPost :postData='data' :user='user' v-on:updatePost='sendUpdatePostEmit'/>
    </div>

  </div>
</template>

<script>

  import IndividualPost from './IndividualPost.vue';

  export default {

    props: {
      posts: Array,
      user: String
    },
    
    components: {
      IndividualPost
    },

    methods: {
      sendUpdatePostEmit() {
        this.$emit('updatePost');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  h1 {
    text-align: center;

    color: white;
  }

</style>
