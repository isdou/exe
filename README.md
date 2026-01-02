# DOU.EXE - Personal Digital Terminal (v6.0)

> A retro-futuristic personal website styled as a CRT terminal.
> Built with React, Vite, Tailwind CSS, and Framer Motion.

## 📋 Changelog (Latest Updates)

### 🎨 UI & Visual Enhancements
* **Music "Ticket Stub" Design**: 重构了音乐详情页 (`Curation.tsx`)。现在点击音乐专辑，会弹出一张拟物化的“演唱会门票”样式，包含撕票线、条形码和旋转的唱片动画。
* **Compact Movie Cards**: 优化了电影卡片的尺寸，减小了高度和字体大小，使 Grid 视图下信息密度更合理。
* **Book Metadata**: 书籍详情页新增了 **阅读日期 (Finished On)**、**总字数 (Word Count)** 和 **ISBN** 字段，并优化了标签颜色为高亮白。
* **Bezel Navigation**: 在屏幕下方新增了 **实体按键导航栏 (`BezelNav`)**。即使隐藏遥控器，也能通过屏幕下方的物理按钮切换频道。

### ⚡ Interaction & UX
* **Instant Boot**: 系统默认电源状态改为 **ON**。跳过了开机引导动画，进入页面即刻操作。
* **Toggleable Remote**: 侧边遥控器默认 **隐藏**，提供更沉浸的全屏体验。右下角新增悬浮开关，可随时呼出/隐藏遥控器。
* **Responsive Layout Fix**: 修复了隐藏遥控器时，电视机容器高度溢出屏幕的问题。添加了最大高度限制 (`max-h`)，确保在任何分辨率下底栏都可见。

### 🛠 System Architecture & Cleanup
* **Journal Restoration**: 恢复了基于日历视图的 **日记 (`Journal`)** 模块，用于线性记录生活流水账。
* **Module Pruning**: 删除了定位重复的 `Fragments` (灵感碎片) 模块，将记录功能统一收敛至 Journal。
* **Dead Code Removal**: 清理了未使用的组件文件：
    * `WorldMap.tsx` (已废弃)
    * `CityLogs.tsx` (已废弃)
    * `Fragments.tsx` (功能合并)

---
