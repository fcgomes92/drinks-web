<template>
  <div class="card">
    <div class="card__title">
      <slot name="title"></slot>
    </div>
    <div class="card__content">
      <slot name="content"></slot>
    </div>
    <div class="card__actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../layouts/_global";

.card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-sizing: border-box;
  min-width: 10rem;
  min-height: 3rem;
  padding: 2.4rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 0 0 lighten($color, 48);
  &__content {
    display: flex;
    flex-direction: column;
  }
}
</style>
