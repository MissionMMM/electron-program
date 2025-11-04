<template>
  <div class="color-picker-page">
    <div class="page-header">
      <h1 class="page-title">颜色拾取器</h1>
    </div>

    <div class="color-picker-container">
      <!-- 左侧控制区域 -->
      <div class="color-controls">
        <!-- 颜色预览 -->
        <div class="color-preview-section">
          <div
            class="current-color-preview"
            :style="{ backgroundColor: currentColor }"
          ></div>
          <div class="color-info">
            <div class="hex-value">{{ currentColor }}</div>
            <div class="rgb-value">RGB({{ rgb.r }}, {{ rgb.g }}, {{ rgb.b }})</div>
          </div>
        </div>

        <!-- RGB 控制 -->
        <div class="slider-controls">
          <div class="slider-group">
            <label class="slider-label">R: {{ rgb.r }}</label>
            <input
              type="range"
              min="0"
              max="255"
              v-model.number="rgb.r"
              class="slider red-slider"
              @input="updateFromRGB"
            />
          </div>
          <div class="slider-group">
            <label class="slider-label">G: {{ rgb.g }}</label>
            <input
              type="range"
              min="0"
              max="255"
              v-model.number="rgb.g"
              class="slider green-slider"
              @input="updateFromRGB"
            />
          </div>
          <div class="slider-group">
            <label class="slider-label">B: {{ rgb.b }}</label>
            <input
              type="range"
              min="0"
              max="255"
              v-model.number="rgb.b"
              class="slider blue-slider"
              @input="updateFromRGB"
            />
          </div>
        </div>

        <!-- HEX 输入 -->
        <div class="hex-input-group">
          <label class="input-label">HEX:</label>
          <input
            type="text"
            v-model="hexColor"
            @input="updateFromHex"
            class="hex-input"
            maxlength="7"
          />
        </div>

        <!-- 保存按钮 -->
        <div class="save-section">
          <button class="save-button" @click="saveCurrentColor">
            <SaveOutlined />保存当前颜色
          </button>
        </div>
      </div>

      <!-- 右侧颜色区域 -->
      <div class="color-sections">
        <!-- 预设颜色 -->
        <div class="color-section">
          <h3 class="section-title">预设颜色</h3>
          <div class="color-grid">
            <div
              v-for="color in presetColors"
              :key="color"
              class="color-item"
              :style="{ backgroundColor: color }"
              @click="setPresetColor(color)"
              :title="color"
            ></div>
          </div>
        </div>

        <!-- 最近使用颜色 -->
        <div class="color-section">
          <h3 class="section-title">
            最近使用
            <span class="clear-history" @click="clearHistory" title="清空历史">🗑️</span>
          </h3>
          <div class="color-grid">
            <div
              v-for="(color, index) in recentColors"
              :key="index"
              class="color-item"
              :style="{ backgroundColor: color }"
              @click="setCurrentColor(color)"
              :title="color"
            >
              <span class="color-index">{{ index + 1 }}</span>
            </div>
            <!-- 预留空位 -->
            <div
              v-for="n in 10 - recentColors.length"
              :key="'empty-' + n"
              class="color-item empty-slot"
              :title="'预留位置 ' + n"
            >
              <span class="slot-label">+</span>
            </div>
          </div>
        </div>

        <!-- 已保存颜色 -->
        <div class="color-section">
          <h3 class="section-title">
            已保存颜色
            <span class="saved-count">({{ savedColors.length }}/10)</span>
          </h3>
          <div class="color-grid">
            <div
              v-for="(color, index) in savedColors"
              :key="index"
              class="color-item saved-color"
              :style="{ backgroundColor: color }"
              @click="setCurrentColor(color)"
              :title="color"
            >
              <span class="delete-icon" @click.stop="removeSavedColor(index)">×</span>
            </div>
            <!-- 预留空位 -->
            <div
              v-for="n in 10 - savedColors.length"
              :key="'saved-empty-' + n"
              class="color-item empty-slot"
              :title="'可保存位置 ' + n"
            >
              <span class="slot-label">空</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SaveOutlined } from "@ant-design/icons-vue";
export default {
  name: "ColorPickerPage",
  components: {
    SaveOutlined,
  },
  data() {
    return {
      currentColor: "#bbff8b",
      rgb: { r: 187, g: 255, b: 139 },
      hexColor: "#bbff8b",

      presetColors: [
        "#ff6b6b",
        "#4ecdc4",
        "#45b7d1",
        "#96ceb4",
        "#feca57",
        "#ff9ff3",
        "#54a0ff",
        "#5f27cd",
        "#00d2d3",
        "#ff9f43",
        "#10ac84",
        "#ee5253",
        "#000000",
        "#333333",
        "#666666",
        "#999999",
        "#cccccc",
        "#ffffff",
      ],

      recentColors: [],
      savedColors: [],
    };
  },

  mounted() {
    this.loadSavedColors();
    this.loadRecentColors();
    // 将当前颜色添加到最近使用
    this.addToRecent(this.currentColor);
  },

  methods: {
    updateFromRGB() {
      this.currentColor = this.rgbToHex(this.rgb.r, this.rgb.g, this.rgb.b);
      this.hexColor = this.currentColor;
      this.addToRecent(this.currentColor);
    },

    updateFromHex() {
      if (this.isValidHex(this.hexColor)) {
        const rgb = this.hexToRgb(this.hexColor);
        if (rgb) {
          this.rgb = rgb;
          this.currentColor = this.hexColor;
          this.addToRecent(this.currentColor);
        }
      }
    },

    setPresetColor(color) {
      this.currentColor = color;
      const rgb = this.hexToRgb(color);
      if (rgb) {
        this.rgb = rgb;
        this.hexColor = color;
        this.addToRecent(color);
      }
    },

    setCurrentColor(color) {
      this.currentColor = color;
      const rgb = this.hexToRgb(color);
      if (rgb) {
        this.rgb = rgb;
        this.hexColor = color;
        this.addToRecent(color);
      }
    },

    // 保存当前颜色
    saveCurrentColor() {
      if (this.savedColors.length >= 10) {
        alert("已保存10个颜色，请先删除一些再保存新颜色");
        return;
      }

      if (!this.savedColors.includes(this.currentColor)) {
        this.savedColors.push(this.currentColor);
        this.saveColorsToStorage();
        alert(`颜色 ${this.currentColor} 已保存！`);
      } else {
        alert("该颜色已存在保存列表中");
      }
    },

    // 删除已保存颜色
    removeSavedColor(index) {
      if (confirm("确定要删除这个颜色吗？")) {
        this.savedColors.splice(index, 1);
        this.saveColorsToStorage();
      }
    },

    // 清空历史记录
    clearHistory() {
      if (confirm("确定要清空最近使用记录吗？")) {
        this.recentColors = [];
        this.saveRecentColorsToStorage();
      }
    },

    // 添加到最近使用
    addToRecent(color) {
      // 移除重复项
      this.recentColors = this.recentColors.filter((c) => c !== color);
      // 添加到开头
      this.recentColors.unshift(color);
      // 限制最多10个
      if (this.recentColors.length > 10) {
        this.recentColors = this.recentColors.slice(0, 10);
      }
      this.saveRecentColorsToStorage();
    },

    // 本地存储
    saveColorsToStorage() {
      localStorage.setItem("savedColors", JSON.stringify(this.savedColors));
    },

    loadSavedColors() {
      const saved = localStorage.getItem("savedColors");
      if (saved) {
        this.savedColors = JSON.parse(saved);
      }
    },

    saveRecentColorsToStorage() {
      localStorage.setItem("recentColors", JSON.stringify(this.recentColors));
    },

    loadRecentColors() {
      const recent = localStorage.getItem("recentColors");
      if (recent) {
        this.recentColors = JSON.parse(recent);
      }
    },

    // 工具函数
    rgbToHex(r, g, b) {
      return (
        "#" +
        [r, g, b]
          .map((x) => {
            const hex = x.toString(16).padStart(2, "0");
            return hex;
          })
          .join("")
      );
    },

    hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    },

    isValidHex(hex) {
      return /^#([A-Fa-f0-9]{6})$/.test(hex);
    },
  },
};
</script>

<style scoped>
@keyframes pageShow {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.color-picker-page {
  padding: 30px;
  max-width: 1000px;
  margin: 0 auto;
  background: #ffffff;
  min-height: 100%;
  border-radius: 8px;
  animation: pageShow 0.5s;
}

.page-header {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.page-title {
  font-size: 24px;
  font-weight: 400;
  color: #333;
  margin: 0;
}

.color-picker-container {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 40px;
  align-items: start;
}

/* 左侧控制区域 */
.color-controls {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.color-preview-section {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.current-color-preview {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  border: 2px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.color-info {
  flex: 1;
}

.hex-value {
  font-family: "Courier New", monospace;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.rgb-value {
  font-size: 14px;
  color: #666;
  font-family: "Courier New", monospace;
}

.slider-controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.slider-group {
  display: flex;
  align-items: center;
  gap: 15px;
}

.slider-label {
  width: 40px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  font-family: "Courier New", monospace;
}

.slider {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: #ddd;
  outline: none;
  -webkit-appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.red-slider::-webkit-slider-thumb {
  background: #dc3545;
}
.green-slider::-webkit-slider-thumb {
  background: #28a745;
}
.blue-slider::-webkit-slider-thumb {
  background: #007bff;
}

.hex-input-group {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.input-label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  min-width: 40px;
}

.hex-input {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: "Courier New", monospace;
  font-size: 14px;
  width: 120px;
  background: #fff;
}

.save-section {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.save-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.save-button:hover {
  background: #218838;
}

/* 右侧颜色区域 */
.color-sections {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.color-section {
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  padding: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clear-history {
  cursor: pointer;
  font-size: 14px;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.clear-history:hover {
  opacity: 1;
}

.saved-count {
  font-size: 14px;
  color: #666;
  font-weight: normal;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.color-item {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 6px;
  border: 2px solid #ddd;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.color-item:hover {
  transform: scale(1.05);
  border-color: #999;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.empty-slot {
  background: #fff;
  border-style: dashed;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slot-label {
  color: #999;
  font-size: 12px;
}

.color-index {
  position: absolute;
  top: 2px;
  left: 2px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 10px;
  padding: 1px 4px;
  border-radius: 3px;
}

.delete-icon {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #dc3545;
  color: white;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.saved-color:hover .delete-icon {
  opacity: 1;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .color-picker-container {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .color-grid {
    grid-template-columns: repeat(10, 1fr);
  }
}

@media (max-width: 480px) {
  .color-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
