<template>
  <button
    class="button"
    :type="type"
    :disabled="loading || disabled"
    v-bind:class="{ 'button--loading': loading }"
    @click="$emit('click', $event)"
  >
    <slot v-if="!loading"></slot>
    <span class="button__loading-text" v-else>{{ loadingText }}</span>
  </button>
</template>

<script>
/**
 * Button
 * 
 * @emits click to click
 */
export default {
  props: {
    loading: Boolean,
    type: String,
    loadingText: {
      type: String,
      default() {
        return "Loading...";
      }
    },
    disabled: Boolean
  },
  computed: {},
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "../layouts/_global";

@keyframes rotate {
  0% {
    transform: translateY(-50%) rotate(0deg);
  }
  100% {
    transform: translateY(-50%) rotate(360deg);
  }
}
.button {
  color: #fff;
  margin: $fieldDistance;
  box-sizing: border-box;
  border-radius: 0.2rem;
  padding: 1rem 0;
  border: none;
  transition: all 0.2s ease-in-out;
  background-color: darken($color, 12);
  box-shadow: 0 10px 0 -2px lighten($color, 32);
  &--loading {
    position: relative;
    &:after {
      $size: 0.8rem;
      position: absolute;
      right: 30%;
      top: 50%;
      transform: translateY(-50%);
      content: "";
      width: $size;
      height: $size;
      //   background-color: #fff;
      border: 0.1rem solid #fff;
      border-bottom-color: transparent;
      border-radius: 50%;
      animation: rotate infinite 0.8s linear;
    }
  }
  &:focus,
  &:hover {
    box-shadow: 0 10px 0 -2px lighten($color, 48);
    background-color: darken($color, 10);
  }
  &:active {
    transform: translateY(5px);
    box-shadow: 0 5px 0 0 lighten($color, 64);
    background-color: darken($color, 7);
  }

  &:disabled {
    background-color: #333;
    transform: translateY(5px);
    box-shadow: 0 5px 0 0 lighten($color, 64);
  }
}
</style>
