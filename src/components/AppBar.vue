<template>
  <v-toolbar app class="my-0">
    <div class="flex-1-0-100 pa-0 ma-0 h-auto">
      <v-sheet class="d-flex justify-space-between flex-1-0-100">
        <v-sheet class="d-flex align-center hidden-sm-and-down">
          <v-img src="./../assets/hawe_logo.png" width="100" class="" />
          </v-sheet>
          <v-sheet class="d-flex justify-center ma-auto">
            <h2>Engineering Dashboard</h2></v-sheet
          >
        </v-sheet>
    </div>
  </v-toolbar>

</template>



<script setup>
  import { ref } from 'vue'
   const links = ref(['Home', 'About', 'Contact', 'Admin'])
</script>
