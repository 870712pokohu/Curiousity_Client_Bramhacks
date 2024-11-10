<template>
  <div
    class="bg-white pa-5 d-flex align-center font-weight-bold rounded-lg" style="min-height: 120px;">
    <img :src="adminLogo" alt="Admin Logo" class="icon me-4" />
    <div class="text-h4">
        Admin Dashboard
    </div>
  </div>
</template>

<script setup>

import adminLogo from '@/assets/adminLogo.png'

</script>

<style scoped>
.icon {
  width: 50px; /* Adjust the width as needed */
  height: 50px; /* Adjust the height as needed */
}
</style>
