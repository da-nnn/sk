<template>
  <div class="scholarship-detail">
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
          <h3>Related Scholarships</h3>
          <table>
            <thead>
              <tr>
                <th>Scholarship Name</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              <!-- Populate with relevant data -->
            </tbody>
          </table>
        </section>

        <section class="sidebar-section">
          <h3>Scholarship Categories</h3>
          <select>
            <option value="">Select Category</option>
            <!-- Populate with categories -->
          </select>
        </section>

        <!-- Social Media Section -->
        <section class="sidebar-section social-media">
          <p>Follow us on:</p>
          <ul>
            <li><a href="https://www.facebook.com/scholarshipskenya" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.twitter.com/scholarshipskenya" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://www.instagram.com/scholarshipskenya" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.linkedin.com/company/scholarshipskenya" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </section>
      </div>

      <div class="main-content-area">
        <div v-if="scholarship">
          <h2>{{ scholarship.scholarship_name || 'N/A' }}</h2>
          <p><strong>Deadline:</strong> {{ formatDate(scholarship.deadline) || 'N/A' }}</p>
          <p><strong>Category:</strong> {{ scholarship.type || 'N/A' }}</p>
          <p><strong>Description:</strong> {{ scholarship.more_details || 'N/A' }}</p>

          <div class="details">
            <h3>Eligibility</h3>
            <p>{{ scholarship.eligibility || 'N/A' }}</p>

            <h3>Scholarship Value and Duration</h3>
            <p>{{ scholarship.scholarship_value || 'N/A' }}</p>

            <h3>Eligible Expenses</h3>
            <p>{{ scholarship.eligible_expenses || 'N/A' }}</p>

            <h3>Application Process</h3>
            <p>{{ scholarship.application_process || 'N/A' }}</p>

            <h3>Supporting Documents</h3>
            <p>{{ scholarship.supporting_documents || 'N/A' }}</p>

            <h3>Scholarship Conditions</h3>
            <p>{{ scholarship.scholarship_conditions || 'N/A' }}</p>

            <h3>Key Dates</h3>
            <p>{{ scholarship.key_dates || 'N/A' }}</p>

            <h3>Additional Information</h3>
            <p>{{ scholarship.additional_information || 'N/A' }}</p>

            <h3>Host Country</h3>
            <p>{{ scholarship.host_country || 'N/A' }}</p>

            <h3>Eligible Country</h3>
            <p>{{ scholarship.eligible_country || 'N/A' }}</p>

            <h3>Host County</h3>
            <p>{{ scholarship.host_county || 'N/A' }}</p>

            <h3>Eligible County</h3>
            <p>{{ scholarship.eligible_county || 'N/A' }}</p>

            <h3>Scholarship For</h3>
            <p>{{ scholarship.scholarship_for || 'N/A' }}</p>
          </div>
        </div>
        <p v-else>Loading...</p>
        <p v-if="error">{{ error }}</p>
      </div>

      <div class="right-sidebar">
        <section class="sidebar-section">
          <h3>Days Until Deadline</h3>
          <p class="countdown" v-if="scholarship">
            {{ daysUntilDeadline(scholarship.deadline) }} days remaining
          </p>
          <div class="apply-button">
            <a
              v-if="scholarship && scholarship.apply_go_to"
              :href="scholarship.apply_go_to"
              target="_blank"
              rel="noopener noreferrer"
              class="button"
            >
              Apply/Go To
            </a>
          </div>
        </section>

        <section class="sidebar-section">
          <h3>Top Rated Scholarships</h3>
          <ul>
            <li><a href="#">Scholarship A</a></li>
            <li><a href="#">Scholarship B</a></li>
            <li><a href="#">Scholarship C</a></li>
          </ul>
        </section>

        <section class="sidebar-section">
          <h3>Popular Searches</h3>
          <ul>
            <li><a href="#">Engineering Scholarships</a></li>
            <li><a href="#">Business Scholarships</a></li>
            <li><a href="#">Study Abroad Scholarships</a></li>
          </ul>
        </section>
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
  props: ['id'],
  data() {
    return {
      scholarship: null,
      error: null,
    };
  },
  watch: {
    id: 'fetchScholarship',
  },
  created() {
    this.fetchScholarship();
  },
  methods: {
    async fetchScholarship() {
      if (!this.id) {
        this.error = 'No ID provided.';
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/scholarships/${this.id}`
        );
        this.scholarship = response.data;
      } catch (error) {
        console.error('Error fetching scholarship details:', error);
        this.error = 'Failed to load scholarship details.';
      }
    },
    formatDate(date) {
      return date ? new Date(date).toLocaleDateString() : 'N/A';
    },
    daysUntilDeadline(deadline) {
      if (!deadline) return 'N/A';
      const today = new Date();
      const deadlineDate = new Date(deadline);
      const timeDiff = deadlineDate - today;
      const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return daysRemaining >= 0 ? daysRemaining : 'Deadline passed';
    },
  },
};
</script>

<style scoped>
.scholarship-detail {
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
  background-color: #34495e;
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
  padding: 20px;
  background: #ffffff;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

.main-content-area {
  flex: 3;
  padding: 20px;
  background: #ffffff;
  margin: 0 20px;
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

table,
th,
td {
  border: 1px solid #ddd;
}

th,
td {
  padding: 8px;
  text-align: left;
}

.apply-button .button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #2ecc71;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
}

.apply-button .button:hover {
  background-color: #27ae60;
}

.footer-content {
  text-align: center;
  background-color: #34495e;
  color: #ecf0f1;
  padding: 20px;
  margin-top: auto;
}

.footer-content p {
  margin: 5px 0;
}

.social-media {
  margin-top: 20px;
}

.social-media p {
  margin-bottom: 10px;
  font-weight: bold;
}

.social-media ul {
  list-style: none;
  padding: 0;
}

.social-media ul li {
  margin-bottom: 10px;
}

.social-media ul li a {
  color: #34495e;
  text-decoration: none;
  font-weight: bold;
}

.social-media ul li a:hover {
  text-decoration: underline;
}
</style>
