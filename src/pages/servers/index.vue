<template>
  <div class="container">
    <LocaleSelector />
    <!-- <button style="width: 10rem;" @click="logout" class="button">Logout</button> -->
    <Card>
      <template #title>
        <div class="select-servers__title">Servers:</div>
      </template>
      <template #content>
        <div class="select-servers">
          <nuxt-link to="/servers/register">
            New
          </nuxt-link>
          <ul class="select-servers__list">
            <nuxt-link
              class="select-servers__list__item"
              :to="`/servers/${serverId}`"
              v-for="(serverId, idx) in serversIds"
              :key="serverId"
              :tabindex="idx + 1"
            >
              <li class="select-servers__list__item__content">
                {{ servers[serverId].name }}
              </li>
            </nuxt-link>
          </ul>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import LocaleSelector from "../../components/LocaleSelector";
import Card from "../../components/Card";
import * as firebase from "firebase/app";
import "firebase/auth";
import { mapGetters } from "vuex";

export default {
  name: "Select",
  middleware: "authenticated",
  components: { LocaleSelector, Card },
  computed: {
    serversIds: function() {
      return Object.keys(this.servers);
    },
    ...mapGetters({
      user: "auth/user"
    })
  },
  methods: {
    async logout() {
      try {
        firebase.auth().signOut();
      } catch (err) {
        console.error(err);
      }
    }
  },
  async asyncData({ store, $axios }) {
    try {
      const {
        data: { data }
      } = await $axios.get("v1/servers", {
        headers: {
          authorization: `Bearer ${store.getters["auth/user"].token}`
        }
      });
      console.log(data);
      return { servers: { ...data } };
    } catch (err) {
      console.error(err);
    }
  },
  mounted() {},
  data() {
    return {
      servers: {}
    };
  }
};
</script>

<style scoped lang="scss">
$color: rgba(100, 10, 120, 1);
.select-servers {
  &__title {
    font-size: 1.2rem;
    line-height: 1.6;
  }
  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
    &__item {
      text-decoration: none;
      color: #333;
      &__content {
        text-align: center;
        cursor: pointer;
        font-size: 1.6rem;
        line-height: 2;
        position: relative;
        z-index: 0;
        width: 100%;
        &:before {
          z-index: 1;
          content: "";
          position: absolute;
          height: 0.8rem;
          width: 75%;
          left: 50%;
          background-color: scale-color($color, $lightness: 30%);

          bottom: -15%;
          transform: skew(-24deg) rotate(4deg) translate(-50%, -50%);
          transition: all 0.2s ease;
        }
        &:hover,
        &:focus {
          &:before {
            z-index: -1;
            bottom: 15%;
            height: 1rem;
            background-color: scale-color(
              $color,
              $lightness: 30%,
              $alpha: -40%
            );
            transform: skew(32deg) rotate(-4deg) translate(-50%, -50%);
          }
        }
      }
    }
  }
}
</style>
