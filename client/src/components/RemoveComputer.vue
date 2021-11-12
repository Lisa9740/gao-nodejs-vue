
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
        <v-btn outlined color="red" @click="remove" class="mr-2">Supprimer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script src="./removeComputer.js">
</script>
