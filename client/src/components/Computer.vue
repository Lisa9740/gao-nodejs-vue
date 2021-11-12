<template>
  <v-card>
    <v-card-title>
      {{ computer.name }}
      <RemoveComputer :computer="computer" @remove="removeComputer"/>
      <EditComputer :computer="computer" @edit="editComputer"/>
    </v-card-title>
    <v-card-text>
      <v-row v-for="(hourSlot, key) in hourSlots" :key="key">
       <v-col cols="2"> {{ hourSlot.index }}h</v-col>
        <v-col cols="8">
          <span v-if="hourSlot.attribution">
            {{ hourSlot.attribution.name  }}
          </span>
        </v-col>
        <v-col cols="2">
          <RemoveAttribution v-if="hourSlot.attribution" :computer="computer" :attribution="hourSlot.attribution" :horaire="hourSlot.index" @removeAttribution="removeAttribution"/>
          <AddAttribution v-if="!hourSlot.attribution" :computer="computer" :horaire="hourSlot.index" :date="date" @addAttribution="addAttribution" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script src="./computer.js"></script>
