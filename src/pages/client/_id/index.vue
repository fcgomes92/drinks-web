<template>
  <div v-if="loading">Loading</div>
  <div v-else>
    <ul>
      <li v-for="pokemon in pokemons" v-bind:key="pokemon.name">{{pokemon.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "client-id",
  validate({ params }) {
    return /^\w+$/.test(params.id);
  },
  async asyncData({ $axios, params }) {
    try {
      const { data } = await $axios.get(`https://pokeapi.co/api/v2/pokemon/`);
      return { pokemons: [...data.results] };
    } catch (error) {
      console.error(error);
      return { pokemons: [] };
    }
  },
  mounted() {
    this.loading = false;
  },
  data() {
    return {
      message: `${this.$route.params.id}`,
      loading: true,
      pokemons: []
    };
  }
};
</script>
