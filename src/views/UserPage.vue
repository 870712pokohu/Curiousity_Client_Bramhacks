<template>
  <v-app id="inspire">

    <NavBar/>

    <v-app-bar
      class="px-3"
      color="grey-lighten-4"
      height="72"
      flat
    >
      <v-spacer>
        <span style="font-weight: bold;">BramEcho</span>
      </v-spacer>
    </v-app-bar>

    <v-main>
      <v-container class="chat-container pa-3" >
        <v-row
          v-for="(message, index) in messages"
          :key="`msg_${index}`"
          class="my-2"
          :class="{'justify-end': isUserMessage(index), 'justify-start': !isUserMessage(index)}">

          <v-avatar v-if="isUserMessage(index)" color="blue lighten-4" size="50" class="user-avatar">
            <v-img :src="userImage"></v-img>
          </v-avatar>

          <v-avatar v-if="!isUserMessage(index)" color="green lighten-4" size="50" class="robot-avatar">
            <v-img :src="RobotImage"></v-img>
          </v-avatar>

          <v-chip
            :color="isUserMessage(index) ? 'blue lighten-4' : '#B0BEC5'"
            class="pa-5"
            size="x-large"
            variant="flat"
            >
            <span class="overlapping-content" v-html="formatMessage(message, index)"></span>
          </v-chip>

        </v-row>
        <div v-if="isTyping">Assistant is typing...</div>
      </v-container>
    </v-main>

    <v-footer app>
      <v-form @submit.prevent="handleSubmit()" class="d-flex align-center w-100">
        <v-text-field
          class="flex-grow-1"
          v-model="questionInput"

          density="compact"
          rounded="pill"
          variant="solo-filled"
          flat
          hide-details
          placeholder="Enter the details of your complaint"
          solo
        />
        <v-btn icon @click="handleSubmit()" class="Submit">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-form>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import RobotImage from '../assets/Robot.png';
import userImage from '../assets/User.jpeg';
import NavBar from '@/components/NavBar.vue';
import { createComplaint } from '@/services/complaint.servcie';


const questionInput = ref('');
const messages = ref([]);
const responses = ref([]);
const isTyping = ref(false);

const isUserMessage = (index) => {
  // Assume first message is from the assistant
  return index % 2 !== 0;
};

const formatMessage = (message, index) => {
  // Directly return the greeting if it's the first message
  if (index === 0) {
    return `Assistant: ${message}`;
  }
  // Use adjusted index for responses since the first message has no corresponding entry in `responses`
  return isUserMessage(index) ? `User: ${message}` : `Assistant: ${responses.value[Math.floor((index - 1) / 2)]}`;
}

// Default greeting message when the component is mounted
onMounted(() => {
  const defaultGreeting = "Hello! How can I assist you today?";
  messages.value.push(defaultGreeting);
});

const handleSubmit = async () => {
  const message = questionInput.value;
  questionInput.value = ''; // Clear the input after sending
  messages.value.push(message);
  isTyping.value = true; // Start typing indication

  try {
    const result = await createComplaint(message);
    console.log(result)
    responses.value.push(result.answer);
    messages.value.push(result.answer);

    // Clear the input after sending
    questionInput.value = '';
    isTyping.value = false;
  } catch (error) {
    console.error('Error:', error);
    responses.value.push('Failed to get response');
    messages.value.push('Failed to get response'); // Display error message
  }
  isTyping.value = false; // Stop typing indication, should be set regardless of success or error
};

</script>

<style>
.user-avatar, .robot-avatar{
  margin-right: 15px;
}

.robot-avatar{
  margin-left: 15px;
}
.user-message {
  margin-right: 15px;
}


.chat-container {
  max-height: 70vh;
  overflow-y: auto;
}
</style>
