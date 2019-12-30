<template>
  <div class="container">
    <LocaleSelector />
    <!-- <button style="width: 10rem;" @click="logout" class="button">Logout</button> -->
    <Card>
      <template #title>
        <div class="select-servers__title">New server:</div>
      </template>
      <template #content>
        <form @submit.prevent="handleSubmit" class="form">
          <Input v-model="name" label="Name: " required />
          <Input v-model="password" label="Password: " required />
          <Button type="submit">Save</Button>
        </form>
      </template>
    </Card>
  </div>
</template>

<script>
import LocaleSelector from "../../components/LocaleSelector";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import * as firebase from "firebase/app";
import "firebase/auth";
import { mapGetters } from "vuex";

export default {
  name: "Select",
  components: { LocaleSelector, Card, Button, Input },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  methods: {
    async handleSubmit() {
      try {
        const {
          data: { data }
        } = await this.$axios.post(
          "v1/servers",
          {
            name: this.name,
            password: this.password
          },
          {
            headers: {
              authorization: `Bearer ${this.user.token}`
            }
          }
        );
        this.$router.push("/servers");
      } catch (err) {
        console.error(err);
      }
    }
  },
  mounted() {},
  data() {
    return {
      name: "",
      password: ""
    };
  }
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
}
</style>
