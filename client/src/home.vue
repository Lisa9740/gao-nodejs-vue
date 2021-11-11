<template>
  <div>
    <v-app>
      <v-container>
        <v-row>
          <v-col cols="5" sm="8" md="4">
            <v-menu v-model="menuDate" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="date" label="Saisir une date" color="#3f51b5" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="date" @change="initialize" @input="menuDate = false" color="#3f51b5" locale="fr-fr"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col  >
          </v-col>
          <v-col align-self="end" class="ml-0" >
            <AddComputer @add="addComputer"/>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="(computer, key) in computers" :key="key">
            <Computer :computer="computer" :date="date" @refresh="refreshData"/>
          </v-col>
        </v-row>
        <v-row  align="center"
                justify="center">
          <template>
            <div class="text-center">
              <v-pagination
                  color="#3f51b5"
                  v-model="page"
                  :length="pageSize"
              ></v-pagination>
            </div>
          </template>
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
      page: 1,
      pageSize: null
    }
  },
  watch: {
    page: function(page) {
      this.page = page
      this.initialize();
    }
  },
  computed: {},
  created() {
    this.initialize();

  },

  methods: {
    initialize: function () {
      this.computers = [];
      axios.get('http://localhost:3000/api/computers', {params: {date: this.date, page: this.page}})
          .then(({data}) => {
            this.getPageLength()
            this.computers = data;
            console.log("recupération des ordis", data)
          }).catch(error => {
        console.log(error);
      });
    },
    getPageLength: function () {
      this.computers = [];
      axios.get('http://localhost:3000/api/computers/size')
          .then(({data}) => {
            console.log("size", data)
            this.pageSize = data;
          }).catch(error => {
        console.log(error);
      });
    },
    addComputer: function (computer) {
      this.computers.push(computer);
    },
    refreshData: function (){
      this.initialize()
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
