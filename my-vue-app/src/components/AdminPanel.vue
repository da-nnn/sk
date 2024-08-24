<!-- src/components/AdminPanel.vue -->
<template>
    <div>
      <h2>Admin Panel</h2>
      <form @submit.prevent="uploadScholarship">
        <!-- Add form fields here -->
        <button type="submit">Upload Scholarship</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        newScholarship: {
          title: '',
          description: '',
          deadline: ''
        }
      };
    },
    methods: {
      uploadScholarship() {
        axios.post(`${process.env.VUE_APP_API_BASEURL}/api/scholarships`, this.newScholarship)
          .then(() => {
            alert('Scholarship uploaded successfully!');
            // Optionally clear form fields or perform other actions
          })
          .catch(error => {
            console.error('Error uploading scholarship:', error);
            alert('Failed to upload scholarship. Please try again.');
          });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add scoped styles here */
  </style>
  