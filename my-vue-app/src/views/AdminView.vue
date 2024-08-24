<template>
  <div class="admin-view">
    <h1>Admin Panel</h1>
    <form @submit.prevent="saveScholarship">
      <div class="form-group">
        <label for="scholarship_id">Scholarship ID:</label>
        <input v-model="scholarship_id" type="text" id="scholarship_id" placeholder="Enter scholarship ID (for edit)" @blur="fetchScholarshipDetails">
      </div>
      <div class="form-group">
        <label for="scholarship_name">Scholarship Name:</label>
        <input v-model="scholarship_name" type="text" id="scholarship_name" placeholder="Enter scholarship name" required>
      </div>
      <div class="form-group">
        <label for="sponsor">Sponsor:</label>
        <input v-model="sponsor" type="text" id="sponsor" placeholder="Enter sponsor" required>
      </div>
      <div class="form-group">
        <label for="type">Type:</label>
        <input v-model="type" type="text" id="type" placeholder="Enter type" required>
      </div>
      <div class="form-group">
        <label for="field_of_study">Field of Study:</label>
        <select v-model="field_of_study" id="field_of_study" required>
          <option disabled value="">Select a field of study</option>
          <option>Law</option>
          <option>Social Sciences</option>
          <option>Health & Medicine</option>
          <option>Business & Economics</option>
          <option>Arts & Humanities</option>
          <option>STEM</option>
          <option>Any Field</option>
          <option>Technology</option>
          <option>Engineering</option>
          <option>Agriculture</option>
          
        </select>
      </div>
      <div class="form-group">
        <label for="award_amount">Award Amount:</label>
        <input v-model.number="award_amount" type="number" id="award_amount" placeholder="Enter award amount" required>
      </div>
      <div class="form-group">
        <label for="deadline">Deadline:</label>
        <input v-model="deadline" type="date" id="deadline" required>
      </div>
      <div class="form-group">
        <label for="more_details">More Details:</label>
        <textarea v-model="more_details" id="more_details" placeholder="Enter more details" required></textarea>
      </div>
      <div class="form-group">
        <label for="eligibility">Eligibility:</label>
        <textarea v-model="eligibility" id="eligibility" placeholder="Enter eligibility criteria" required></textarea>
      </div>
      <div class="form-group">
        <label for="scholarship_value">Scholarship Value:</label>
        <textarea v-model="scholarship_value" id="scholarship_value" placeholder="Enter scholarship value and duration" required></textarea>
      </div>
      <div class="form-group">
        <label for="eligible_expenses">Eligible Expenses:</label>
        <textarea v-model="eligible_expenses" id="eligible_expenses" placeholder="Enter eligible expenses" required></textarea>
      </div>
      <div class="form-group">
        <label for="application_process">Application Process:</label>
        <textarea v-model="application_process" id="application_process" placeholder="Enter application process" required></textarea>
      </div>
      <div class="form-group">
        <label for="supporting_documents">Supporting Documents:</label>
        <textarea v-model="supporting_documents" id="supporting_documents" placeholder="Enter supporting documents" required></textarea>
      </div>
      <div class="form-group">
        <label for="scholarship_conditions">Scholarship Conditions:</label>
        <textarea v-model="scholarship_conditions" id="scholarship_conditions" placeholder="Enter scholarship conditions" required></textarea>
      </div>
      <div class="form-group">
        <label for="key_dates">Key Dates:</label>
        <textarea v-model="key_dates" id="key_dates" placeholder="Enter key dates" required></textarea>
      </div>
      <div class="form-group">
        <label for="additional_information">Additional Information:</label>
        <textarea v-model="additional_information" id="additional_information" placeholder="Enter additional information" required></textarea>
      </div>
      <div class="form-group">
        <label for="host_country">Host Country:</label>
        <select v-model="host_country" id="host_country" required multiple>
          <option disabled value="">Select a host country</option>
          <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="eligible_country">Eligible Country:</label>
        <select v-model="eligible_country" id="eligible_country" required multiple>
          <option disabled value="">Select an eligible country</option>
          <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="host_county">Host County:</label>
        <select v-model="host_county" id="host_county" required multiple>
          <option disabled value="">Select a host county</option>
          <option v-for="county in counties" :key="county" :value="county">{{ county }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="eligible_county">Eligible County:</label>
        <select v-model="eligible_county" id="eligible_county" required multiple>
          <option disabled value="">Select an eligible county</option>
          <option v-for="county in counties" :key="county" :value="county">{{ county }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="scholarship_for">Scholarship For:</label>
        <select v-model="scholarship_for" id="scholarship_for" required>
          <option disabled value="">Select scholarship for</option>
          <option>Highschool/Secondary School</option>
          <option>Vocational Colleges</option>
          <option>Online Short Courses</option>
          <option>Short Term Courses</option>
          <option>Bootcamps/Trainings</option>
          <option>Masters</option>
          <option>Post-graduate Diplomas</option>
          <option>PhD</option>
          <option>Postdocs</option>
          <option>Fellowships</option>
          <option>Summer Schools</option>
          <option>Bachelors</option>
        </select>
      </div>
      <div class="form-group">
        <label for="apply_go_to">Apply/Go To:</label>
        <input v-model="apply_go_to" type="url" id="apply_go_to" placeholder="Enter application link" required>
      </div>
      <button type="submit">{{ isEditing ? 'Update Scholarship' : 'Add Scholarship' }}</button>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      scholarship_id: '',
      scholarship_name: '',
      sponsor: '',
      type: '',
      field_of_study: '',
      award_amount: '',
      deadline: '',
      more_details: '',
      eligibility: '',
      scholarship_value: '',
      eligible_expenses: '',
      application_process: '',
      supporting_documents: '',
      scholarship_conditions: '',
      key_dates: '',
      additional_information: '',
      host_country: [],
      eligible_country: [],
      host_county: [],
      eligible_county: [],
      scholarship_for: '',
      apply_go_to: '',
      successMessage: '',
      isEditing: false,
      countries: [ /* ... list of countries ... */  "Worldwide", "Africa", "Asia", "Australia/Oceania", "Europe", "Latin America", "North America", "South America",
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
        "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
        "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
        "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad",
        "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
        "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
        "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany",
        "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary",
        "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
        "Kazakhstan", "Kenya", "Kiribati", "Korea (North)", "Korea (South)", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos",
        "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
        "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
        "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
        "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway",
        "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
        "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
        "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
        "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
        "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
        "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
        "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
        "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia",
        "Zimbabwe" ],
      counties: [ /* ... list of Kenyan counties ... */  "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet", "Embu", "Garissa", "Homa Bay", "Isiolo", "Kajiado",
        "Kakamega", "Kericho", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni",
        "Mandera", "Marsabit", "Meru", "Migori", "Mombasa", "Mount Elgon", "Nandi", "Narok", "Nairobi","Taita Taveta"]
    };
  },
  methods: {
    fetchScholarshipDetails() {
      if (this.scholarship_id) {
        axios.get(`http://localhost:3000/api/scholarships/${this.scholarship_id}`)
          .then(response => {
            const scholarship = response.data;
            this.scholarship_name = scholarship.scholarship_name;
            this.sponsor = scholarship.sponsor;
            this.type = scholarship.type;
            this.field_of_study = scholarship.field_of_study;
            this.award_amount = scholarship.award_amount;
            this.deadline = scholarship.deadline;
            this.more_details = scholarship.more_details;
            this.eligibility = scholarship.eligibility;
            this.scholarship_value = scholarship.scholarship_value;
            this.eligible_expenses = scholarship.eligible_expenses;
            this.application_process = scholarship.application_process;
            this.supporting_documents = scholarship.supporting_documents;
            this.scholarship_conditions = scholarship.scholarship_conditions;
            this.key_dates = scholarship.key_dates;
            this.additional_information = scholarship.additional_information;
            this.host_country = scholarship.host_country;
            this.eligible_country = scholarship.eligible_country;
            this.host_county = scholarship.host_county;
            this.eligible_county = scholarship.eligible_county;
            this.scholarship_for = scholarship.scholarship_for;
            this.apply_go_to = scholarship.apply_go_to;
            this.isEditing = true;
          })
          .catch(error => {
            console.error('There was an error fetching the scholarship details!', error);
          });
      }
    },
    saveScholarship() {
      const scholarshipData = {
        scholarship_name: this.scholarship_name,
        sponsor: this.sponsor,
        type: this.type,
        field_of_study: this.field_of_study,
        award_amount: this.award_amount,
        deadline: this.deadline,
        more_details: this.more_details,
        eligibility: this.eligibility,
        scholarship_value: this.scholarship_value,
        eligible_expenses: this.eligible_expenses,
        application_process: this.application_process,
        supporting_documents: this.supporting_documents,
        scholarship_conditions: this.scholarship_conditions,
        key_dates: this.key_dates,
        additional_information: this.additional_information,
        host_country: this.host_country,
        eligible_country: this.eligible_country,
        host_county: this.host_county,
        eligible_county: this.eligible_county,
        scholarship_for: this.scholarship_for,
        apply_go_to: this.apply_go_to
      };

      if (this.isEditing) {
        axios.put(`http://localhost:3000/api/scholarships/${this.scholarship_id}`, scholarshipData)
          .then(() => {
            this.successMessage = 'Scholarship updated successfully!';
            this.resetForm();
          })
          .catch(error => {
            console.error('There was an error updating the scholarship!', error);
          });
      } else {
        axios.post('http://localhost:3000/api/scholarships', scholarshipData)
          .then(() => {
            this.successMessage = 'Scholarship added successfully!';
            this.resetForm();
          })
          .catch(error => {
            console.error('There was an error adding the scholarship!', error);
          });
      }
    },
    resetForm() {
      this.scholarship_id = '';
      this.scholarship_name = '';
      this.sponsor = '';
      this.type = '';
      this.field_of_study = '';
      this.award_amount = '';
      this.deadline = '';
      this.more_details = '';
      this.eligibility = '';
      this.scholarship_value = '';
      this.eligible_expenses = '';
      this.application_process = '';
      this.supporting_documents = '';
      this.scholarship_conditions = '';
      this.key_dates = '';
      this.additional_information = '';
      this.host_country = [];
      this.eligible_country = [];
      this.host_county = [];
      this.eligible_county = [];
      this.scholarship_for = '';
      this.apply_go_to = '';
      this.isEditing = false;
    }
  }
};
</script>

<style scoped>
.admin-view {
  max-width: 800px;
  margin: auto;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, select, textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

textarea {
  resize: vertical;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.success-message {
  color: green;
  margin-top: 10px;
}
</style>
