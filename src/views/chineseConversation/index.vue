<template>
  <div class="box">
    <a-textarea
      v-model:value="inputText"
      placeholder="请输入要转换的文本"
      :auto-size="{ minRows: 6, maxRows: 12 }"
    />
    <div class="button-group">
      <app-button text="转换成繁体" class="margin-style-1" @click="toTraditionalized" />
      <app-button text="转换成简体" class="margin-style-1" @click="toSimplized" />
      <app-button text="英文转小写" class="margin-style-1" @click="toSmall" />
      <app-button text="英文转大写" class="margin-style-1" @click="toBig" />
    </div>
    <a-textarea
      v-model:value="resultText"
      placeholder="此处展示结果"
      :auto-size="{ minRows: 6, maxRows: 12 }"
      readonly
    />
  </div>
</template>

<script>
import AppButton from "../components/AppButton.vue";
import { traditionalized, simplized } from "./simpleTraditionalizedExchange";
export default {
  components: {
    AppButton,
  },
  data() {
    return {
      inputText: "",
      resultText: "",
    };
  },
  methods: {
    toBig() {
      this.resultText = this.inputText.toUpperCase();
    },
    toSmall() {
      this.resultText = this.inputText.toLowerCase();
    },
    toTraditionalized() {
      this.resultText = traditionalized(this.inputText);
    },
    toSimplized() {
      this.resultText = simplized(this.inputText);
    },
  },
};
</script>

<style scoped>
.margin-style-1 {
  margin-right: 16px;
}
.button-group {
  margin: 16px 0;
}
.box {
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  flex-flow: column;
}
</style>
