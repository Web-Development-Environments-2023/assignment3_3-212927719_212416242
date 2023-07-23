<template>
  <div>
    <b-row>
      <b-col>
        Amount:
        <b-form-select :options="[1, 3, 5, 10, 15]" v-model="limit" />
      </b-col>
      <b-col>
        Order By:
        <b-form-select :options="orderByOptions" v-model="orderBy" />
      </b-col>
      <b-col>
        Search:
        <b-form-input
          type="text"
          name="search"
          placeholder="Search..."
          class="search-input"
          v-model="searchValue"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        Cusiines:
        <b-form-select :options="cuisinesOptions" v-model="cuisine" />
      </b-col>
      <b-col>
        Diet:
        <b-form-select :options="dietOptions" v-model="diet" />
      </b-col>
      <b-col>
        Intolerances:
        <b-form-select :options="intolerancesOtions" v-model="intolerances" />
      </b-col>
    </b-row>

    <b-row style="justify-content: center;">
      <b-button
        @click="
          $emit('search-func', searchValue, limit, cuisine, diet, intolerances)
        "
        style="width: 80%; margin-top: 1%;"
        >Search</b-button
      >
    </b-row>
  </div>
</template>

<script>
import searchFilter from "../assets/search-filter";
export default {
  name: "Search",
  data() {
    return {
      searchValue: "",
      cuisinesOptions: searchFilter.cuisinesOptions,
      dietOptions: searchFilter.dietOptions,
      intolerancesOtions: searchFilter.intolerancesOtions,
      orderByOptions: ["Time", "Popularity", "Ingredients"],

      limit: "1",
      cuisine: "",
      diet: "",
      intolerances: "",
      orderBy: "Time",
    };
  },
  watch: {
    orderBy: function() {
      this.$emit("updateOrderBy", this.orderBy);
    },
  },
};
</script>

<style lang="scss" scoped></style>
