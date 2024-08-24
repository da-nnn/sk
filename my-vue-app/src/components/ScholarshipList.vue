<!-- src/components/ScholarshipList.vue -->
<template>
  <div>
    <h2>Scholarships</h2>
    <ul>
      <li v-for="scholarship in scholarships" :key="scholarship.id">
        <router-link :to="'/scholarships/' + scholarship.id">
          {{ scholarship.title }} - {{ scholarship.deadline }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      scholarships: []
    };
  },
  created() {
    this.fetchScholarships();
  },
  methods: {
    fetchScholarships() {
      axios.get(`${process.env.VUE_APP_API_BASEURL}/api/scholarships`)
        .then(response => {
          this.scholarships = response.data;
        })
        .catch(error => {
          console.error('Error fetching scholarships:', error);
        });
    }
  }
};
</script>

<style scoped>
/* Add scoped styles here */
</style>
