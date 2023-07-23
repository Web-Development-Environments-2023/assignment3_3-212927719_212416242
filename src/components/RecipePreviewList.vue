<template>
  <b-container>
    <div v-if="!loading">
      <b-row v-if="recipes.length > 0">
        <b-col :cols="columnSize" v-for="r in recipes" :key="r.id">
          <RecipePreview
            v-if="!small"
            class="recipePreview"
            :recipe="r.recipe"
            :id="r.id"
          />
          <RecipePreviewSmall
            v-if="small"
            class="recipePreview"
            :recipe="r.recipe"
            :id="r.id"
          />
        </b-col>
      </b-row>
      <h1 v-if="recipes.length == 0">No recipes to show</h1>
    </div>
    <div v-if="loading" style="display: flex; align-items: center;">
      <b-spinner type="grow" label="Spinning"></b-spinner>
      <h1>Loading...</h1>
    </div>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import RecipePreviewSmall from "./RecipePreviewSmall.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
    RecipePreviewSmall,
  },
  computed: {
    columnSize() {
      return 12 / this.cols;
    },
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    orderBy: {
      type: String,
    },
    cols: {
      type: Number,
      default: 3,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      recipes: [],
      loading: false,
    };
  },
  mounted() {
    this.updateRecipes();
  },
  watch: {
    path: function() {
      this.updateRecipes();
    },
    orderBy: function() {
      this.orderByFunc();
    },
  },
  methods: {
    async updateRecipes() {
      this.loading = true;
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + this.path
        );

        console.log(response);
        const recipes = response.data.recipes;
        // const recipes = tempData.getrecipes();
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
      this.orderByFunc();
      this.loading = false;
    },
    orderByFunc() {
      if (this.orderBy) {
        console.log("in");
        this.recipes = this.recipes.sort(this.sorter);
      }
    },
    sorter(a, b) {
      console.log(this.orderBy.toLowerCase());
      return a.recipe[this.orderBy.toLowerCase()] <
        b.recipe[this.orderBy.toLowerCase()]
        ? -1
        : 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
