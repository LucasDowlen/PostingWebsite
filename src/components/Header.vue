<template>
    <div>
        <ul>
            <router-link to="/" class="routerLink"> Home </router-link>
            <router-link to="/posts" class="routerLink" > Subreddits </router-link>
            <router-link to="/create-post" class="routerLink" > Post </router-link>

            <div class="routerLink" v-if="user === ''" @click="this.Login"> Login </div>
            <div class="routerLink" v-else> {{ user }} </div>

            <div class="routerLink" @click="this.CreateAccount" v-if="user === ''"> Sign Up </div>
            <div v-else class="routerLink"> Sign Out </div>
            <!-- create signout function -->

            <!-- <li>Home</li>
            <li>Subreddits</li>
            <li>Post</li>
            <li>Login</li> -->
        </ul>

        <Login v-if="loggingIn" class="loginComponent"> Login </Login>
        <CreateAccount v-if="creatingAccount" class="newAccountComponent"> Sign Up </CreateAccount>
    </div>
</template>

<script>

//user not updating...

  import Login from './Login.vue';
  import CreateAccount from './CreateAccount.vue';

  export default {

      props: {
        user: String,
      },

      data() {
        return {
          creatingAccount: false,
          loggingIn: false
        }
      },

      components: {
        Login,
        CreateAccount
      },

      methods: {
        CreateAccount() {
          this.loggingIn = false;
          this.creatingAccount = true;
        },

        Login() {
          this.creatingAccount = false;
          this.loggingIn = true;

          console.log(this);
        }
      },

      mounted() {
        // let _this = this;
        // console.log(document.getElementsByClassName(".loginComponent") + " LC");
        // console.log(loginComponent.length);

        window.addEventListener('mousedown', (event) => {

          // console.log(document.getElementsByClassName("loginComponent")[0]);
          // console.log(event.target.closest('.loginComponent'));
          // console.log(this + " ?");
          // console.log(_this + " - " + this + " - " + this.loggingIn + " - " + _this.loggingIn);

          console.log(document.getElementsByClassName("loginComponent")[0] + " LI");

          if(event.target.closest(".loginComponent") !== document.getElementsByClassName("loginComponent")[0]) {
            this.loggingIn = false;
          }

          if(event.target.closest(".newAccountComponent") !== document.getElementsByClassName('newAccountComponent')[0]) {
            this.creatingAccount = false;
          }
        });
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