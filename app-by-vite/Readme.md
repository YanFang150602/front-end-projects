搭建一个使用React框架、支持TypeScript、使用Vite进行打包并支持路由的前端项目，可以按照以下步骤进行：

# 使用vite搭建

## 步骤1：安装Node.js和npm
确保你的系统中已经安装了Node.js和npm。你可以通过访问 Node.js官网下载并安装最新版本的Node.js，npm会随Node.js一起安装。

## 步骤2：创建React项目
使用Vite创建一个新的React项目，支持TypeScript。在命令行中运行以下命令：

```tsx
npm create vite@latest my-react-app -- --template react-ts
```

这将创建一个名为my-react-app的新目录，并在其中初始化一个使用React和TypeScript的Vite项目。

## 步骤3：安装React Router
在项目中安装React Router，以便支持路由。在项目目录中运行：

```bash
npm install react-router-dom
```

## 步骤4：配置路由
在src目录下创建一个新的文件AppRouter.tsx，用于配置路由。示例代码如下：

AppRouter.tsx

```tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
```

## 步骤5：创建页面组件
在src目录下创建pages目录，并在其中创建Home.tsx和About.tsx文件。示例代码如下：

Home.tsx:

```tsx
import React from 'react';

const Home: React.FC = () => {
  return <h2>Home Page</h2>;
};

export default Home;
About.tsx:
```

About.tsx

```tsx
import React from 'react';

const About: React.FC = () => {
  return <h2>About Page</h2>;
};

export default About;
```

## 步骤6：在App.tsx中使用路由
在App.tsx文件中导入并使用AppRouter组件。示例代码如下：

```tsx
import React from 'react';
import AppRouter from './AppRouter';

const App: React.FC = () => {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
};

export default App;
```

## 步骤7：运行项目
在项目目录中运行以下命令，启动开发服务器：

npm run dev
这将启动Vite开发服务器，你可以在浏览器中访问http://localhost:3000查看你的React应用。

## 步骤8：构建项目
当你准备好部署项目时，可以使用Vite进行构建。运行以下命令：

npm run build
这将在dist目录中生成优化后的静态文件，可以用于部署到任何静态文件服务器。

通过以上步骤，你将成功搭建一个使用React、TypeScript、Vite和React Router的前端项目。

# 手工搭建

手动搭建一个使用React、TypeScript、Vite和React Router的前端项目。

## 步骤1：安装Node.js和npm
确保你的系统中已经安装了Node.js和npm。你可以通过访问 Node.js官网下载并安装最新版本的Node.js，npm会随Node.js一起安装。

## 步骤2：创建项目目录
在你的工作目录中创建一个新的项目目录，例如app-by-vite，并进入该目录：

```bash
mkdir app-by-vite
cd app-by-vite
```

## 步骤3：初始化项目
使用npm初始化一个新的Node.js项目：

```bash
npm init -y
```

这将创建一个package.json文件，其中包含项目的依赖和脚本。

## 步骤4：安装React和TypeScript
安装React、ReactDOM和TypeScript：

```bash
npm install react react-dom
npm install --save-dev typescript @types/react @types/react-dom
```

## 步骤5：配置TypeScript
在项目根目录下创建一个tsconfig.json文件，配置TypeScript编译选项。示例配置如下：

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

## 步骤6：安装Vite
安装Vite作为开发服务器和构建工具：

```bash
npm install --save-dev vite
```

## 步骤7：配置Vite
在项目根目录下创建一个vite.config.ts文件，配置Vite。示例配置如下：

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

## 步骤8：安装React Router
对于React 19，React Router需要使用v6.16.0或更高版本。你可以通过以下命令安装最新版本的React Router：

```bash
npm install react-router-dom@latest
```

## 步骤9：创建项目结构
在项目根目录下创建src目录，并在其中创建以下文件和目录：

src/index.tsx：项目的入口文件。
src/App.tsx：应用的根组件。
src/pages：存放页面组件的目录。
src/AppRouter.tsx：配置路由的文件。

## 步骤10：编写代码
在src目录下编写代码：

### index.tsx:

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

在React 18中，ReactDOM.render方法已被废弃，推荐使用新的createRoot方法来创建和渲染React应用。下面我将指导你如何修改代码以适应React 18的变更。
将index.tsx文件中的ReactDOM.render方法替换为createRoot方法。修改后的代码如下：

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!); // dom元素不能为空
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```


### App.tsx:

```tsx
import React from 'react';
import AppRouter from './AppRouter';

const App: React.FC = () => {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
};

export default App;
```

### AppRouter.tsx:

```tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
      </Routes>
    </Switch>
  );
};

export default AppRouter;
```

在React Router v6中，Switch组件已被Routes组件替代。
将AppRouter.tsx文件中的Switch组件替换为Routes组件。修改后的代码如下：

```tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
```

### pages/Home.tsx:

```tsx
import React from 'react';

const Home: React.FC = () => {
  return <h2>Home Page</h2>;
};

export default Home;
```

### pages/About.tsx:

```tsx
import React from 'react';

const About: React.FC = () => {
  return <h2>About Page</h2>;
};

export default About;
```

## 步骤11：添加HTML模板
在项目根目录下创建一个index.html文件，作为应用的HTML模板。示例代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React App</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/index.tsx"></script>
</body>
</html>
```

## 步骤12：配置npm脚本
在package.json文件中添加以下脚本：

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "serve": "vite preview"
}
```

## 步骤13：运行项目
在项目目录中运行以下命令，启动开发服务器：

```bash
npm run dev
```

这将启动Vite开发服务器，你可以在浏览器中访问http://localhost:3000查看你的React应用。

## 步骤14：构建项目
当你准备好部署项目时，可以使用Vite进行构建。运行以下命令：

```bash
npm run build
```

这将在dist目录中生成优化后的静态文件，可以用于部署到任何静态文件服务器。

通过以上步骤，你将成功手动搭建一个使用React、TypeScript、Vite和React Router的前端项目。

React 19与React Router v6.30应该能够兼容使用。React Router v6.30支持React 18及以上版本，因此与React 19兼容。

# 路由对接页面

在项目根目录下创建以下文件和目录：

src/Navigation.tsx：导航组件。

## 步骤1：创建Navigation.tsx

```tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
```

## 步骤2：修改AppRouter.tsx文件

```tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './pages/Home';
import About from './pages/About';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
```

Link组件要放置在Router组件下，否则服务启动后浏览器上访问会报错

# 添加样式（使用less进行样式开发）

在Vite项目中，样式文件和图片文件的打包是通过Vite的插件系统和内置的构建工具来实现的。下面我将详细解释Vite如何处理这些文件。

** 1. 样式文件的处理 **
Vite使用vite-plugin-react插件来处理CSS、Less、SCSS等样式文件。在开发模式下，Vite会将样式文件转换为CSS，并通过<style>标签注入到HTML中。在生产模式下，Vite会将样式文件提取到单独的CSS文件中，并通过<link>标签引用。

开发模式
在开发模式下，Vite使用style-loader将样式文件转换为CSS，并通过<style>标签注入到HTML中。这样可以实现热重载，即在修改样式文件时，页面会自动刷新。

生产模式
在生产模式下，Vite使用mini-css-extract-plugin将样式文件提取到单独的CSS文件中，并通过<link>标签引用。这样可以实现样式文件的缓存和按需加载。

** 2. 图片文件的处理 **
Vite使用vite-plugin-react插件来处理图片文件。在开发模式下，Vite会将图片文件转换为Data URL或文件路径，并通过<img>标签引用。在生产模式下，Vite会将图片文件优化并生成唯一的文件名，以实现缓存和按需加载。

开发模式
在开发模式下，Vite使用url-loader将图片文件转换为Data URL或文件路径，并通过<img>标签引用。这样可以实现图片的快速加载和热重载。

生产模式
在生产模式下，Vite使用image-minifier插件来优化图片文件，并生成唯一的文件名。这样可以实现图片的缓存和按需加载。

在Vite项目中，不需要再安装style-loader、mini-css-extract-plugin、url-loader等插件。Vite内置了这些功能，因此不需要手动安装这些插件。

## 安装less相关包
在Vite项目中，如果你使用了Less样式，你需要安装less和less-loader包。Vite内置了对CSS、Less、SCSS等样式文件的支持，但需要相应的预处理器包来处理这些文件。

安装Less和Less Loader
运行以下命令安装less和less-loader：

```bash
npm install less less-loader -D
```

## 修改vite配置文件

在vite.config.ts文件中配置Less预处理器选项。修改后的代码如下：

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "./src/globalStyle.less";`, // 会在其他的less文件里自动引入，分号别忘记
      },
    },
  },
});
```

遇到 【less】missing semi-colon or unrecognised media features on import报错：
这个错误信息通常表示在导入CSS或Less文件时，语法有误或缺少分号。在Vite项目中，如果你在additionalData中使用了@import语句，确保路径和文件名正确，并且文件存在。

解决方法
检查路径和文件名：确保@import语句中的路径和文件名正确，文件存在且可访问。

添加分号：确保@import语句后面有分号。

检查媒体查询：如果使用了媒体查询，确保语法正确。

## 创建样式文件

全局样式文件globalStyle.less

```less
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

nav {
  background-color: #333;
  color: #fff;
  padding: 10px;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 10px;
}

nav ul li {
  display: inline;
}

nav ul li a {
  color: #fff;
  text-decoration: none;
  padding: 5px 10px;
}

nav ul li a.active {
  font-weight: bold;
  background-color: #555;
  border-radius: 5px;
}
```

全局组件会因为vite.config.ts里css下配置的additionalData，被引入到其他的less文件里，可以不需要再单独import

为组件添加样式

Home.less

```less
.home {
    backgroundColor: black;
}
```

将Home.less文件import到Home组件里，修改Home.tsx

```tsx
import React from 'react';
import './Home.less';

const Home: React.FC = () => {
  return (
    <div className="home">
      <h2>Home Page</h2>
    </div>
  );
};

export default Home;
```

About.less

```less

```

将About.less文件import到About组件里，修改About.tsx

```tsx
import React from 'react';
import './About.less';

const About: React.FC = () => {
  return (
    <div className="about">
      <h2>About Page</h2>
    </div>
  );
};

export default About;
```
