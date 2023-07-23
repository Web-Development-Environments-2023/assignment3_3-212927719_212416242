<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <Search @search-func="onSearch" @updateOrderBy="updateOrderBy"/>
    <div style="height: 5%;"></div>
    <RecipePreviewList
      :path="path"
      style="margin-top: 5%;"
      :orderBy="orderBy"
    />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import Search from "../components/Search.vue";
export default {
  components: {
    RecipePreviewList,
    Search
  },
  data() {
    return {
      path: '',
      // showSearch: false,
      orderBy: "Time"
    }
  },
  methods: {
    onSearch(searchValue,limit,cuisine,diet,intolerances) {
      this.sortBy="testing";
      if (searchValue) {
        this.path = `recipes/search?query=${searchValue}&limit=${limit}&cuisine=${cuisine}&diet=${diet}&intolerances=${intolerances}`
      //   this.showSearch = true;
      // } else {
      //   this.showSearch = false;
      }
    },
    updateOrderBy(newVal){
      this.orderBy = newVal;
    }
  }
}
</script>
