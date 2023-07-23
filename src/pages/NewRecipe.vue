<template>
  <div>
    <b-modal id="new-recipe-model" scrollable title="New Recipe" @ok="handleOk">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <u>Basic Information:</u>
        <b-form-group>
          name:
          <b-form-input
            v-model="name"
            required
          ></b-form-input>
          time (minutes):
          <b-form-input
            v-model="time"
            type="number"
            step="any"
            min="0"
            required
          ></b-form-input>
          popularity:
          <b-form-input
            v-model="popularity"
            type="number"
            step="any"
            min="0"
            required
          ></b-form-input>
          vegan:
          <b-form-select
            v-model="vegan"
            :options="booleanOptions"
          ></b-form-select>
          vegetarian:
          <b-form-select
            v-model="vegetarian"
            :options="booleanOptions"
          ></b-form-select>
          gluten free:
          <b-form-select
            v-model="glutenFree"
            :options="booleanOptions"
          ></b-form-select>
          number of portions:
          <b-form-input
            v-model="numberOfPortions"
            type="number"
            step="any"
            min="0"
            required
          ></b-form-input>
          Image (https path):
          <b-form-input
            v-model="imagePath"
            required
          ></b-form-input>
        </b-form-group>
        <u>Instructions:</u>
        <b-form-group
          ><div v-for="(step, index) in steps" :key="index">
            step {{ index + 1 }}:
            <b-row>
              <b-col cols="10">
                <b-form-input v-model="step.step" required></b-form-input
              ></b-col>
              <b-col cols="1">
                <b-button size="sm" variant="danger" @click="removeStep(index)">
                  remove
                </b-button></b-col
              ></b-row
            >
          </div>
          <br />
          <b-button size="sm" variant="success" @click="addStep">
            add step
          </b-button>
        </b-form-group>
        <u>Ingredients:</u>
        <b-form-group
          ><div v-for="(step, index) in ingredients" :key="index">
            <b-row>
              <b-col cols="8">
                <b-row>
                  <b-col>
                    name:
                    <b-form-input
                      v-model="step.name"
                      required
                    ></b-form-input></b-col
                  ><b-col>
                    amount:
                    <b-form-input
                      v-model="step.amount"
                      type="number"
                      step="any"
                      min="0"
                      required
                    ></b-form-input> </b-col></b-row
              ></b-col>
              <b-col
                >unit: <b-form-input v-model="step.unit" required></b-form-input
              ></b-col>
              <b-col>
                <br />
                <b-button
                  size="sm"
                  variant="danger"
                  @click="removeIngredient(index)"
                >
                  remove
                </b-button></b-col
              ></b-row
            ><br />
          </div>
          <b-button size="sm" variant="success" @click="addIngredient">
            add ingredient
          </b-button>
        </b-form-group>
        Summary:
        <b-form-input
         v-model="summary"
         required>
        </b-form-input>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { BModal, BButton } from "bootstrap-vue";
export default {
  data() {
    return {
      imagePath: "",
      name: "",
      time: 0,
      popularity: 0,
      vegan: "",
      vegetarian: "",
      glutenFree: "",
      summary: "",
      numberOfPortions: 0,
      steps: [{ step: "", equipment: [], ingredients: [] }],
      ingredients: [{ name: "", amount: 0, unit: "" }],
      booleanOptions: [true, false],
    };
  },
  components: {
    BModal,
  },
  methods: {
    showModal() {
      this.$root.$emit("bv::show::modal", "new-recipe-model", "#btnShow");
    },
    handleOk(bvModalEvent) {
      bvModalEvent.preventDefault();
      if (!this.$refs.form.checkValidity()) {
        this.$root.toast(
          "warning",
          "must fill all boxes (and correctly)",
          "danger"
        );
        return;
      }
      this.$nextTick(() => {
        this.$root.$emit("bv::hide::modal", "new-recipe-model");
        this.addRecipe();
        this.imagePath = "";
        this.summary = "";
        this.name = "";
        this.time = 0;
        this.popularity = 0;
        this.vegan = "";
        this.vegetarian = "";
        this.glutenFree = "";
        this.numberOfPortions = 0;
        this.steps = [{ number: "", step: "", equipment: [], ingredients: [] }];
        this.ingredients = [{ name: "", amount: 0, unit: "" }];
      });
    },
    async addRecipe() {
      try {
        const response = await this.axios.post(
          this.$root.store.server_domain + "users/singlerecipe",
          {
            mainImage: this.imagePath,
            name: this.name,
            time: this.time,
            popularity: this.popularity,
            vegan: this.vegan,
            vegetarian: this.vegetarian,
            glutenFree: this.glutenFree,
            summary: this.summary,
            instructions: [
              {
                name: "",
                steps: this.steps,
              },
            ],
            numberOfPortions: this.numberOfPortions,
            ingredients: this.ingredients.map((i) => {
              return {
                name: i.name,
                amount: { amount: i.amount, unit: i.unit }
              };
            }),
          }
        );
        if (response.status == 201) {
          this.$root.toast(
            "success!",
            "New recipe added to our system",
            "success"
          );
        }
      } catch (err) {
        console.log(err.response);
        this.$root.toast("warning!", err.response.status, "danger");
      }
    },
    addStep() {
      this.steps.push({ step: "", equipment: [], ingredients: [] });
    },
    removeStep(index) {
      if (this.steps.length > 1) {
        this.steps.splice(index, 1);
      } else {
        this.$root.toast("warning", "must fill at least one step", "danger");
      }
    },
    addIngredient() {
      this.ingredients.push({ name: "", amount: 0, unit: "" });
    },
    removeIngredient(index) {
      if (this.ingredients.length > 1) {
        this.ingredients.splice(index, 1);
      } else {
        this.$root.toast(
          "warning",
          "must fill at least one ingredient",
          "danger"
        );
      }
    },
  },
};
</script>
