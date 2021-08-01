import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Posts from '../views/AddPost.vue'
import Login from '../views/Login.vue'
import PostSection from '../views/Posts.vue';
import PostView from '../views/PostView.vue';

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    component: Home
  },
  {
    path: '/posts',
    component: PostSection
  },
  {
    path: '/create-post',
    component: Posts
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/posts/:id',
    component: PostView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
