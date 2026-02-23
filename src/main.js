import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import TeamsList from "./components/teams/TeamsList.vue";
import UsersList from "./components/users/UsersList.vue";
import TeamMembers from "./components/teams/TeamMembers.vue";
import NotFound from "./components/nav/NotFound.vue";
import TeamsFooter from "./components/teams/TeamsFooter.vue";
import UsersFooter from "./components/users/UsersFooter.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/teams" },
    {
      // alias: "/",
      name: "teams",
      path: "/teams",
      components: { default: TeamsList, footer: TeamsFooter },
      children: [
        {
          name: "team-members",
          path: "/teams/:teamId",
          component: TeamMembers,
          props: true,
        },
      ],
    },
    // { name: "team-members", path: "/teams/:teamId", component: TeamMembers, props: true },
    {
      path: "/users",
      components: { default: UsersList, footer: UsersFooter },
      beforeEnter(to, from, next) {
        console.log("users before enter");
        console.log(to, from);
        next();
      },
    },
    { path: "/:notFound(.*)", component: NotFound },
  ],
  scrollBehavior(to, from, savedPosition) {
    console.log("scroll behaviour");
    console.log(to, from, savedPosition);
    if (savedPosition) return savedPosition;
    return { left: 0, top: 0 };
  },
  // linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
  console.log("Global before each nav");
  console.log(to, from);
  // next(false); // to cancel nav
  // next({ name: 'team-members', params: { teamId: 't2' } }); // to redirect
  next();
});

router.afterEach((to, from) => {
  console.log("Global after each nav");
  console.log(to, from);
});

const app = createApp(App);

app.use(router);

app.mount("#app");
