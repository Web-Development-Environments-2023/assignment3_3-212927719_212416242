<template>
    <div class="container">
        <h1 class="title">My Recipes</h1>
        <RecipePreviewList path="users/myRecipes" v-if="$root.store.username"/>

    </div>
</template>
  
<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
    components: {
        RecipePreviewList
    }
};
</script>
  
<style lang="scss" scoped></style>