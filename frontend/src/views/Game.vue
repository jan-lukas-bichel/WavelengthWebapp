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
            @click="submitScaleChoice(scaleChoice.optionOne.index)"
          >{{this.scaleChoice.optionOne.scale}}</v-btn>
          <v-btn
            class="mx-8"
            x-large
            color="success"
            @click="submitScaleChoice(scaleChoice.optionTwo.index)"
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
              <h1>Your Word should be a {{targetNumber}} out of 100 on a Scale from "{{scale[0]}}" to "{{scale[1]}}"</h1>
              <v-text-field v-model="theWord" background-color="green" label="Input your word" solo></v-text-field>
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
              </v-card-text>
              <v-card-actions>
                <p>{{scale[0]}}</p>
                <v-slider
                  v-model="currentGuess"
                  thumb-label="always"
                  min="0"
                  max="100"
                ></v-slider>
                <p>{{scale[1]}}</p>
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
      targetNumber: 50,
      scale: [],
      scaleChoice: {
        optionOne: { scale: "wating for data..." },
        optionTwo: { scale: "wating for data..." }
      },
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
      }) <- "this" is not defined. warum geht dann mit der arrow syntax?*/
        .catch(err => console.log(err));
      this.chooseScaleOverlay = true;
    },

    submitScaleChoice(scaleIndex) {
      axios
        .post("http://localhost:8080/api/game/setScaleChoice", {
          scaleChoice: scaleIndex
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
      this.chooseScaleOverlay = false;
      this.getTargetNumber();
      this.getScale();
      this.chooseWordOverlay = true;
    },

    getTargetNumber() {
      axios
        .get(`http://localhost:8080/api/game/getNumber`)
        .then(res => (this.targetNumber = res.data.number))
        .catch(err => console.log(err));
    },

    getScale(){
      axios
        .get(`http://localhost:8080/api/game/getScale`)
        .then(res => (this.scale = res.data.scale))
        .catch(err => console.log(err));
    },

    submitWordChoice() {
      axios
        .post("http://localhost:8080/api/game/setWord", {
          word: this.theWord
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
      this.chooseWordOverlay = false;
    },
  }
};
</script>
