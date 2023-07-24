

# 工作日志

- [x] 创建文件以及基础设置



- [x] 变量选择
  - [x] function set
  - [x] 更变为列表按钮



- [x] 重置视图按钮



- [x] refresh bottom debug Jul 24 yifeng



- [x] 添加高度信息

  - [x] 添加高度信息

  - [x] 边线换色（无边线） Jul24 Yifeng

  - [x] 添加三维视图转换

  - [x] reset bug修复

    目前只重置缩放比和位置，不重置视角



- [x] 添加鼠标交互

  - [x] 鼠标交互，接近即闪亮

  - [x] 弹出基本信息框（编号）

    

    出现bug！对象选择变成了整grid。需要改进为grid cell。

    ChatGPT的建议是：

    ​	在 Mapbox GL JS 中，当你对地图图层（如你的 'grid' 图层）注册鼠标点击事件时，你实际上是在选择由 GeoJSON 文件定义的地理要素（features）。如果你的 GeoJSON 文件定义的是一组独立的要素（例如，一组多边形，每个多边形代表一个 grid cell），那么你点击地图时实际上是在选择单个的地理要素（即，单个的 grid cell）。

    在你的 `map.on('click', 'grid', function(e) {...}` 事件处理器中，`e.features[0]` 是被点击的地理要素（即 grid cell）。`e.features` 数组包含了所有被点击的地理要素，因此如果你的点击覆盖了多个要素，你可以在这个数组中找到它们。通常情况下，你只会点击到一个要素，因此我们使用 `e.features[0]`。

    如果你发现你的点击事件在多个 grid cell 上触发，可能是因为你的 GeoJSON 文件没有将这些 grid cell 定义为独立的要素，或者是因为你的地图样式（如 grid cell 的边框或填充）导致了重叠。在这种情况下，你需要检查并可能需要调整你的 GeoJSON 文件或地图样式。

  - [x] 点击得到数值，在右下显示

  - [x] 右下角增添网格同步详细信息



- [x] 分模式

  - [x] refresh按钮变成两个模式的切换

    - [x] ui，按钮按完后字发生改变

    - [x] function，按钮按下改变模式（grid layer's type）

      

  - [ ] 网格模式增加鼠标悬停加白框功能




- [x] 详细信息框点击隐藏

  - [x] 默认隐藏
  - [x] 刷新
  - [x] 点击隐藏

  