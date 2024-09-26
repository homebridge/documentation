<template>
  <div class="container">
    <h1>Homebridge Plugins</h1>
    <div class="filters">
      <!-- Existing filters -->
      <label>Name: <input v-model="filters.name" placeholder="Filter by name" /></label>
      <label>Description: <input v-model="filters.description" placeholder="Filter by description" /></label>
      <label>Version: <input v-model="filters.version" placeholder="Filter by version" /></label>
      <label>Owner: <input v-model="filters.owner" placeholder="Filter by owner" /></label>
      <label>Downloads: 
        <select v-model="downloadsComparison">
          <option value="equal">=</option>
          <option value="greater">></option>
          <option value="less">&lt;</option>
        </select>
        <input v-model.number="filters.downloads" placeholder="Filter by downloads" />
      </label>
      <label>Created: 
        <select v-model="createdComparison">
          <option value="after">After</option>
          <option value="before">Before</option>
        </select>
        <input type="date" v-model="filters.created" />
      </label>
      <label>Last Updated: 
        <select v-model="lastUpdatedComparison">
          <option value="after">After</option>
          <option value="before">Before</option>
        </select>
        <input type="date" v-model="filters.lastUpdated" />
      </label>
      <label>Engine Node: <input v-model="filters.node" placeholder="Filter by engine node" /></label>
      <label>Engine Homebridge: <input v-model="filters.homebridge" placeholder="Filter by engine homebridge" /></label>
      <label>Homebridge 2.0 Ready: 
        <select v-model="filters.homebridgeCompatibility">
          <option value="">All</option>
          <option value="supported">Supported</option>
          <option value="not ready">Not Ready</option>
        </select>
      </label>

      <!-- New Verified filter -->
      <label>Verified: 
        <select v-model="filters.verified">
          <option value="">All</option>
          <option value="true">Verified</option>
          <option value="false">Not Verified</option>
        </select>
      </label>

      <button @click="resetFilters">Reset Filters</button>
    </div>

    <div class="summary">
      <p>Results Found: {{ filteredPlugins.length }}</p>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <!-- Existing columns -->
            <th :class="getHeaderClass('name')" @click="sortTable('name')">Name</th>
            <th :class="getHeaderClass('description')" @click="sortTable('description')">Description</th>
            <th :class="getHeaderClass('version')" @click="sortTable('version')">Version</th>
            <th :class="getHeaderClass('owner')" @click="sortTable('owner')">Owner</th>
            <th :class="getHeaderClass('downloads')" @click="sortTable('downloads')">Downloads</th>
            <th :class="getHeaderClass('created')" @click="sortTable('created')">Created</th>
            <th :class="getHeaderClass('lastUpdated')" @click="sortTable('lastUpdated')">Last Updated</th>
            <th :class="getHeaderClass('engines.node')" @click="sortTable('engines.node')">Engine Node</th>
            <th :class="getHeaderClass('engines.homebridge')" @click="sortTable('engines.homebridge')">Engine Homebridge</th>
            <th :class="getHeaderClass('homebridgeCompatibility')" @click="sortTable('homebridgeCompatibility')">Homebridge 2.0 Ready</th>
            <th :class="getHeaderClass('latestRelease')" @click="sortTable('latestRelease')">Latest Release</th>

            <!-- New "Verified" column -->
            <th :class="getHeaderClass('verified')" @click="sortTable('verified')">Verified</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="plugin in sortedPlugins" :key="plugin.name" @click="selectPlugin(plugin)">
            <!-- Existing columns -->
            <td><a :href="'https://www.npmjs.com/package/' + plugin.name" target="_blank">{{ plugin.name }}</a></td>
            <td>{{ plugin.description }}</td>
            <td>{{ plugin.version }}</td>
            <td>{{ plugin.owner }}</td>
            <td>{{ plugin.downloads }}</td>
            <td>{{ new Date(plugin.created).toLocaleDateString() }}</td>
            <td>{{ new Date(plugin.lastUpdated).toLocaleDateString() }}</td>
            <td>{{ plugin.engines.node }}</td>
            <td>{{ plugin.engines.homebridge }}</td>
            <td>{{ isHomebridgeCompatible(plugin) }}</td>
            <td>{{ plugin.latestRelease }}</td>

            <!-- New "Verified" column -->
            <td>{{ plugin.verified ? 'Verified' : 'Not Verified' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    plugins: Array
  },
  data() {
    return {
      filters: {
        name: "",
        description: "",
        version: "",
        owner: "",
        downloads: "",
        created: "",
        lastUpdated: "",
        node: "",
        homebridge: "",
        homebridgeCompatibility: "",
        verified: "" // New verified filter
      },
      downloadsComparison: 'equal',
      createdComparison: 'after',
      lastUpdatedComparison: 'after',
      sortKey: null,
      sortOrder: 'asc'
    };
  },
  computed: {
    filteredPlugins() {
      return this.plugins.filter(plugin => {
        const downloadsValid = this.filters.downloads !== "" && this.filters.downloads !== undefined;
        const downloadsCondition = downloadsValid ? 
          (this.downloadsComparison === 'greater' ? plugin.downloads > this.filters.downloads :
          this.downloadsComparison === 'less' ? plugin.downloads < this.filters.downloads :
          plugin.downloads === this.filters.downloads) : true;

        const createdValid = this.filters.created && this.filters.created !== "";
        const createdCondition = createdValid ?
          (this.createdComparison === 'after' ? new Date(plugin.created) > new Date(this.filters.created) :
          this.createdComparison === 'before' ? new Date(plugin.created) < new Date(this.filters.created) : true) : true;

        const lastUpdatedValid = this.filters.lastUpdated && this.filters.lastUpdated !== "";
        const lastUpdatedCondition = lastUpdatedValid ?
          (this.lastUpdatedComparison === 'after' ? new Date(plugin.lastUpdated) > new Date(this.filters.lastUpdated) :
          this.lastUpdatedComparison === 'before' ? new Date(plugin.lastUpdated) < new Date(this.filters.lastUpdated) : true) : true;

        const nodeCondition = this.filters.node === "" || (plugin.engines.node && plugin.engines.node.toLowerCase().includes(this.filters.node.toLowerCase()));
        const homebridgeCondition = this.filters.homebridge === "" || (plugin.engines.homebridge && plugin.engines.homebridge.toLowerCase().includes(this.filters.homebridge.toLowerCase()));
        
        const compatibilityCondition = this.filters.homebridgeCompatibility === "" || 
          (this.isHomebridgeCompatible(plugin) === this.filters.homebridgeCompatibility);

        // New verified condition
        const verifiedCondition = this.filters.verified === "" || (plugin.verified === (this.filters.verified === "true"));

        return (
          (this.filters.name === "" || (plugin.name && plugin.name.toLowerCase().includes(this.filters.name.toLowerCase()))) &&
          (this.filters.description === "" || (plugin.description && plugin.description.toLowerCase().includes(this.filters.description.toLowerCase()))) &&
          (this.filters.version === "" || (plugin.version && plugin.version.toLowerCase().includes(this.filters.version.toLowerCase()))) &&
          (this.filters.owner === "" || (plugin.owner && plugin.owner.toLowerCase().includes(this.filters.owner.toLowerCase()))) &&
          downloadsCondition &&
          createdCondition &&
          lastUpdatedCondition &&
          nodeCondition &&
          homebridgeCondition &&
          compatibilityCondition &&
          verifiedCondition // Added to the filters
        );
      });
    },
    sortedPlugins() {
      let sorted = [...this.filteredPlugins];

      if (this.sortKey) {
        sorted.sort((a, b) => {
          const aValue = this.getSortValue(a);
          const bValue = this.getSortValue(b);

          if (this.sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });
      }

      return sorted;
    }
  },
  methods: {
    selectPlugin(plugin) {
      // Action when selecting a plugin
    },
    resetFilters() {
      this.filters = {
        name: "",
        description: "",
        version: "",
        owner: "",
        downloads: "",
        created: "",
        lastUpdated: "",
        node: "",
        homebridge: "",
        homebridgeCompatibility: "",
        verified: "" // Reset verified filter
      };
    },
    sortTable(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
    },
    isHomebridgeCompatible(plugin) {
      const hbEngines = plugin.engines?.homebridge?.split('||').map((x) => x.trim()) || [];
      return hbEngines.some((x) => (x.startsWith('^2') || x.startsWith('>=2'))) ? 'supported' : 'not ready';
    },
    getSortValue(plugin) {
      const keys = this.sortKey.split(".");
      let value = plugin;
      keys.forEach(key => {
        value = value[key];
      });
      return value;
    },
    getHeaderClass(key) {
      return {
        active: this.sortKey === key,
        asc: this.sortKey === key && this.sortOrder === 'asc',
        desc: this.sortKey === key && this.sortOrder === 'desc'
      };
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers the container content horizontally */
  margin: 0 auto;
  width: 100%; /* Ensures the container takes the full width */
}

h1 {
  margin-bottom: 20px;
}

.table-container {
  width: 100%; /* Full width */
  display: flex; /* Flex display to help center contents */
  justify-content: center; /* Centers the table */
}

table {
  width: 80%; /* Adjust this width as needed */
  max-width: 100%; /* Ensures it does not exceed container width */
  border-collapse: collapse;
  margin: 20px 0; /* Add some margin for spacing */
}

table, th, td {
  border: 1px solid black;
}

th, td {
  padding: 8px;
  text-align: left;
  cursor: pointer;
}

th:hover {
  background-color: #f2f2f2;
}

input, select {
  margin: 5px 10px 20px 0;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centers the filters horizontally */
}

.summary {
  margin: 10px 0;
}

/* Optional: Add some styles for responsiveness */
@media (max-width: 600px) {
  table {
    width: 100%; /* Full width on smaller screens */
  }
}
</style>
