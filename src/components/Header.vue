<template>
    <div>
        <ul>
            <li>Home</li>
            <li>Subreddits</li>
            <li>Post</li>
            <li>Login</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Header'

        // props: {

        // }
    }
</script>

<style scoped>

  ul {
    display: flex;
    justify-content: space-around;
  }

  li {
      color: white;
  }

</style>