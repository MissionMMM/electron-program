<template>
  <div id="app">
    <!-- 标题栏 -->
    <custom-title-bar />
    <!-- 导航菜单 -->
    <nav
      class="navbar common-color-1"
      :style="{ width: windowWidth + 'px', height: windowHeight * 0.12 - 30 + 'px' }"
    >
      <div class="nav-brand">工作台 v1.0</div>
      <div class="nav-links">
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link to="/about" class="nav-link">关于</router-link>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <main
      class="main-content"
      :style="{ width: windowWidth + 'px', height: windowHeight * 0.8 + 'px' }"
    >
      <router-view />
    </main>

    <!-- 底部信息 -->
    <footer
      class="common-color-1 app-footer"
      :style="{ width: windowWidth + 'px', height: windowHeight * 0.08 + 'px' }"
    >
      <div class="text-style-1">Electron + Vue 3 + Vue Router</div>
      <div class="text-style-1">
        Author:余秋桐 Address:广东省深圳市龙华区富士康 Date:2025-10-28
      </div>
    </footer>
  </div>
</template>

<script>
import CustomTitleBar from "./views/components/CustomTitleBar.vue";
export default {
  components: {
    CustomTitleBar,
  },
  data() {
    return {
      windowWidth: 0,
      windowHeight: 0,
    };
  },
  mounted() {
    this.updateWindowSize();
    window.addEventListener("resize", this.updateWindowSize);
  },
  methods: {
    updateWindowSize() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: #cfcfcf;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 导航栏样式 */
.navbar {
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 0px 0px 5px #fff;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-active {
  background: #8a8a8a;
}

/* 主要内容区域 */
.main-content {
  /* flex: 1; */
  /* padding: 2rem; */
  /* border: 1px solid; */
}

/* 底部样式 */
.app-footer {
  display: flex;
  flex-flow: column;
  justify-content: center;
}
.text-style-1 {
  text-align: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.726) !important;
  line-height: 22px;
}
</style>
