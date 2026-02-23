<template>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from "./UserItem.vue";

export default {
  components: {
    UserItem,
  },
  inject: ["users"],
  beforeRouteLeave(to, from, next) {
    console.log("UsersList beforeRouteLeave");
    console.log(to, from);
    // here could check if maybe changes have been saved or show an alert to confirm first
    const confirmed = confirm("Are you sure you want to leave?");
    next(confirmed);
  },
  beforeRouteEnter(to, from, next) {
    console.log("UsersList beforeRouteEnter");
    console.log(to, from);
    next();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
