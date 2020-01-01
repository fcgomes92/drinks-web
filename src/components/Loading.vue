<template>
  <div class="hourglass">
    <div class="hourglass__top"></div>
    <div class="hourglass__bottom"></div>
  </div>
</template>

<style lang="scss" scoped>
$emptyColor: rgba(244, 221, 126, 0.25);
$fillColor: #c2b280;
$accentColor: rgb(191, 160, 39);
$rotation: 45deg;
$containerSize: 10rem;
$hourglassSize: $containerSize * 1.5 / 2;
$rotationAnimationTime: 4s;
$rotationAnimationTimingFunction: cubic-bezier(0.68, -0.55, 0.27, 1.55);
$fillAnimationTimingFunction: linear;
$emptyAnimationTimingFunction: linear;
$sandBorderRadius: 0.5rem 0 0.5rem 0;
$glassBorderRadius: 0.5rem;
$scale: scale(.3);
.hourglass {
  width: $containerSize;
  height: $containerSize;
  overflow: hidden;
  position: relative;
  transform: $scale;
  animation: rotate $rotationAnimationTime infinite both;
  animation-timing-function: $rotationAnimationTimingFunction;
  &__top,
  &__bottom {
    border-radius: $glassBorderRadius;
    position: absolute;
    transform: translateX(-50%) rotate($rotation);
    background: $emptyColor;
    height: $hourglassSize;
    width: $hourglassSize;
    position: absolute;
    left: 50%;
  }
  &__bottom {
    bottom: -$hourglassSize / 2;
    z-index: 0;
    &:before {
      transform: rotate(-$rotation)
        translateX(($hourglassSize - $containerSize));
      content: "";
      z-index: 2;
      position: absolute;
      bottom: $containerSize / 2;
      width: $containerSize * 1.1;
      height: 1rem;
      background-color: $accentColor;
    }
    &:after {
      border-radius: $sandBorderRadius;
      content: "";
      z-index: 1;
      position: absolute;
      width: 0;
      height: 0;
      background: $fillColor;
      animation: fillUp $rotationAnimationTime infinite both;
      animation-timing-function: $fillAnimationTimingFunction;
    }
  }
  &__top {
    top: -$hourglassSize / 2;
    &:before {
      transform: rotate(-$rotation) translateX($hourglassSize - $containerSize);
      content: "";
      z-index: 2;
      position: absolute;
      bottom: $containerSize / 2;
      width: $containerSize * 1.1;
      height: 1rem;
      background-color: $accentColor;
    }
    &:after {
      border-radius: $sandBorderRadius;
      content: "";
      z-index: 1;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      background: $fillColor;
      animation: emptyDown $rotationAnimationTime infinite both;
      animation-timing-function: $emptyAnimationTimingFunction;
    }
  }
}

@keyframes rotate {
  0%,
  25% {
    transform: $scale rotate(0deg);
  }

  50%,
  75% {
    transform: $scale rotate(180deg);
  }

  100% {
    transform: $scale rotate(360deg);
  }
}

@keyframes fillUp {
  0% {
    width: 0;
    height: 0;
  }
  25%,
  50% {
    width: 100%;
    height: 100%;
  }
  75%,
  100% {
    width: 0;
    height: 0;
  }
}

@keyframes emptyDown {
  0% {
    width: 100%;
    height: 100%;
  }
  25%,
  50% {
    width: 0;
    height: 0;
  }
  75%,
  100% {
    width: 100%;
    height: 100%;
  }
}
</style>
