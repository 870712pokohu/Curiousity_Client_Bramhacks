<template>
 <v-card class="pa-5" style="min-height: 700px;">
    <div>{{category.name}}</div>
  </v-card>
</template>


<script setup>

const props = defineProps({
  category: Object,
});


</script>
