<template>
  <router-link
    :to="{ name: 'recipe', params: { recipeId: id } }"
    class="recipe-preview"
    style="text-decoration: none;"
  >
    <div class="container_recipe">
      <img :src="recipe.mainImage" class="main_image" />

      <div class="vegan_group">
        <img v-if="recipe.vegan" class="vegan_sign" src="../assets/vegan.png" />
        <img
          v-if="recipe.vegetarian"
          class="vegan_sign"
          src="../assets/no-meat.png"
        />
        <img
          v-if="recipe.glutenFree"
          class="vegan_sign"
          src="../assets/gluten-free.png"
        />
      </div>

      <img
        @click="addToFavorite"
        v-if="!favorite"
        class="favorite"
        src="../assets/favorite-not-selected.png"
      />
      <img
        @click="removeFromFavorite"
        v-if="favorite"
        class="favorite"
        src="../assets/favorite-selected.png"
      />
      <img v-if="watched" src="../assets/eye.png" class="watched-eye" />

      <div class="container__text">
        <h1>{{ title }}</h1>
        <p v-html="recipe.summary.substring(0, 120) + '...'"></p>
        <div class="container__text__timing">
          <div class="container__text__timing_time">
            <p>{{ recipe.time }}</p>
            <h2>Minutes</h2>
          </div>
          <div class="container__text__timing_time">
            <p>{{ recipe.ingredients.length }}</p>
            <h2>Ingredients</h2>
          </div>
          <div class="container__text__timing_time">
            <p>{{ recipe.numberOfPortions }}</p>
            <h2>Serving</h2>
          </div>
          <div class="container__text__timing_time">
            <p>{{ recipe.popularity }}</p>
            <h2>Likes</h2>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  data() {
    return {
      image_load: true,
      watched: false,
      favorite: false,
    };
  },
  computed: {
    title() {
      if (this.recipe.name.length > 55)
        return this.recipe.name.substring(0, 55) + "...";
      return this.recipe.name;
    },
  },
  methods: {
    async addToFavorite(event) {
      event.preventDefault();
      if (!this.$root.store.username) {
        this.$root.toast(
          "Favorite",
          "You need to login to add to favorites",
          "warning"
        );
        this.$router.replace("/login");
        return;
      }

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
          this.favorite = true;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async removeFromFavorite(event) {
      event.preventDefault();
      if (!this.$root.store.username) {
        this.$root.toast(
          "Favorite",
          "You need to login to add to favorites",
          "warning"
        );
        this.$router.replace("/login");
        return;
      }
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
        this.favorite = false;
      } catch (e) {
        console.log(e);
      }
    },
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  async created() {
    if (this.$root.store.username) {
      let response;
      try {
        response = await this.axios.get(
          this.$root.store.server_domain + "users/isWatched",
          {
            params: { recipe_id: this.id },
          }
        );
        console.log(response);
        this.watched = response.data;
      } catch (e) {
        console.log(e);
      }
      try {
        response = await this.axios.get(
          this.$root.store.server_domain + "users/isFavorite",
          {
            params: { recipe_id: this.id },
          }
        );
        this.favorite = response.data;
      } catch (e) {
        console.log(e);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #fff;
$border-radius: 5%;
$black-color: #4fcaff;

.main_image {
  width: 35%;
  border-radius: $border-radius 0 0 $border-radius;
  object-fit: cover;
}
.watched-eye {
  position: absolute;
  left: 8%;
  width: 6%;
}
.vegan_group {
  position: absolute;
  left: 2%;
  bottom: 2%;
}

.vegan_sign {
  width: 5%;
  margin-right: 8px;
}

.favorite {
  width: 6%;
  top: 0%;
  position: absolute;
}

.container_recipe {
  position: relative;
  display: flex;
  background-color: $primary-color;
  border-radius: 2%;
  box-shadow: 0px 14px 20px 0px rgba(0, 0, 0, 0.356);
  margin-bottom: 5%;
  height: 250px;

  .btn {
    position: absolute;
    bottom: -5%;
    right: -4%;
    display: flex;
    background-color: $black-color;
    color: #fff;
    padding: 2% 5%;
    font-size: 0.7rem;
    text-transform: uppercase;
    border-radius: 25%;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.294);
    i {
      margin-left: 20px;
      font-size: 1.5rem;
    }
  }
}
.container__text {
  width: 65%;
  padding: 2% 5% 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  h1 {
    color: $black-color;
    font-weight: 1000;
    font-size: x-large;
  }
  p {
    color: black;
    font-size: 0.8rem;
  }
  .container__text__timing {
    display: flex;
    margin: 20px 0 10px;
    .container__text__timing_time {
      margin-right: 40px;
    }
    h2 {
      margin-bottom: 2%;
      font-size: 0.6rem;
      font-weight: 400;
      color: #818189;
    }
    p {
      color: $black-color;
      font-weight: bold;
      font-size: 0.9rem;
      text-align: center;
    }
  }
}
</style>
