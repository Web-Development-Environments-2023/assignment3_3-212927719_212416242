<template>
  <router-link
    :to="{ name: 'recipe', params: { recipeId: id } }"
    class="recipe-preview"
    style="text-decoration: none;"
  >
    <div class="recipe">
      <div class="recipe_upper">
        <h3>{{ recipe.name }}</h3>
        <img class="main_image" :src="recipe.mainImage" />
        <img v-if="recipe.vegan" class="vegan_sign" src="../assets/vegan.png" />
        <img v-if="recipe.vegetarian" class="vegan_sign" src="../assets/no-meat.png" />
        <img v-if="recipe.glutenFree" class="vegan_sign" src="../assets/gluten-free.png" />

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
      </div>
      <div class="recipe__content">
        <header class="content__header">
          <ul class="recipe-details">
            <li class="recipe-details-item">
              <span class="value">{{ recipe.time }}</span>
              <span class="title">Minutes</span>
            </li>
            <li class="recipe-details-item">
              <span class="value">{{ recipe.ingredients.length }}</span
              ><span class="title">Ingredients</span>
            </li>
            <li class="recipe-details-item">
              <span class="value">{{ recipe.numberOfPortions }}</span>
              <span class="title">Serving</span>
            </li>
            <li class="recipe-details-item">
              <span class="value">{{ recipe.popularity }}</span>
              <span class="title">Likes</span>
            </li>
          </ul>
        </header>
        <p
          class="description"
          v-html="recipe.summary.substring(0, 120) + '...'"
        ></p>
        <footer class="content__footer"><a>View Recipe</a></footer>
        <img v-if="watched" src="../assets/eye.png" class="watched-eye" />
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
        this.favorite=false;
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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Work+Sans:wght@300;400;500;600;700&display=swap");
body {
  --headlinesFont: "Jost", sans-serif;
  --bodyFont: "Work Sans", sans-serif;
  --wildWatermelon: #ff4f87;
  --fuelYellow: #f0a035;
  --textColor: #323232;
  --bodyBg: #d6d6d6;
  --white: #fff;
  --black: #000;
}

html {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}

.recipe {
  background: var(--white);
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.326);
  overflow: hidden;
  aspect-ratio: 2/2.5;
  border-radius: 8%;
  margin-bottom: 5%;
}
.recipe_upper {
  position: relative;
  height: 35%;
  box-shadow: 0px 0px 130px 0 rgba(0, 0, 0, 0.38);
}

.recipe .recipe_upper #close-modal:hover {
  background: transparent;
  color: var(--black);
}
.recipe .recipe_upper h3 {
  text-align: center;
  position: absolute;
  margin: 0;
  width: 100%;
  color: var(--white);
  font-family: var(--headlinesFont);
  font-size: 1.1vw;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.651), transparent);
  padding: 1rem 0 0;
}
.recipe .main_image {
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: 50% 50%;
  object-position: 50% 50%;
}
.recipe__content {
  height: 70%;
  flex: 1;
  padding-inline: 10%;
}
.recipe .recipe__content .content__header .row-wrapper {
  display: flex;
  padding: 0.55em 0 0.3em;
  border-bottom: 1px solid #d8d8d8;
}
.recipe .recipe__content .content__header .row-wrapper .recipe-title {
  font-family: var(--headlinesFont);
  font-weight: 600;
}
.recipe .recipe__content .content__header .recipe-details {
  display: flex;
  list-style: none;
  padding: 1.4em 0 1em;
  margin: 0;
  justify-content: space-between;
}

.recipe
  .recipe__content
  .content__header
  .recipe-details
  .recipe-details-item
  .value {
  color: #4fcaff;
  vertical-align: bottom;
  font-size: 1.3vw;
  font-weight: 600;
  margin: 0 auto;
  display: table;
}
.recipe
  .recipe__content
  .content__header
  .recipe-details
  .recipe-details-item
  .title {
  display: block;
  margin-top: -4px;
  font-family: var(--headlinesFont);
  font-size: 0.9vw;
  font-weight: 300;
}
.recipe .recipe__content .description {
  margin: 0.3em 0 1.8em;
}
.description {
  font-size: 1 vw;
}
.recipe .recipe__content .content__footer {
  text-align: center;
  margin: 0 3rem;
}
.recipe .recipe__content .content__footer a {
  font-family: var(--headlinesFont);
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
.recipe .recipe__content .content__footer a:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 34px 0 rgba(43, 100, 255, 0.34);
}

.vegan_sign {
  --size: 10%;
  width: 10%;
  margin-top: calc(var(--size) * -2);
  margin-left: 2%;
}

.favorite {
  width: 10%;
  right: 0%;
  position: absolute;
  rotate: 180deg;
  bottom: 0%;
}

.watched-eye {
  position: absolute;
  bottom: 6%;
  right: 8%;
  width: 9%;
  opacity: 0.15;
}
</style>
