<template>
  <v-card class="rounded-lg d-flex justify-center align-center" style="min-width: 200px; min-height: 200px">
    <div class="d-flex flex-column flex-wrap align-stretch justify-center pa-5">
      <div class="text-h5">{{category.name}}</div>
      <div class="mt-3">Complaints: {{category.count}}</div>
    </div>
  </v-card>
</template>

<script setup>

const props = defineProps({
  category: Object,
});

</script>
