<template>
  <v-app id="inspire">

    <v-navigation-drawer width="244">

      <!-- <v-sheet
        color="grey-lighten-5"
        height="128"
        width="100%"
      >
        <v-avatar
        class="d-block text-center mx-auto mt-4"
        color="grey-darken-1"
        size="70"
        >
        </v-avatar>
      </v-sheet> -->

      <v-sheet color="grey-lighten-3" height="128" width="100%">
        <v-container class="d-flex flex-column align-center justify-center" fill-height>
          <v-avatar class="mt-4" color="grey-darken-1" size="70">
            <v-img
              alt="User"
              :src="userImage"
            ></v-img>
          </v-avatar>
          <span class="text-center subtitle-1">BramHacks User</span>
        </v-container>
      </v-sheet>

      <v-list>
        <v-list-item
          title="Survey"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

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

          <v-avatar v-if="isUserMessage(index)" color="blue lighten-4" size="32" class="user-avatar">
            <v-img :src="userImage"></v-img>
          </v-avatar>

          <v-avatar v-if="!isUserMessage(index)" color="green lighten-4" size="32" class="robot-avatar">
            <v-img :src="RobotImage"></v-img> 
          </v-avatar>

          <v-chip
            :color="isUserMessage(index) ? 'blue lighten-4' : 'green lighten-4'"
            class="py-2 px-3"
            :class="{'user-message': isUserMessage(index), 'assistant-message': !isUserMessage(index)}">
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

<!-- <script setup>
  import axios from 'axios';
  import { ref } from 'vue';

  const questionInput = ref(null);
  const messages = ref([]);
  const responses = ref([]);
  const isTyping = ref(false);
  const handleSubmit = async () => {
    let message = questionInput.value; 
    messages.value.push(message);
    console.log('messages: ', messages.value)
    isTyping.value = true;
    try {
      const result = await axios.post('http://localhost:3001/api/chat', {
        message
      });
      responses.value.push(result.data.answer);
      isTyping.value = false;
    } catch (error) {
      console.error('Error:', error);
      responses.value.push('Failed to get response');
    }
  };
</script> -->

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import userImage from '../assets/User.jpeg'
import RobotImage from '../assets/Robot.png'

const questionInput = ref('');
const messages = ref([]);
const responses = ref([]);
const isTyping = ref(false);

// Helper method to check if a message is from the user
const isUserMessage = (index) => {
  return index % 2 === 0;
};

// Helper method to format messages and responses
const formatMessage = (message, index) => {
  return isUserMessage(index) ? `User: ${message}` : `Assistant: ${responses.value[Math.floor(index / 2)]}`;
};

const handleSubmit = async () => {
  const message = questionInput.value;
  messages.value.push(message);
  isTyping.value = true;
  try {
    const result = await axios.post('http://localhost:3001/api/chat', { message });
    responses.value.push(result.data.answer);
    messages.value.push(result.data.answer); // Push the response as a new message
    questionInput.value = ''; // Clear the input after sending
    isTyping.value = false;
  } catch (error) {
    console.error('Error:', error);
    responses.value.push('Failed to get response');
  }
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
  background-color: #1E88E5;
  margin-right: 15px;
}

.assistant-message {
  background-color: #BDBDBD;
}

.chat-container {
  max-height: 70vh;
  overflow-y: auto;
}
</style>
