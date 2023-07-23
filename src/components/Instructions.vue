<template>
    <div class='viewport'>
        <div class='todos'>
            <h1 class='title'>
                Instructions
            </h1>
            <i class='divider'></i>
            <input class='toggle' id='toggle' type='checkbox' checked>
            <label class='btn-toggle' for='toggle'>
                Toggle
            </label>

            <fragment v-for="(i, index) in instructions" :key="index">
                <input class='input' :id="'ch-' + index" :name="'ch-' + index" type='checkbox'>
                <label class='item' :for="'ch-' + index" :style='`--item: ${index}`'>
                    <div class='item__content'>
                        <div class='pseudo-check'>
                            <div class='checkmark'>
                                <div class='goo'></div>
                            </div>
                        </div>
                        <span class='item__text'>
                            <!-- {{ i.step }} -->
                            <OneInstruction :oneInstrution="i" />
                        </span>
                    </div>
                </label>
                <div class='progress' :style="`--numOfItems: ${instructions.length};`"></div>
            </fragment>

            <div :class="{
                end_check: true,
                end:true,
            }">
                <div :class="{
                    goo_check: true,
                    goo: true,
                }"></div>
            </div>
        </div>
    </div>
</template>
  
<script>
import OneInstruction from "./OneInstruction.vue"
export default {
    name: "Instructions",
    components: {
        OneInstruction
    },
    props: {
        instructions: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            checked: 0,
        };
    },
};
</script>

  
<style lang="scss" scoped>
.input {
    display: none;
}

.pseudo-check {
    display: inline-block;
    border-radius: 0.4em;
    vertical-align: middle;
    position: relative;
    transition: all 0.3s;
    box-shadow: inset 0 0.05em 0.15em rgba(0, 0, 0, 0.3);
    top: -0.11em;
    width: 1.3em;
    height: 1.3em;
    margin-right: 5%;
}

.checkmark {
    position: relative;
    margin: 25% 20%;
    -webkit-clip-path: polygon(0 56%, 35% 87%, 100% 15%, 85% 0, 34% 56%, 15% 39%);
    clip-path: polygon(0 56%, 35% 87%, 100% 15%, 85% 0, 34% 56%, 15% 39%);
    width: 0.75em;
    height: 0.75em;
}

.goo {
    border-radius: 50%;
    background-color: #fff;
    background-color: #39d76e;
    position: absolute;
    left: 15%;
    top: 67%;
    opacity: 0;
    transition: transform 0.5s ease-in, opacity 0.4s 0.1s;
    transform-origin: center;
    transform: scale(0.1);
    width: 0.06em;
    height: 0.09em;
}

.item {
    position: relative;
    display: inline-block;
    flex-grow: 1;
    color: #456;
    min-width: 100%;
    cursor: pointer;
    perspective: 1000px;
    margin: 0 -1em;
}

.item__content {
    transform: rotateX(-100deg);
    background-color: #fff;
    transform-origin: top left;
    box-sizing: border-box;
    padding: 1em 1em;
    margin-bottom: -3.5em;
    border-top: 1px solid #efefef;
    transition: all 0.5s calc((5 - var(--item)) * .05s) cubic-bezier(0.28, -0.54, 0.45, 2);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
}

.item:first-of-type .item__content {
    border-top: none;
}

.item__text {
    position: relative;
    max-width: calc(100% - 1.8em);
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    white-space: normal;
}

// .item__text::after {
//     content: "";
//     display: block;
//     height: 5px;
//     width: 0%;
//     top: 50%;
//     left: -2.5%;
//     position: absolute;
//     background-color: #39d76e;
//     transition: all 0.2s 0.1s;
// }

// .parent .child {
//     background-color: pink;
// }

// .parent .child-2 {
//     background-color: red;
// }

.progress {
    background-color: #39d76e;
    width: 0.01%;
    height: 5px;
    position: relative;
    order: -1;
    transition: width 0.4s;
    margin-bottom: 1rem;
}

.input:checked+.item .item__text::after {
    width: 105%;
}

.input:checked+.item .pseudo-check {
    background: #39d76e;
}


.input:checked+.item .goo {
    background-color: #fff;
    transform: scale(40);
    opacity: 1;
    transition: transform 0.3s cubic-bezier(1, -0.46, 0.41, 1.34), opacity 0;
}

.input:checked+.item+.stuff {
    float: right;
}

.todos {
    width: 95%;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    padding: 1em;
    position: relative;
    padding-bottom: 0.5em;
    margin: auto;
    border-radius: 0.1em 0.1em 0.3em 0.3em;
    border-top: 20px solid #04c6df;
    background-color: #fff;
    box-shadow: 0 30px 40px rgba(0, 0, 0, 0.4);
    z-index: 2;
}

.divider {
    width: 100%;
    height: 2px;
    order: 0;
}

.title {
    order: -4;
    width: 100%;
    margin-top: 0;
    margin-bottom: -5px;
    font-size: 1rem;
    color: #456;
    text-transform: uppercase;
    padding-bottom: 1rem;
    border-bottom: 5px solid #d9dee3;
    letter-spacing: 0.02em;
}

.toggle {
    display: none;
}

.toggle:checked~.item .item__content {
    margin-bottom: 0em;
    transform: rotateX(0deg);
    transition: all 0.23s calc(var(--item) * .16s) cubic-bezier(0.28, -0.54, 0.45, 2.1);
}

.toggle:checked+.btn-toggle::after {
    top: 35%;
    transform: rotateZ(-135deg);
}

.btn-toggle {
    position: absolute;
    top: 1em;
    right: 1em;
    border: 2px solid #89a;
    text-indent: -9999px;
    border-radius: 50%;
    cursor: pointer;
    width: 20px;
    height: 20px;
}

.btn-toggle::after {
    content: "";
    display: block;
    border: 2px solid #89a;
    border-top: none;
    border-left: none;
    position: absolute;
    top: 16%;
    left: 24%;
    transition: transform 0.3s;
    transform: rotateZ(45deg);
    width: 8px;
    height: 8px;
}

.end {
    display: block;
    opacity: 0;
    pointer-events: none;
    -webkit-clip-path: polygon(0 56%, 35% 87%, 100% 15%, 85% 0, 34% 56%, 15% 39%);
    clip-path: polygon(0 56%, 35% 87%, 100% 15%, 85% 0, 34% 56%, 15% 39%);
    width: 8em;
    height: 8em;
    position: absolute;
    top: 230px;
    right: calc(50% + 0px);
    transform: translate(50%, -50%);
    z-index: 4;
    overflow: hidden;
    transition: opacity 0.1s, all 0 0.4s;
}

// .goo {
//     background: linear-gradient(#ff3052, #ff51b6);
//     transform: scale(1);
//     width: 3em;
//     height: 3em;
// }

// // .input:checked~.input:checked~.input:checked~.input:checked~.input:checked~.end {
// .end_check {
//     opacity: 1;
//     top: 33px;
//     right: calc(0% + 65px);
//     transition: opacity 0.1s, width 0.3s 0.2s cubic-bezier(0.28, -0.54, 0.45, 1.3), height 0.3s 0.2s cubic-bezier(0.28, -0.54, 0.45, 1.3), top 0.3s 0.5s cubic-bezier(0.99, -0.4, 0.14, 1.51), right 0.3s 0.5s cubic-bezier(0.99, -0.4, 0.14, 1.51);
//     width: 1em;
//     height: 1em;
// }

// // .input:checked~.input:checked~.input:checked~.input:checked~.input:checked~.end .goo {
// .goo_check {
//     transition: all 0.4s;
//     left: 35%;
//     top: 17%;
//     transform: scale(5);
//     opacity: 1;
// }

body {
    padding: 0;
    margin: 0;
    position: relative;
}

.viewport {
    font-family: "Avenir", sans-serif;
    font-size: 1.3em;
}

.viewport::after {
    content: "";
    display: block;
    position: absolute;
    border-radius: 50%;
}

.input:checked+.item+.progress {
    width: calc(100%/var(--numOfItems));
    transition: width 0.4s 0.1s;
}
</style>