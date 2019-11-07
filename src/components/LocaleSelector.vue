<template>
  <div class="locale-selector">
    <input v-model="$root.$i18n.locale" class="locale-selector__input" />
    <div
      v-on:click="toggleSelect"
      class="locale-selector__label"
      v-bind:class="{'locale-selector__label--open': open}"
    >{{$root.$i18n.locale}}</div>
    <ul class="locale-selector__select" v-bind:class="{'locale-selector__select--open': open}">
      <li
        class="locale-selector__select__item"
        v-on:click="selectLocale(lang)"
        v-for="(lang, i) in langs"
        :key="`Lang${i}`"
        :value="lang"
      >{{ lang }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LocaleSelector",
  methods: {
    toggleSelect() {
      this.open = !this.open;
    },
    selectLocale(lang) {
      this.$store.commit("lang/change", { lang });
      this.$root.$i18n.locale = lang;
      this.open = false;
    }
  },
  computed: {
    langs: function() {
      return this.allLangs.filter(lang => lang !== this.$root.$i18n.locale);
    }
  },
  data() {
    return {
      open: false,
      allLangs: Object.keys(this.$root.$i18n.messages)
    };
  }
};
</script>

<style lang="scss" scoped>
$animationTime: 0.2s;
$animationTimeHeightMultiplyFactor: 2.5 - 1;
$selectSize: 3rem;
$selectHoverSize: $selectSize / 1.1;
$selectColor: rgb(100, 10, 120);
.locale-selector {
  position: fixed;
  top: 0;
  right: 0;
  margin: 0.8rem;
  box-sizing: border-box;
  color: white;
  width: $selectSize;
  height: $selectSize;
  &__input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
  &__label {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: $selectColor;
    transition: border-radius $animationTime ease $animationTime *
      $animationTimeHeightMultiplyFactor;
    height: 100%;
    cursor: pointer;
    &--open {
      transition: border-radius $animationTime ease 0s;
      border-radius: 50% 50% 0 0;
    }
  }
  &__select {
    display: flex;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    position: absolute;
    flex-direction: column;
    top: 100%;
    width: 100%;
    list-style: none;
    max-height: 0;
    overflow-y: hidden;
    transition: max-height $animationTime * $animationTimeHeightMultiplyFactor
      cubic-bezier(0.65, 0.05, 0.36, 1) 0s;
    &--open {
      transition: max-height $animationTime * $animationTimeHeightMultiplyFactor
        cubic-bezier(0.65, 0.05, 0.36, 1) $animationTime;
      overflow-y: auto;
      max-height: 40vh;
    }
    &__item {
      cursor: pointer;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      transition: all 0.2 ease-in-out;
      background-color: $selectColor;
      padding: 0.8rem 0;
      position: relative;
      &:before {
        position: absolute;
        content: "";
        z-index: -1;
        width: $selectHoverSize;
        height: $selectHoverSize;
        background-color: transparent;
        border-radius: 50%;
        transition: background-color $animationTime linear;
      }
      &:hover {
        &:before {
          background-color: darken($selectColor, 5);
        }
      }
    }
    &:after {
      z-index: 0;
      content: "";
      position: relative;
      top: -$selectSize / 2;
      left: 0;
      width: 100%;
      background-color: $selectColor;
      height: $selectSize;
      border-radius: 50% 50%;
    }
  }
}
</style>