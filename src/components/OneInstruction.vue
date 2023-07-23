<template>
    <div>
        {{ oneInstrution.step }}
        <table class="ingredients-table">
            <tr>
                <td v-for="ingredient in oneInstrution.ingredients" :key="ingredient.id" style="border-right: 2px dashed rgb(182, 182, 182);">
                    <table >
                        <tr style="text-align: center;">
                            {{ ingredient.name }}
                        </tr>
                        <tr>
                            <img class="img-ingredient"
                                :src="`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`" />
                        </tr>
                    </table>

                </td>
            </tr>
        </table>

    </div>
</template>
  
<script>
export default {
    name: "OneInstruction",
    props: {
        oneInstrution: {
            type: Object,
            required: true,
        }
    }
};
</script>
<style lang="scss" scoped>
.ingredients-table {
    margin-top: 1%;
}

.vl {
    border-left: 6px solid green;
    height: 100%;
}
</style>