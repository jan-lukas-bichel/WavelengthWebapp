<template>
  <v-app id="inspire">
    <!--Choose Name Overlay-->
    <v-overlay :opacity="0.9" :value="chooseNameOverlay">
      <v-form>
        <v-container>
          <v-row>
            <v-col>
              <h1>Choose your Name</h1>
              <v-text-field v-model="playerName" background-color="green" label="your name..." solo></v-text-field>
              <v-btn class="mx-8" x-large color="success" @click="confirmName">Confirm</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-overlay>

    <!--Choose Team View-->
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Choose your team</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn v-on:click.prevent="switchTeam" depressed color="green">Switch team</v-btn>
                <v-btn v-on:click.prevent="confirmTeamChoice" depressed color="green">Confirm</v-btn>
              </v-toolbar>
              <v-card-text></v-card-text>
              <v-card-actions>
                <!--CONTENT-->
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.getPlayers();
    this.subscribePlayersList();
  },

  data() {
    return {
      chooseNameOverlay: true,
      playerName: "",
      players: [],
    };
  },

  methods: {
    switchTeam() {
      axios
        .post("http://localhost:8080/api/players/switch", {
          name: this.playerName,
        })
        .then((res) => (console.log(res)))
        .catch((err) => console.log(err));
    },

    lockTeam() {
      axios
        .post("http://localhost:8080/api/players/lock", {
          name: this.playerName,
        })
        .then((res) => (console.log(res)))
        .catch((err) => console.log(err));
    },

    confirmName() {
      axios
        .post("http://localhost:8080/api/players/setName", {
          name: this.playerName,
        })
        .then((res) => (this.chooseNameOverlay = false))
        .catch((err) => console.log(err));
    },

    getPlayers() {
      axios
        .get(`http://localhost:8080/api/players/getPlayers`)
        .then((res) => (this.players = res.data.playersList))
        .catch((err) => console.log(err));
    },

    subscribePlayersList() {
      axios({
        method: "get",
        url: "http://localhost:8080/api/players/subscribe",
        timeout: 10000,
      })
        .then(function (res) {
          this.players = res.data.playersList;
          this.subscribePlayersList();
        })
        .catch(function (err) {
          this.subscribePlayersList();
        });
    },
  },
};
</script>
