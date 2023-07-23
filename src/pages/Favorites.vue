<template>
    <div class="container">
        <h1 class="title">My favorites</h1>
        <RecipePreviewList path="users/favorites" v-if="$root.store.username"/>

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