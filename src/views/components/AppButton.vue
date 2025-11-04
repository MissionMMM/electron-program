<template>
  <div class="button">{{ text }}</div>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    text: {
      type: String,
      default: "按钮",
    },
  },
};
</script>

<style scoped>
.button:active {
  background-color: #666;
  color: #fff;
  text-shadow: 0px 0px 3px #000;
  box-shadow: 0px 0px 10px 3px #999;
  position: relative;
  transform: scale(0.95);
}
.button:hover {
  background-color: #666;
  color: #fff;
  text-shadow: 0px 0px 3px #000;
  box-shadow: 0px 0px 10px 3px #999;
}
.button {
  display: inline-block;
  font-size: 13px;
  border: 1px solid #666;
  border-radius: 4px;
  padding: 8px 14px;
  cursor: pointer;
  transition: 0.3s;
}
</style>
