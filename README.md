# Browser Translate 浏览器沉浸式翻译

Browser Translate 是一个适用于 Chrome 的 Tampermonkey 用户脚本，用来在网页中进行沉浸式双语翻译。安装后，页面右侧会出现一个悬浮翻译按钮；点击后脚本会提取当前网页中可见的文本，并把译文以内联方式显示在原文旁边或下方。

本项目基于 [`lete114/chrome-translate`](https://github.com/lete114/chrome-translate) 二次整理，保留 Chrome 内置 AI 翻译能力，并补充了 TypeScript 配置重构、更安全的 HTML 渲染处理和更清晰的使用文档。

## 主要功能

- 网页全文双语翻译：保留原文，同时显示译文。
- 替换模式：可选择直接用译文替换原内容。
- 划词翻译：选中文字后显示快捷翻译按钮。
- Chrome AI Provider：使用 Chrome 内置 Translator API / Language Detector API。
- OpenAI 兼容 Provider：可配置 OpenAI 或兼容接口进行翻译。
- HTML / Text 两种翻译模式：可在保守纯文本模式和保留部分行内结构的 HTML 模式之间切换。
- LFU 缓存：缓存重复文本的翻译结果，减少重复调用。
- 设置面板：可管理语言、Provider、显示模式、缓存、日志等。
- 安全处理：HTML 模式会在插入译文前清理不安全标签和属性，降低页面注入风险。

## 环境要求

- Chrome 138 或更高版本。
- 一个用户脚本管理器，推荐 [Tampermonkey](https://www.tampermonkey.net/)。
- 如果使用 Chrome AI Provider，浏览器需要支持对应的 Chrome Translator API 和 Language Detector API。
- 如果使用 OpenAI 兼容 Provider，需要准备 API Key、Base URL 和模型名称。

## 安装方法

### 1. 安装 Tampermonkey

先在 Chrome 中安装 Tampermonkey。安装完成后，浏览器右上角会出现 Tampermonkey 扩展图标。

### 2. 安装本脚本

打开下面的脚本链接：

[安装 Browser Translate 用户脚本](https://raw.githubusercontent.com/ZhaoJun233/browser-translate/refs/heads/main/dist/browser-translate.user.js)

Tampermonkey 会自动打开安装页面。确认脚本名称和来源无误后，点击页面上的“安装”按钮。

### 3. 刷新网页

脚本安装完成后，刷新你想翻译的网页。页面右侧会出现一个绿色圆形悬浮按钮，表示脚本已经加载成功。

## 使用说明

### 网页全文翻译

1. 打开任意需要翻译的网页。
2. 点击页面右侧的绿色悬浮翻译按钮。
3. 脚本会扫描当前页面中可见的文本内容。
4. 翻译完成后，译文会显示在原文旁边或原文下方。
5. 再次点击悬浮按钮，可以停止翻译并移除已经插入的译文。

脚本使用 IntersectionObserver 按可见区域逐步翻译页面内容，所以长页面不会一次性翻译全部文本。滚动页面时，新进入视口的内容会继续排队翻译。

### 划词翻译

1. 在网页中用鼠标选中一段文本。
2. 停顿片刻后，选区附近会出现一个小的翻译按钮。
3. 点击该按钮，弹窗中会显示译文和原文。
4. 点击弹窗右上角关闭按钮，或滚动页面，即可隐藏弹窗。

划词翻译默认启用，可以在设置面板中关闭。

## 设置面板

把鼠标移动到悬浮按钮附近，会看到设置入口。点击设置按钮后，可以调整以下选项。

### Language 语言设置

- Source Language：源语言。选择 `Auto` 时，脚本会尝试自动检测网页语言。
- Target Language：目标语言。请选择你希望翻译成的语言。

如果源语言和目标语言相同，脚本会跳过翻译。

### Translation Mode 翻译模式

- Text：纯文本模式。更安全、更稳定，适合大多数网页。
- HTML：HTML 模式。会尽量保留链接、加粗、行内代码等部分行内结构。该模式会清理不安全标签和属性，但仍建议只在可信网页上使用。

优先推荐使用 Text 模式。只有当你确实需要保留网页中的行内格式时，再切换到 HTML 模式。

### Display Mode 显示模式

- Bilingual：双语模式。原文保留，译文插入在原文旁边或下方。
- Replace：替换模式。用译文替换原内容。

如果想对照阅读，使用 Bilingual；如果想获得更接近“整页翻译”的效果，使用 Replace。

### Performance 性能设置

- Max concurrent requests：最大并发翻译数。
- 默认值为 `6`。
- 数值越大，翻译速度可能越快，但页面压力和 API 请求压力也会增加。

如果遇到网页卡顿、接口限流或翻译失败，可以把并发数调低。

### Selection Translate 划词翻译

- 开启后，选中网页文本会出现快捷翻译按钮。
- 关闭后，不再显示划词翻译入口。

如果你经常复制网页内容，觉得划词按钮打扰操作，可以关闭这个选项。

## Provider 说明

### Chrome AI

默认 Provider 是 Chrome AI。它调用 Chrome 内置的 Translator API 和 Language Detector API。

特点：

- 默认不需要配置 API Key。
- 更适合隐私敏感场景。
- 是否可用取决于当前 Chrome 版本、系统环境和 Chrome 对内置 AI API 的支持情况。
- 首次使用某些语言时，Chrome 可能需要下载语言模型。

如果页面提示 `Translator API is not available` 或语言不支持，可以尝试升级 Chrome，或切换到 OpenAI API Provider。

### OpenAI API

OpenAI API Provider 用于调用 OpenAI 或兼容 OpenAI Chat Completions 格式的接口。

需要配置：

- API Key：接口密钥。
- Base URL：接口地址，例如 `https://api.openai.com/v1`。
- Model：模型名称，例如 `gpt-4o-mini`。
- System Prompt：翻译提示词。
- Temperature：温度参数。
- Max Tokens：最大输出长度。

注意：启用 OpenAI API Provider 后，网页文本或划词文本会被发送到你配置的接口地址。请不要在银行、公司后台、私密邮件、工单系统等敏感页面随意启用远程 Provider。

## 缓存和日志

### Cache 缓存

脚本会缓存已翻译过的文本，避免重复翻译相同内容。缓存面板中可以查看：

- 缓存条目数量。
- 已使用空间。
- 原文和译文。
- 命中频率。

你可以搜索缓存、编辑缓存条目、删除单条缓存，或清空全部缓存。

### Logs 日志

日志面板会记录脚本运行过程中的信息，例如：

- 翻译开始和结束。
- 缓存命中或未命中。
- Provider 错误。
- 翻译失败原因。

如果遇到问题，先打开日志面板查看错误信息。

## 常见问题

### 页面没有出现悬浮按钮

请检查：

1. Tampermonkey 是否启用。
2. Browser Translate 脚本是否启用。
3. 当前页面是否刷新过。
4. 当前页面是否是浏览器内部页面，例如 `chrome://extensions`。用户脚本通常无法在这类页面运行。

### 点击翻译后没有结果

请检查：

1. 是否已经设置目标语言。
2. 当前源语言和目标语言是否相同。
3. 日志面板是否有错误提示。
4. 如果使用 Chrome AI，当前 Chrome 是否支持 Translator API。
5. 如果使用 OpenAI API，API Key、Base URL、Model 是否正确。

### 翻译速度慢

可以尝试：

- 调高并发数。
- 滚动到需要阅读的部分，让脚本优先翻译可见内容。
- 使用缓存减少重复翻译。
- 如果接口限流，则调低并发数。

### HTML 模式下页面样式异常

HTML 模式会尝试保留部分行内结构，但不同网页结构差异很大。如果发现布局异常，建议切回 Text 模式。

### OpenAI API 返回 400 错误

脚本会自动尝试在 `developer` / `system` 角色之间做一次兼容处理。如果仍然失败，请检查：

- 模型是否支持 Chat Completions。
- Base URL 是否正确。
- API Key 是否有权限。
- Prompt 是否被改坏。

## 隐私说明

默认 Chrome AI Provider 会使用 Chrome 内置 API 进行翻译。OpenAI API Provider 则会把待翻译文本发送到你配置的远程接口。

建议：

- 日常网页阅读优先使用 Chrome AI。
- 敏感页面不要启用远程 Provider。
- 定期清理缓存，避免长期保存敏感文本。
- 不要把 API Key 分享给他人。

## 开发说明

安装依赖：

```bash
pnpm install
```

运行代码检查：

```bash
pnpm lint
```

构建用户脚本：

```bash
pnpm build
```

构建产物位置：

```text
dist/browser-translate.user.js
```

## 项目结构

```text
src/core/renderer.ts        页面渲染、翻译队列、DOM 观察和安全 HTML 插入
src/core/textExtractor.ts   文本节点提取、段落分组、行内标签占位符处理
src/core/translator.ts      翻译 Provider 管理和语言检测
src/components/ct-ball.ts   悬浮翻译按钮和设置面板入口
src/components/ct-selection.ts 划词翻译弹窗
src/components/ct-settings.ts  设置面板
src/utils/config.ts         配置默认值、归一化、读取和保存
src/utils/LFUCache.ts       LFU 翻译缓存
```

## 本次验证

当前版本已通过：

```bash
pnpm lint
pnpm build
```

## 许可证

MIT。详见 [LICENSE.md](LICENSE.md)。
