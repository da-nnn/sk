<!-- ScholarshipDetail.vue -->
<template>
    <div v-if="scholarship">
      <h2>{{ scholarship.title }}</h2>
      <p>{{ scholarship.description }}</p>
      <p>Deadline: {{ scholarship.deadline }}</p>
      <!-- Add more fields as needed -->
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        scholarship: null
      };
    },
    created() {
      this.fetchScholarship();
    },
    methods: {
      fetchScholarship() {
        const id = this.$route.params.id;
        axios.get(`${process.env.VUE_APP_API_BASEURL}/api/scholarships/${id}`)
          .then(response => {
            this.scholarship = response.data;
          })
          .catch(error => {
            console.error('Error fetching scholarship:', error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add scoped styles here */
  </style>
  