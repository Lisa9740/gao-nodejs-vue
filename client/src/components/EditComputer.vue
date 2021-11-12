<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" @click="init">
        <v-icon color="green" small>mdi-border-color</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        Changer nom du poste : {{ computer.name }}
        <v-spacer></v-spacer>
        <v-btn icon @click="ajouter = true" color="success">
          <v-icon>mdi-border-color</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="name" :placeholder="computer.name" color="success" label="Nom : " required />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined color="red" text @click="dialog = false">Annuler</v-btn>
        <v-btn outlined color="success" @click="edit"  class="mr-2">Modifier</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script src="./editComputer.js">
</script>
