<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header">
        <img :src="recipe.mainImage" class="img" />
        <div class="header-text">
          <img v-if="watched" src="../assets/eye.png" class="watched-eye" />
          <h1>{{ recipe.name }}</h1>
          <div>
            <div>Ready in {{ recipe.time }} minutes</div>
            <div>Likes: {{ recipe.popularity }} likes</div>
            <div>Serving: {{ recipe.numberOfPortions }} portions</div>
            <div>{{ recipe.ingredients.length }} ingredients</div>
          </div>
          <footer class="content__footer" @click="changeFavorite">
            <a>{{ favoritText }}</a>
          </footer>
        </div>
      </div>

      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            Ingredients:
            <ingredients :ingredients="recipe.ingredients" />
          </div>
          <div class="wrapped">
            Summary:
            <div class="summary" v-html="recipe.summary"></div>
          </div>
        </div>
        <instructions :instructions="recipe.instructions[0].steps" />
      </div>
    </div>
  </div>
</template>

<script>
import ingredients from "../components/Ingredients.vue";
import instructions from "../components/Instructions.vue";
export default {
  components: {
    ingredients,
    instructions,
  },
  data() {
    return {
      recipe: null,
      id: null,
      favorite: false,
      watched: false,
    };
  },
  computed: {
    favoritText() {
      if (!this.$root.store.username) return "Login to add to favorite";
      if (this.favorite) return "Remove from favorite";
      return "Add to favorite";
    },
  },
  methods: {
    async changeFavorite() {
      if (!this.$root.store.username) {
        this.$root.toast(
          "Favorite",
          "You need to login to add to favorites",
          "warning"
        );
        this.$router.replace("/login");
        return;
      }
      if (!this.favorite) {
        try {
          const response = await this.axios.post(
            this.$root.store.server_domain + "users/addFavorite",
            {
              recipeId: this.id,
            }
          );
          if (response.status == 200) {
            this.$root.toast(
              "Favorite",
              "Added to " + this.$root.store.username + " favorites",
              "success"
            );
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          const response = await this.axios.post(
            this.$root.store.server_domain + "users/removeFavorite",
            {
              recipeId: this.id,
            }
          );
          this.$root.toast(
            "Favorite:",
            "Removed to " + this.$root.store.username + " favorites",
            "danger"
          );
        } catch (e) {
          console.log(e);
        }
      }
      this.favorite = !this.favorite;
    },
  },
  async created() {
    try {
      let middle = this.$route.params.recipeId.toString().includes("_")
        ? "users"
        : "recipes";
      let response;
      try {
        response = await this.axios.get(
          this.$root.store.server_domain + middle + "/singlerecipe",
          {
            params: { recipeid: this.$route.params.recipeId },
          }
        );

        if (response.status !== 200) {
          this.$root.toast("Error:", "Recipe not found", "primary");
          this.$router.replace("/NotFound");
        }
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      this.id = response.data.id;
      this.recipe = response.data.recipe;
    } catch (error) {
      console.log(error);
    }
    if (this.$root.store.username) {
      let response;
      try {
        response = await this.axios.get(
          this.$root.store.server_domain + "users/isWatched",
          {
            params: { recipe_id: this.$route.params.recipeId },
          }
        );
        this.watched = response.data;
      } catch (e) {
        console.log(e);
      }
      try {
        response = await this.axios.get(
          this.$root.store.server_domain + "users/isFavorite",
          {
            params: { recipe_id: this.$route.params.recipeId },
          }
        );
        this.favorite = response.data;
      } catch (e) {
        console.log(e);
      }
      try {
        response = await this.axios.post(
          this.$root.store.server_domain + "users/addWatched",
          { recipeId: this.$route.params.recipeId }
        );
      } catch (e) {}
    }
  },
};
</script>

<style scoped>
.img {
  width: 70%;
}

.wrapper {
  display: flex;
}

.wrapped {
  position: relative;
  width: 100%;
}

.recipe-header {
  display: flex;
}

.header-text {
  padding: 5%;
  background-color: #5ea7c7;
  color: white;
  position: relative;
}

.recipe-body {
  margin-top: 5%;
}

.summary {
  background-color: white;
  font-family: "Gloria Hallelujah", cursive;
  box-shadow: 0.25rem 0.25rem 0.75rem rgb(0 0 0 / 0.15);
  padding: 4%;
  overflow: hidden;
  height: 100%;
  position: absolute;
  margin-top: 5%;
}

.content__footer {
  margin-top: 5%;
  text-align: center;
  cursor: pointer;
}

.content__footer a {
  display: inline-block;
  background: #4fcaff;
  padding: 0.45em 1em;
  width: 100%;
  text-align: center;
  border-radius: 5px;
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.2px;
  font-size: 17px;
  transition: transform 250ms ease, box-shadow 250ms ease;
  text-decoration: none;
}

.content__footer a:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 34px 0 rgba(43, 100, 255, 0.34);
}

.watched-eye {
  position: absolute;
  top: 0;
  right: 2%;
  width: 6%;
}
</style>
