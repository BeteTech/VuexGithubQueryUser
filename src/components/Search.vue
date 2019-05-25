<template>
  <div class="jumbotron">
    <h3>
      Search Github User
    </h3>
    <div>
      <input type="text"
             placeholder="please input username..."
             v-model="searchName" />
      <button @click="search">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchName: ""
    };
  },
  methods: {
    search() {
      const searchName = this.searchName.trim();
      if (searchName) {
        this.$store.dispatch("search", searchName);
      }
    }
  }
};
</script>

<style scoped>
</style>
