import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Game from '../views/Game.vue'
import Lobby from '../views/Lobby.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Game',
      name: 'Game',
      component: Game,
    },
    {
      path: '/Lobby',
      name: 'Lobby',
      component: Lobby,
    },
  ]
})