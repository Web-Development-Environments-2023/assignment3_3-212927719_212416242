<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <form method="dialog">
    <label>
      <input type="text" name="favAnimal" v-model="inpVal"> 
      <button type="submit" @click="onSearch">search</button>
    </label>
    </form>
    <RecipePreviewList v-if="showSearch" title="Random Recipes" :path="path" class="center"/>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      inpVal: '',
      path: '',
      showSearch: false,
    }
  },
  methods: {
    onSearch() {
      if(this.inpVal) {
        this.path = `/recipes/search?query=${this.inpVal}&limit=3`
        this.showSearch = true;
      } else {
        this.showSearch = false;
      }
    }
  }
}
</script>