<template>
  <v-app id="inspire">
    <!--Choose Scale Overlay-->
    <v-overlay :opacity="0.9" :value="chooseScaleOverlay">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <h1 class="my-10">Choose your Scale</h1>
        </v-row>
        <v-row align="center" justify="center">
          <v-btn
            class="mx-8"
            x-large
            color="success"
            @click="this.submitScaleChoice(this.scaleChoice.optionOne.index)"
          >{{this.scaleChoice.optionOne.scale}}</v-btn>
          <v-btn
            class="mx-8"
            x-large
            color="success"
            @click="this.submitScaleChoice(this.scaleChoice.optionTwo.index)"
          >{{this.scaleChoice.optionTwo.scale}}</v-btn>
        </v-row>
      </v-container>
    </v-overlay>

    <!--Choose Word Overlay-->
    <v-overlay :opacity="0.9" :value="chooseWordOverlay">
      <v-form>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field background-color="green" label="Input your word" solo></v-text-field>
              <v-btn
                class="mx-8"
                x-large
                color="success"
                @click="chooseWordOverlay = false"
              >Enter Word</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-overlay>

    <!--Main App-->
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>The word is: {{this.theWord}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn v-on:click.prevent="requestWord" depressed color="green">Confirm your Choice</v-btn>
              </v-toolbar>
              <v-card-text>
                <v-icon>mdi-account</v-icon>
              </v-card-text>
              <v-card-actions>
                <v-slider
                  prepend-icon="mdi-numeric-0-box"
                  append-icon="mdi-numeric-10-box"
                  v-model="currentGuess"
                  thumb-label="always"
                  min="0"
                  max="100"
                ></v-slider>
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
    this.requestScaleChoice();
  },

  data() {
    return {
      chooseScaleOverlay: false,
      chooseWordOverlay: false,
      currentGuess: 50,
      theWord: "",
      scaleChoice: {
        optionOne: { scale: "wating for data..." },
        optionTwo: { scale: "wating for data..." }
      }
    };
  },

  props: {
    source: String
  },

  methods: {
    requestWord() {
      axios
        .get(`http://localhost:8080/api/game/getWord`)
        .then(res => (this.theWord = res.data.word))
        .catch(err => console.log(err));
    },
    requestScaleChoice() {
      axios
        .get(`http://localhost:8080/api/game/getScaleChoice`)
        .then(res => (this.scaleChoice = res.data))
        /*.then(function(res) {
        this.scaleChoice = res.data;
        this.chooseScaleOverlay = true;
      }) <- "this" is not defined. warum geht das nicht?*/
        .catch(err => console.log(err));
      this.chooseScaleOverlay = true;
    },
    submitScaleChoice(scaleIndex) {
      axios
        .post("http://localhost:8080/api/game/setScaleChoice", {
          scaleChoice: scaleIndex,
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
      this.chooseScaleOverlay = false;
    }
  }
};
</script>
