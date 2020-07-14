<template>
  <v-app id="inspire">
    <!--Choose Scale Overlay-->
    <v-overlay :opacity="0.9" :value="chooseScaleOverlay">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <h1 class="my-10">Choose your Scale</h1>
        </v-row>
        <v-row align="center" justify="center">
          <v-btn class="mx-8" x-large color="success" @click="chooseScaleOverlay = false" >Option 1</v-btn>
          <v-btn class="mx-8" x-large color="success" @click="chooseScaleOverlay = false">Option 2</v-btn>
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
              <v-btn class="mx-8" x-large color="success" @click="chooseWordOverlay = false" >Enter Word</v-btn>
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
                <v-toolbar-title>On a Scale of Ten</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn depressed color="green">Confirm your Choice</v-btn>
              </v-toolbar>
              <v-card-text>
                <v-icon>mdi-account</v-icon>
              </v-card-text>
              <v-card-actions>
                <v-slider
                  prepend-icon="mdi-numeric-0-box"
                  append-icon="mdi-numeric-10-box"
                  v-model="guess"
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
export default {

  data: () => ({
    chooseScaleOverlay: true,
    chooseWordOverlay: true,
    guess: 50
  }),

  props: {
    source: String
  }
};
</script>
