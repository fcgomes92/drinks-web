<template>
  <label class="input">
    <input
      :required="required"
      :type="type"
      :name="name"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <span class="input__label">{{ label }}</span>
  </label>
</template>

<script>
/**
 * Input
 *
 * @emits click to click
 */
export default {
  props: {
    required: Boolean,
    type: String,
    name: String,
    label: String,
    value: [String, Boolean, Number]
  }
};
</script>

<style lang="scss" scoped>
@import "../layouts/_global";

.input {
  line-height: 1.6;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: $fieldDistance;
  box-sizing: border-box;
  &__label {
    order: 0;
    flex-shrink: 1;
    margin: 0.8rem 0;
    position: relative;
    z-index: 0;
    &:before {
      transition: all 0.2s ease-in-out;
      z-index: -1;
      content: "";
      position: absolute;
      right: 0;
      left: 100%;
      height: 1rem;
      background-color: scale-color($color, $lightness: 38%, $alpha: -48%);
      bottom: -15%;
      transform: skew(-32deg) rotate(4deg);
    }
  }
  & > input {
    order: 1;
    flex-grow: 1;
    flex-basis: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 0.1rem solid lighten($color, 48);
    padding: 1rem 0.5rem;
    border-radius: 0;

    &:focus ~ .input__label:before {
      right: 0;
      left: 0;
      transform: skew(-32deg) rotate(-4deg);
    }
  }
}
</style>
