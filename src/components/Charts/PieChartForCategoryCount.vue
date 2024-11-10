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
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register the necessary components with Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);


  const props = defineProps({
    categories: Object,
  })

  const emit = defineEmits(['segment-clicked']);


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
      datalabels: {
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          const percentage = (value / total * 100).toFixed(2) + '%';
          return percentage;
        },
        color: '#fff',
        font: {
          size: 20,
          weight: 'bold',
        },
      },
    },
    onClick: (event, elements) => {
      console.log(elements)
    if (elements.length > 0) {
      const chart = elements[0].chart;
      const index = elements[0].index;
      emit('segment-clicked', index);
    }
    else{
      emit('segment-clicked', null);
    }
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
