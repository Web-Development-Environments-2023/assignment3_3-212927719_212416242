import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
  {
  path: "/About",
  name: "About",
  component: ()=> import("./pages/About"),
  },
  {
  path: "/MyRecipes",
  name: "MyRecipes",
  component: ()=> import("./pages/MyRecipes"),
  },
  {
  path: "/Favorites",
  name: "Favorites",
  component: ()=> import("./pages/Favorites"),
  },
  {
  path: "/Family",
  name: "Family",
  component: ()=> import("./pages/Family"),
  }
  
];

export default routes;
