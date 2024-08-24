<template>
    <div>
      <h1>Data from Backend</h1>
      <pre>{{ data }}</pre>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        data: null,
        error: null,
      };
    },
    created() {
      axios.get('http://localhost:3000/')
        .then(response => {
          this.data = response.data;
        })
        .catch(error => {
          this.error = error;
          console.error(error);
        });
    },
  };
  </script>
  
  <style scoped>
  /* Add any necessary styles here */
  </style>
  