<template>
  <div class="chart-container">
    <Pie :data="chartData" :options="options">
    </Pie>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);


  const props = defineProps({
    categories: Object,
  })

  const options = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 18,
          },
          padding: 20,
        },
      },
      title: {
        display: true,
        text: 'Complaints Ratios by Category',
        font: {
          size: 20,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
    },
    },
  })

  console.log('categories', props.categories);

  const chartData = computed(() => {
    return {
      labels: props.categories.map(category => category.name),
      datasets: [
        {
          backgroundColor: ['#FF9843', '#86A7FC', '#FFDD95'],
          data: props.categories.map(category => category.count)
        }
      ]
    }
  })

  console.log(chartData.value);
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%; /* Adjust the width as needed */
  height: 400px; /* Adjust the height as needed */
}
</style>
