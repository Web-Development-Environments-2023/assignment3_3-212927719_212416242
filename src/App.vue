<template>
  <div id="app" class="main-div">
    <center>
      <span style="color: blue; margin:10px; font-size: 1.5vw;">{{
        username
      }}</span>
      <table>
        <tr>
          <router-link :to="{ name: 'main' }"
            ><input
              class="dropdown"
              type="checkbox"
              id="main-dropdown"
              name="dropdown"
            />
            <label class="for-dropdown" for="main-dropdown"
              >Main</label
            ></router-link
          >
          <router-link :to="{ name: 'search' }"
            ><input
              class="dropdown"
              type="checkbox"
              id="search-dropdown"
              name="dropdown"
            />
            <label class="for-dropdown" for="search-dropdown"
              >Search</label
            ></router-link
          >
          <router-link :to="{ name: 'About' }"
            ><input
              class="dropdown"
              type="checkbox"
              id="about-dropdown"
              name="dropdown"
            />
            <label class="for-dropdown" for="about-dropdown"
              >About</label
            ></router-link
          >
          <span v-if="!$root.store.username">
            <router-link :to="{ name: 'register' }"
              ><input
                class="dropdown"
                type="checkbox"
                id="main-dropdown"
                name="dropdown"
              />
              <label class="for-dropdown" for="main-dropdown"
                >Register</label
              ></router-link
            >
            <router-link :to="{ name: 'login' }"
              ><input
                class="dropdown"
                type="checkbox"
                id="main-dropdown"
                name="dropdown"
              />
              <label class="for-dropdown" for="main-dropdown"
                >Login</label
              ></router-link
            >
          </span>
          <span v-else>
            <td>
              <input
                class="dropdown"
                type="checkbox"
                id="personal-dropdown"
                name="dropdown"
              />
              <label class="for-dropdown" for="personal-dropdown"
                >Personal&#8628;</label
              >
              <div v-if="selectedOption" class="section-dropdown">
                <router-link
                  :to="{ name: 'Favorites' }"
                  style="text-decoration: none;"
                  ><input
                    class="dropdown-sub"
                    type="checkbox"
                    id="personal-about-dropdown"
                    name="dropdown-sub"
                  />
                  <label class="for-dropdown-sub" for="personal-about-dropdown"
                    >Favorites</label
                  ></router-link
                >
                <router-link
                  :to="{ name: 'MyRecipes' }"
                  style="text-decoration: none;"
                  ><input
                    class="dropdown-sub"
                    type="checkbox"
                    id="personal-main-dropdown"
                    name="dropdown-sub"
                  />
                  <label class="for-dropdown-sub" for="personal-main-dropdown"
                    >Private</label
                  ></router-link
                >
                <router-link
                  :to="{ name: 'Family' }"
                  style="text-decoration: none;"
                  ><input
                    class="dropdown-sub"
                    type="checkbox"
                    id="personal-main-dropdown"
                    name="dropdown-sub"
                  />
                  <label class="for-dropdown-sub" for="personal-main-dropdown"
                    >La Familia</label
                  ></router-link
                >
              </div>
            </td>

            <input
              class="dropdown"
              type="checkbox"
              id="main-dropdown"
              name="dropdown"
            />
            <label class="for-dropdown" @click="Logout" for="main-dropdown"
              >Logout</label
            >
            <input
              class="dropdown"
              type="checkbox"
              id="main-dropdown"
              name="dropdown"
            />
            <label
              class="for-dropdown"
              @click="ActivateNewRecipe"
              for="main-dropdown"
              >New Recipe</label
            >
            <NewRecipe ref="childComponentRef" />
          </span>
        </tr>
      </table>
    </center>

    <router-view />
    <br />
  </div>
</template>

<script>
import NewRecipe from "./pages/NewRecipe.vue";
export default {
  name: "App",
  components: {
    NewRecipe,
  },
  data() {
    return {
      selectedOption: true,
    };
  },
  computed: {
    username() {
      if (!this.$root.store.username) {
        return "hello guest";
      }
      return "hi " + this.$root.store.username + "!";
    },
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    ActivateNewRecipe() {
      this.$refs.childComponentRef.showModal();
    },
    handleScroll() {
      const scrollPosition = window.scrollY || window.pageYOffset;
      if (scrollPosition > 0) {
        this.selectedOption = false;
      } else {
        this.selectedOption = true;
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/form-style.scss";
[type="checkbox"]:checked,
[type="checkbox"]:not(:checked) {
  position: fixed;
  opacity: 0;
  pointer-events: none;
}
.main-div {
  background-image: url("https://img.freepik.com/free-vector/abstract-desktop-background-white-geometric-design-vector_53876-140225.jpg?w=2000&t=st=1690120097~exp=1690120697~hmac=f0935721fcc4c6d396fb1ab78a9fa951f5a476f3306b2036b6e71e44e1ac1a43");
}
.dropdown:checked + label:hover,
.dropdown:not(:checked) + label:hover {
  color: white;
  background-color: #218af2;
  transform: translateY(-10px);
}
.dropdown:checked + label,
.dropdown:not(:checked) + label {
  margin: 1px;
  position: relative;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 1.3vw;
  line-height: 2;
  height: 50px;
  transition: all 200ms linear;
  border-radius: 4px;
  width: 10vw;
  letter-spacing: 1px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: none;
  cursor: pointer;
  background-color: #465b63;
  color: #eef6ff;
  box-shadow: 0 12px 35px 0 rgba(255, 235, 167, 0.15);
}
.dropdown:checked + label:before,
.dropdown:not(:checked) + label:before {
  position: fixed;
  top: 0;
  left: 0;
  content: "";
  width: 100%;
  height: 100%;
  z-index: -1;
  cursor: auto;
  pointer-events: none;
}
.dropdown:checked + label:before {
  pointer-events: auto;
}

.section-dropdown {
  position: relative;
  padding: 5px;
  background-color: #465b63;
  color: #eef6ff;
  margin-top: 8px;
  width: 10vw;
  border-radius: 4px;
  display: block;
  box-shadow: 0 14px 35px 0 rgba(9, 9, 12, 0.4);
  z-index: 2;
  opacity: 0;
  position: fixed;
  pointer-events: none;
  transform: translateY(20px);
  transition: all 200ms linear;
}
.dropdown:checked ~ .section-dropdown {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}
.section-dropdown:before {
  position: absolute;
  top: -20px;
  left: 0;
  height: 20px;
  display: block;
  z-index: 1;
}
.section-dropdown:after {
  position: absolute;
  top: -8px;
  left: 4vw;
  width: 0;
  height: 0;
  border-left: 1vw solid transparent;
  border-right: 1vw solid transparent;
  border-bottom: 1vw solid #465b63;
  content: "";
  display: block;
  z-index: -2;
  transition: all 200ms linear;
}

.dropdown-sub:checked + label,
.dropdown-sub:not(:checked) + label {
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 200ms linear;
  font-weight: 500;
  font-size: 1.3vw;
  border-radius: 2px;
  text-decoration: none;
  display: flex;
  height: 50px;
  cursor: pointer;
}

.dropdown-sub:checked + label:hover,
.dropdown-sub:not(:checked) + label:hover {
  color: white;
  background-color: #218af2;
  transform: translateY(-10px);
}
</style>
