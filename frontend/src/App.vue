<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>On a Scale of Ten: The Game</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn light>
        <router-link to="/lobby">Lobby</router-link>
      </v-btn>
      <v-btn light>
        <router-link to="/game">Game</router-link>
      </v-btn>
    </v-app-bar>
    <router-view></router-view>
  </v-app>
</template>