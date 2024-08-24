<template>
  <div class="home-view">
    <header>
      <div class="menu">
        <h1>Scholarships Kenya</h1>
        <nav>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <div class="left-sidebar">
        <section class="sidebar-section">
          <h3>Filter by Category</h3>
          <select id="category-select" v-model="selectedCategory" @change="filterScholarships">
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Engineering">Engineering</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Medical">Medical</option>
            <option value="Law">Law</option>
            <option value="Social Sciences">Social Sciences</option>
            <option value="Health & Medicine">Health & Medicine</option>
            <option value="Business & Economics">Business & Economics</option>
            <option value="Arts & Humanities">Arts & Humanities</option>
            <option value="STEM">STEM</option>
            <option value="Any Field">Any Field</option>
          </select>
        </section>

        <section class="sidebar-section">
          <h3>Search Scholarships</h3>
          <input
            type="text"
            id="search-input"
            v-model="searchTerm"
            @input="filterScholarships"
            placeholder="Search for scholarships..."
          />
        </section>
      </div>

      <div class="main-content-area">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th @click="changeSort('scholarship_name')">Name {{ sortIndicator('scholarship_name') }}</th>
              <th @click="changeSort('field_of_study')">Field of Study {{ sortIndicator('field_of_study') }}</th>
              <th @click="changeSort('deadline')">Deadline {{ sortIndicator('deadline') }}</th>
              <th @click="changeSort('eligible_country')">Eligible Country {{ sortIndicator('eligible_country') }}</th>
              <th @click="changeSort('scholarship_for')">Scholarship For {{ sortIndicator('scholarship_for') }}</th>
              <th>More Details</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(scholarship, index) in paginatedScholarships" :key="scholarship.id">
              <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td>{{ scholarship.scholarship_name }}</td>
              <td>{{ scholarship.field_of_study }}</td>
              <td>{{ formatDate(scholarship.deadline) }}</td>
              <td>{{ scholarship.eligible_country }}</td>
              <td>{{ scholarship.scholarship_for }}</td>
              <td>
                <router-link :to="{ name: 'ScholarshipDetail', params: { id: scholarship.id } }">
                  More Details
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="pagination">
          <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>

        <p v-if="!filteredScholarships.length" class="no-scholarships">No scholarships available.</p>
      </div>

      <div class="right-sidebar">
        <!-- Additional sections or widgets can be added here -->
      </div>
    </main>

    <footer>
      <div class="footer-content">
        <p>&copy; 2024 Scholarships Kenya. All rights reserved.</p>
        <p>Contact us: <a href="mailto:info@scholarshipskenya.com">info@scholarshipskenya.com</a></p>
        <p>Phone: +2547 46 776 814</p>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      scholarships: [],
      filteredScholarships: [],
      sortCriteria: 'deadline',
      sortDirection: 'asc',
      selectedCategory: '',
      searchTerm: '',
      currentPage: 1,
      itemsPerPage: 20
    };
  },
  computed: {
    sortedScholarships() {
      return this.filteredScholarships.slice().sort((a, b) => {
        if (a[this.sortCriteria] === null || b[this.sortCriteria] === null) {
          return 0;
        }

        let result = 0;
        if (this.sortCriteria === 'deadline') {
          result = new Date(a[this.sortCriteria]) - new Date(b[this.sortCriteria]);
        } else {
          result = a[this.sortCriteria].localeCompare(b[this.sortCriteria]);
        }

        return this.sortDirection === 'asc' ? result : -result;
      });
    },
    paginatedScholarships() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sortedScholarships.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.sortedScholarships.length / this.itemsPerPage);
    }
  },
  created() {
    this.fetchScholarships();
  },
  methods: {
    fetchScholarships() {
      axios.get('http://localhost:3000/api/scholarships')
        .then(response => {
          this.scholarships = response.data;
          this.filterScholarships();
        })
        .catch(error => {
          console.error('Error fetching scholarships:', error);
        });
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    filterScholarships() {
      this.filteredScholarships = this.scholarships.filter(scholarship => {
        const matchesCategory = this.selectedCategory === '' || scholarship.field_of_study === this.selectedCategory;
        const matchesSearch = scholarship.scholarship_name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                              scholarship.field_of_study.toLowerCase().includes(this.searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      });
    },
    changeSort(criteria) {
      if (this.sortCriteria === criteria) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortCriteria = criteria;
        this.sortDirection = 'asc';
      }
    },
    sortIndicator(criteria) {
      if (this.sortCriteria === criteria) {
        return this.sortDirection === 'asc' ? '▲' : '▼';
      }
      return '';
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  }
};
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(to right, #f5f5f5, #e0e0e0);
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #34495e; /* Reverted color */
  color: #ecf0f1;
  padding: 15px 30px;
  z-index: 1000;
}

.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu h1 {
  margin: 0;
  font-size: 2em;
  color: #ecf0f1;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
}

nav a {
  color: #ecf0f1;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}

main {
  display: flex;
  flex: 1;
  padding-top: 80px;
}

.left-sidebar,
.right-sidebar {
  flex: 1;
  padding: 10px;
  background: #ffffff;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

.main-content-area {
  flex: 5;
  padding: 20px;
  background: #ffffff;
  margin: 0 10px; /* Increased margin for wider content */
}

.sidebar-section {
  margin-bottom: 20px;
}

.sidebar-section h3 {
  margin-top: 0;
  color: #2c3e50;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

table, th, td {
  border: 1px solid #ddd;
}

th, td {
  padding: 10px;
  text-align: left;
}

th {
  cursor: pointer;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.countdown {
  color: red;
  font-weight: bold;
  font-size: 1.2em;
}

footer {
  background-color: #34495e; /* Reverted color */
  color: #ecf0f1;
  padding: 15px 30px;
  text-align: center;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-content p {
  margin: 5px 0;
  color: #ecf0f1;
}
</style>
