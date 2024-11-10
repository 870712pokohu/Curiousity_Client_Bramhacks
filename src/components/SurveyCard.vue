<template>
  <v-card class="rounded-lg d-flex justify-center align-center" style="min-width: 200px; min-height: 40px; background-color: #FFECB3;">
    <div class="d-flex flex-column flex-wrap align-stretch justify-center pa-5" >
      <div class="text-h5">{{survey.name}}</div>
    </div>
  </v-card>
</template>

<script setup>

const props = defineProps({
  survey: Object,
});

</script>