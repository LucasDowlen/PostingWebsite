<template>
    <div>
        <ul>
            <router-link to="/" class="routerLink"> Home </router-link>
            <router-link to="/posts" class="routerLink" > Subreddits </router-link>
            <router-link to="/create-post" class="routerLink" > Post </router-link>
            <router-link to="/login" class="routerLink" v-if="user === ''"> Login </router-link>
            <router-link to="/login" class="routerLink" v-else> {{ user }} </router-link>
            <!-- <li>Home</li>
            <li>Subreddits</li>
            <li>Post</li>
            <li>Login</li> -->
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Header',

        props: {
          user: String,
        }
    }
</script>

<style scoped>

  ul {
    display: flex;
    justify-content: space-around;
  }

/* figure out if you can do this without class/id */
  .routerLink{ 
      text-decoration: none;
      color: white;
  }

</style>