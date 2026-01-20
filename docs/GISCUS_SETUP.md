# Giscus 评论系统配置指南

Giscus 是一个基于 GitHub Discussions 的评论系统，完全免费且支持深色模式。

## 步骤 1: 准备 GitHub 仓库

1. **确保你的仓库是公开的**
   - 私有仓库无法使用 Giscus

2. **启用 GitHub Discussions**
   - 进入你的仓库页面
   - 点击 Settings
   - 滚动到 "Features" 部分
   - 勾选 "Discussions"
   - 确认启用

## 步骤 2: 安装 Giscus App

1. 访问 https://github.com/apps/giscus
2. 点击 "Install"
3. 选择你要使用的仓库
4. 确认安装

## 步骤 3: 获取配置信息

1. 访问 https://giscus.app
2. 填写以下信息：
   - **仓库**: `your-username/your-repo`
   - **页面 ↔️ discussions 映射关系**: 选择 `pathname`
   - **Discussion 分类**: 选择 `Announcements` 或 `General`
3. 页面会自动生成配置代码

4. 复制以下信息：
   - `data-repo`: 仓库名称 (如 `username/blog`)
   - `data-repo-id`: 仓库 ID
   - `data-category`: 分类名称
   - `data-category-id`: 分类 ID

## 步骤 4: 配置环境变量

在项目根目录创建 `.env.local` 文件：

```bash
# 复制示例文件
cp .env.example .env.local
```

编辑 `.env.local`，填入你的配置：

```bash
# Giscus Configuration
NEXT_PUBLIC_GISCUS_REPO=your-username/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=R_kgDOHxxxxxx  # 从步骤3获取
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDOHxxxxxx  # 从步骤3获取
```

## 步骤 5: 验证配置

1. 启动开发服务器：
   ```bash
   pnpm dev
   ```

2. 访问任意文章详情页（如 `/blog/welcome`）

3. 滚动到页面底部，你应该能看到：
   - 评论区标题"评论"
   - Giscus 评论组件
   - "用 GitHub 登录"按钮

## 常见问题

### Q: 评论区显示"评论功能尚未配置"

**A**: 检查以下几点：
1. `.env.local` 文件是否存在
2. 环境变量是否正确配置
3. 重启开发服务器（环境变量修改后需要重启）

### Q: 评论区显示"Discussion not found"

**A**:
1. 确保 Giscus App 已安装到仓库
2. 确保仓库已启用 Discussions
3. 检查 `repoId` 和 `categoryId` 是否正确

### Q: 评论无法保存

**A**:
1. 确保你已登录 GitHub
2. 确保仓库是公开的
3. 检查浏览器控制台是否有错误信息

### Q: 如何关闭评论功能？

**A**: 有两种方式：
1. **临时关闭**: 注释掉文章详情页中的 `<Comments />` 组件
2. **永久关闭**: 删除环境变量，评论区会显示配置提示

## 自定义选项

在 `src/components/blog/comments.tsx` 中，你可以调整以下配置：

```typescript
<Giscus
  theme={currentTheme}          // 主题：light / dark / transparent_dark
  lang="zh-CN"                  // 语言：zh-CN, en, ja, etc.
  loading="lazy"                // 加载方式：lazy / eager
  inputPosition="top"           // 输入框位置：top / bottom
  reactionsEnabled="1"          // 是否启用表情反应：0 / 1
  emitMetadata="0"              // 是否发送元数据：0 / 1
/>
```

## 参考链接

- Giscus 官网: https://giscus.app
- Giscus GitHub: https://github.com/giscus/giscus-component
- GitHub Discussions 文档: https://docs.github.com/en/discussions
