<template>
  <div class="container">
    <h1 class="title">Main Page</h1>

    <b-row>
      <b-col>
        <h1>Explore this recipes:</h1>
        <RecipePreviewList
          path="recipes/random?amount=3"
          class="RandomRecipes center"
          v-bind:cols="1"
          v-bind:small="true"
          ref="randomRecipes"
        />
        <b-button block pill variant="success" @click="updateRandomRecipes">
          Refresh
        </b-button>
      </b-col>
      <b-col>
        <div v-if="$root.store.username">
          <h1>Last watched recipes:</h1>
          <RecipePreviewList
            v-bind:cols="1"
            path="users/lastWatchRecipes?limit=3"
            v-bind:small="true"
            :class="{
              RandomRecipes: true,
              blur: !$root.store.username,
              center: true,
            }"
          ></RecipePreviewList>
        </div>
        <div v-if="!$root.store.username">
          <LoginPage />
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginPage from "../pages/LoginPage.vue";
export default {
  components: {
    RecipePreviewList,
    LoginPage,
  },
  methods: {
    updateRandomRecipes() {
      this.$refs.randomRecipes.updateRecipes();
    },
  },
};
</script>

<style lang="scss" scoped>
// .RandomRecipes {
//   margin: 10px 0 10px;
// }
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
