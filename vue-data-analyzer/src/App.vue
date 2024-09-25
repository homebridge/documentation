<template>
  <div>
    <DataTable :plugins="plugins" @select-plugin="showPluginDetails" />
  </div>
</template>

<script>
import DataTable from './components/DataTable.vue';

export default {
  components: { DataTable },
  data() {
    return {
      plugins: [],
      selectedPlugin: null
    };
  },
  mounted() {
    this.fetchPlugins();
  },
  methods: {
    async fetchPlugins() {
      try {
        const response = await fetch('/homebridge_plugins.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.plugins = await response.json();
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    },
    showPluginDetails(plugin) {
      this.selectedPlugin = plugin;
    }
  }
};
</script>

<style>
/* Add some basic styling */
table {
  width: 100%;
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid black;
}

th, td {
  padding: 8px;
  text-align: left;
}

input {
  margin-bottom: 20px;
}
</style>
