<template>
  <div class="custom-titlebar">
    <div class="titlebar-left">
      <img class="app-icon" :src="require('@/assets/icon.jpg')" alt="应用图标" />
      <span class="app-title">个人工作台</span>
    </div>
    <div class="titlebar-right">
      <button class="titlebar-btn" @click="minimize">−</button>
      <button class="titlebar-btn" @click="maximize">□</button>
      <button class="titlebar-btn close-btn" @click="close">×</button>
    </div>
  </div>
  <div class="space-box"></div>
</template>

<script>
export default {
  name: "CustomTitleBar",
  methods: {
    minimize() {
      if (window.electronAPI) {
        window.electronAPI.minimize();
      }
    },
    maximize() {
      if (window.electronAPI) {
        window.electronAPI.maximize();
      }
    },
    close() {
      if (window.electronAPI) {
        window.electronAPI.close();
      }
    },
  },
};
</script>

<style scoped>
.space-box {
  width: 100%;
  height: 30px;
}
.custom-titlebar {
  height: 30px;
  background: #39313a; /* 与您的主题色一致 */
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  -webkit-app-region: drag; /* 允许拖拽 */
  user-select: none;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}

.titlebar-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.app-icon {
  width: 16px;
  height: 16px;
}

.app-title {
  font-size: 14px;
  font-weight: 600;
}

.titlebar-right {
  display: flex;
  gap: 5px;
  -webkit-app-region: no-drag; /* 按钮区域禁止拖拽 */
}

.titlebar-btn {
  width: 25px;
  height: 25px;
  border: none;
  background: transparent;
  color: white;
  cursor: pointer;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.titlebar-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.close-btn:hover {
  background: #e74c3c;
}
</style>
