
<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon color="red" small>mdi-minus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        {{ computer.name }} : Suppression d'un ordinateur
      </v-card-title>
      <v-card-text>
        <v-container>
                <span>
                    Souhaitez vous supprimer l'attribution de l'ordinateur
                    {{ computer.name }}?
                </span>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined text @click="dialog = false">Non</v-btn>
        <v-btn outlined color="red" @click="supprimer" class="mr-2">Supprimer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>import axios from 'axios';

export default {
  props: {
    computer: {
      required: true
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    supprimer: function () {
      axios.post('http://127.0.0.1:3000/api/computers/remove', {
        id: this.computer.id,
      }).then(({ data }) => {
        console.log(data)
        this.dialog = false
      })
          .catch(error => {
            //TODO catch error
            console.log(error);
          });

    },
  }
}</script>