<template>
  <v-card class="pa-5" style="min-height: 700px;">
    <div>{{complaint.title}}</div>
  </v-card>
</template>


<script setup>

const props = defineProps({
  complaint: Object,
});

console.log('complaint', props.complaint);

</script>
