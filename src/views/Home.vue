<template>
    <div>
        <h1>Home</h1>

        <router-link v-if="user === ''" to="/login" class="loginLink">Login</router-link>
        <h2 v-else> You Are Logged In </h2>
    </div>
</template>

<script>
    export default {
        name: 'home',

        props: {
            user: String
        }
    }
</script>

<style scoped>

    h1 {
        margin-top: 5vw;
        text-align: center;
        color: white;
    }

    h2 {
        color: white;
        text-align: center;
    }

    .loginLink {
        color: white;
        font-size: 1.6vw;
        width: 8vw;
        height: 1.4vw;
        display: block;
        margin: 5vw auto 0 auto;
        text-align: center;
    }

</style>