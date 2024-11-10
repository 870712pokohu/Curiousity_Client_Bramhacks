<template>
  <v-card class="pa-5" style="min-height: 700px;">
    <div>{{survey.title}}</div>
  </v-card>
</template>


<script setup>

const props = defineProps({
  survey: Object,
});

console.log('survey', props.complaint);

</script>