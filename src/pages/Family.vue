<template>
  <div class="container">
    <h1 class="title">La Familia's recipes</h1>

        <RecipePreviewList
          path="recipes/familyRecipes"
        />
    

  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList,
  },
};
</script>

<style lang="scss" scoped>
// .RandomRecipes {
//   margin: 10px 0 10px;
// }
</style>
