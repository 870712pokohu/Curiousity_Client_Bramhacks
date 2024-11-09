<template>
  <v-card class="rounded-lg d-flex algin-center justify-center" style="min-width: 300px; min-height: 300px">
    <div class="d-flex flex-column flex-wrap align-stretch justify-center pa-5">
      <div class="text-h5">{{complaint.title}}</div>
      <div class="mt-2 text-subtitle-1">{{complaint.description}}</div>
    </div>
  </v-card>
</template>

<script setup>

const props = defineProps({
  complaint: Object,
});

</script>
