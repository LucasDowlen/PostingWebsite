<template>
    <div>
        <ul>
            <router-link to="/" class="routerLink"> Home </router-link>
            <router-link to="/" class="routerLink" > Subreddits </router-link>
            <router-link to="/" class="routerLink" > Post </router-link>
            <router-link to="/login" class="routerLink" > Login </router-link>
            <!-- <li>Home</li>
            <li>Subreddits</li>
            <li>Post</li>
            <li>Login</li> -->
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

/* figure out if you can do this without class/id */
  .routerLink { 
      text-decoration: none;
      color: white;
  }

</style>