<template>
  <div class="box">
    <div class="box-left">
      <a-collapse v-model:activeKey="activeKey">
        <template #expandIcon="{ panelKey }">
          <!-- 根据 panelKey 显示不同的图标 -->
          <component :is="getExpandIcon(panelKey)" />
        </template>
        <a-collapse-panel
          :header="item.label"
          v-for="(item, index) in options"
          :key="index"
          :collapsible="item.children && item.children.length > 0 ? 'header' : 'disabled'"
        >
          <div
            v-for="(item2, index2) in item.children"
            :key="index2"
            :class="[
              'collapse-item-style-1',
              jumpRoute === item2.route ? 'active-color-1' : '',
            ]"
            @click="chooseRoute(item2.route)"
          >
            {{ item2.label }}
          </div>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <div class="box-right">
      <router-view />
    </div>
  </div>
</template>

<script>
import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons-vue";

export default {
  components: {
    AppstoreOutlined,
    SettingOutlined,
  },
  data() {
    return {
      activeKey: "0",
      jumpRoute: "",
      options: [
        {
          label: "功能盘",
          icon: "AppstoreOutlined",
          children: [
            { label: "颜色拾取器", route: "/ColorPicker" },
            { label: "字体转换", route: "/ChineseConversation" },
            { label: "网页信息拉取", route: "/UrlToAudit" },
          ],
        },
        {
          label: "其它功能",
          icon: "SettingOutlined",
        },
      ],
    };
  },
  mounted() {
    this.chooseRoute(this.options[0].children[0].route);
  },
  methods: {
    chooseRoute(route) {
      this.jumpRoute = route;
      this.$router.push(route);
    },
    getExpandIcon(panelKey) {
      const item = this.options[panelKey];
      if (item && item.icon) {
        return item.icon;
      }
      return "CaretRightOutlined";
    },
  },
};
</script>

<style scoped>
.active-color-1 {
  font-weight: bold;
  text-shadow: 0px 0px 5px #919191;
}
:deep(.ant-collapse-content) {
  background: transparent !important;
  border: none !important;
}
.collapse-item-style-1 {
  width: 100%;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  padding-left: 30px;
  transition: all 0.3s;
  cursor: pointer;
}
.box-right {
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden auto;
  padding: 16px;
  /* border: 1px solid; */
}
.box-left {
  width: 20%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden auto;
  /* border: 1px solid; */
}
.box {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
