<template>
    <div>
        <div>
          <ul class="left-nav-part">
            <router-link to="/" class="routerLink"> Home </router-link>
            <router-link to="/posts" class="routerLink" > View Posts </router-link>
            <router-link to="/create-post" class="routerLink" > Create Post </router-link>
          </ul>

          <ul class="right-nav-part">
            <div class="routerLink right-nav" v-if="user === ''" @click="this.Login"> Login </div>
            <div class="routerLink right-nav" v-else> {{ user }} </div>

            <div class="routerLink" @click="this.CreateAccount" v-if="user === ''"> Sign Up </div>
            <div v-else class="routerLink"> Sign Out </div>
          </ul>
            <!-- create signout function -->

            <!-- <li>Home</li>
            <li>Subreddits</li>
            <li>Post</li>
            <li>Login</li> -->
        </div>

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


  div div {
    display: flex;
  }

  div ul {
    display: flex;
    /*justify-content: space-around;*/

    margin: 2vw 1vw;
  }

  div .left-nav-part {
    margin-left: 6vw;
  }

  div .left-nav-part .routerLink{
    margin: 0 7vw;
  }

  div .right-nav-part .right-nav{
    margin: 0 4vw 0 15vw;
  }

/* figure out if you can do this without class/id */
  .routerLink{
    padding: .2em;
    border-radius: 0.2em;
    font-size: 1.2em;
    text-decoration: none;
    color: white;
  }

  .routerLink:hover {
    background: #2c383f;
  }

</style>