<template>
  <div class="box">
    <div class="text-style-1" style="margin-top: 10px">
      描述:这是一个基于 Electron + Vue 3 开发的桌面应用
    </div>
    <div class="text-style-1">用途:个人工作台(纯前端应用)</div>
    <div class="content-1 text-style-1">
      <div>功能:</div>
      <div>1. 颜色拾取器</div>
      <div>2. 中文简繁体转换</div>
      <div>3. 工作日志</div>
    </div>
    <div class="text-style-1">作者:余秋桐</div>
    <div class="text-style-1">开始开发时间：2025-10-28</div>
    <div class="text-style-1">最近更新时间：2025-10-29</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
.text-style-1 {
  font-size: 16px !important;
  text-align: left !important;
  color: #000000 !important;
  text-shadow: 0px 0px 5px #000;
}
.content-1 {
  margin: 5px 0;
}
.box {
  padding: 20px;
  font-size: 16px;
}
</style>
