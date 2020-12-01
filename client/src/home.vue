<template>
  <div>
    <v-app>
      <v-container>
        <v-row>
          <v-col cols="12" sm="8" md="4">
            <v-menu v-model="menuDate" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="date" label="Saisir une date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="date" @change="initialize" @input="menuDate = false" locale="fr-fr"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <AddComputer @add="addComputer"/>
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="(computer, key) in computers" :key="key">
            <Computer :computer="computer" :date="date"/>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import Computer from './components/Computer.vue'
import AddComputer from './components/AddComputer.vue'
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    Computer,
    AddComputer
  },
  data() {
    return {
      computers: [],
      date: new Date().toISOString().substr(0, 10),
      menuDate: false,
    }
  },

  computed: {},
  created() {
    this.initialize();
  },

  methods: {
    initialize: function () {
      this.computers = [];
      axios.get('http://127.0.0.1:3000/api/computers', /*{params: {date: this.date}}*/)
          .then(({data}) => {
            this.computers = data;
            console.log("recupération des ordis", data)
          }).catch(error => {
        console.log(error);
      });
    },
    addComputer: function (computer) {
      this.computers.push(computer);
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>