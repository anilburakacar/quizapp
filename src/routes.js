import Vue from "vue";
import Router from "vue-router";


import Questions from "./Questions.vue";
import Questions2 from "./Questions2.vue";
import Questions3 from "./Questions3.vue";



export const routes = [
  {path : '/', component : Questions},
  {path : '/questions2', component : Questions2},
  {path : '/questions3', component : Questions3}
];
