<template>
  <v-card>
    <v-card-title>
      {{ computer.name }}
      <RemoveComputer :computer="computer"/>
    </v-card-title>
    <v-card-text>
      <v-row v-for="(horaire, key) in horaires" :key="key">
       <v-col cols="2"> {{ horaire.index }}h</v-col>
        <v-col cols="8">
                <span v-if="horaire.attribution">
                    {{ horaire.attribution.name  }}
                </span>
        </v-col>
        <v-col cols="2">
          <RemoveAttribution v-if="horaire.attribution" :computer="computer" :attribution="horaire.attribution" :horaire="horaire.index" @removeAttribution="removeAttribution" />

          <AddAttribution v-if="!horaire.attribution" :computer="computer" :horaire="horaire.index" :date="date" @addAttribution="addAttribution" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import _ from 'lodash';
import AddAttribution from './AddAttribution.vue'
import RemoveAttribution from './RemoveAttribution.vue'
import RemoveComputer from './RemoveComputer.vue'

export default {
  props: {
    computer: {
      required: true
    },
    date: {
      required: true
    },
  },
  watch: {
    ordinateur: function () {
      this.initialise();
    }
  },
  components: {
     AddAttribution,
     RemoveAttribution,
    RemoveComputer
  },
  data() {
    return {
      horaires: [],
      attributions: {}
    }
  },
  created() {
     this.initialise();
  },
  computed: {
  },
  methods : {
    initialise() {
        for (let i=0; i < this.computer.Attributions.length; i++) {
          let attribution = this.computer.Attributions[i][0]
          this.attributions[attribution.hour] = {
            id: attribution.id,
            name: attribution.Customer.firstname + " " + attribution.Customer.lastname ,
          }

      }

      this.buildHoraires();
    },
    buildHoraires() {
      this.horaires = [];
      for (let i = 0; i < 10; i++) {
        this.horaires.push({
          index: i + 8,
          attribution: (typeof this.attributions[i + 8] !== 'undefined' ) ? this.attributions[i + 8] : false
        })
      }

    },
    addAttribution: function (attribution) {
      this.computer.Attributions.push(attribution)
      this.initialise();
    },
    removeAttribution: function(horaire){

      _.unset(this.attributions,horaire)
      this.buildHoraires();
    },
    removeComputer: function (){

    }
  }
}
</script>