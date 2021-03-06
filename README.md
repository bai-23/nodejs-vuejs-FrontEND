# 【前端部分】Node.js + Vue.js 王者助手+管理后台

### 环境安装

`npm i`

### 启动项目

`npm run serve`

### 编译项目

`npm run build`

---



# 大纲

## 一、 入门

1. 项目介绍
1. 工具安装和环境搭建(nodejs,npm,mongodb)
1. 初始化项目

## 二、 管理后台

1. 基于Element UI的后台管理基础界面搭建

1. 创建分类
1. 分类列表
1. 修改分类
1. 删除分类
1. 子分类

1. **通用 CRUD 接口**

1. 装备管理
1. 图片上传 (multer)

1. 英雄管理
1. 编辑英雄 (关联,多选,el-select, multiple)
1. 技能编辑

1. 文章管理
1. 富文本编辑器 (quill)

1. 首页广告管理

1. 管理员账号管理 (bcrypt)
1. 登录页面
1. 登录接口 (jwt,jsonwebtoken)
1. 服务端登录校验
1. 客户端路由限制 (beforeEach, meta)
1. 上传文件的登录校验 (el-upload, headers)

## 三、移动端网站

1. "工具样式"概念和 SASS (SCSS)
1. 样式重置
1. 网站色彩和字体定义 (colors, text)
1. 通用flex布局样式定义 (flex)
1. 常用边距定义 (margin, padding)
1. 主页框架和顶部菜单
1. 首页顶部轮播图片 (vue swiper)
1. 使用精灵图片 (sprite)
1. 使用字体图标 (iconfont)
1. 卡片组件 (card)
1. 列表卡片组件 (list-card, nav, swiper)
1. 首页新闻资讯-数据录入(+后台bug修复)
1. 首页新闻资讯-数据接口
1. 首页新闻资讯-界面展示
1. 首页英雄列表-提取官网数据
1. 首页英雄列表-录入数据
1. 首页英雄列表-界面展示
1. 新闻详情页
1. 新闻详情页-完善
1. 英雄详情页-1-前端准备
1. 英雄详情页-2-后台编辑
1. 英雄详情页-3-前端顶部
1. 英雄详情页-4-完善

## 四、发布和部署 (阿里云)

1. 生产环境编译
1. 购买域名和服务器
1. 域名解析
1. Nginx 安装和配置
1. MongoDB数据库的安装和配置
1. git 安装、配置ssh-key
1. Node.js 安装、配置淘宝镜像
1. 拉取代码，安装pm2并启动项目
1. 配置 Nginx 的反向代理
1. 迁移本地数据到服务器 (mongodump)

## 五、进阶

1. 使用免费SSL证书启用HTTPS安全连接
1. 使用阿里云OSS云存储存放上传文件





# 步骤

## 一、初始化

- 初始化文件夹

  - server

    `npm init -y`

  - web

    `vue create web`

  - admin

    `vue create admin`

- serve文件夹下

  - 创建index.js入口文件

  - 配置package.json

    - script属性

      ```
      "serve": "nodemon index.js"
      ```

- *新建git仓库





## 二、管理后台

### 1.基于Element UI的后台管理基础界面搭建（官网）

> admin文件夹

- 安装elementUI插件

  `vue add element`

- 安装路由

  `vue add router`

- 在router/index.js引用页面



### 2.创建分类页面（客户端）

- ##### 修改主界面（admin/views/Main.vue）

  - 将菜单设置路由

  ```vue
  <el-menu router :default-openeds="['1', '3']">
  	<el-menu-item index="/categories/create">新建分类</el-menu-item>
      <el-menu-item index="/categories/list">分类列表</el-menu-item>
  </el-menu>
  ```

- ##### 创建CategoryEdit.vue新建分类页面

  - ###### 在router中引入该页面

    - 引入方式：Main的子路由

  ```javascript
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [{
      path: '/categories/create',
      component: CategoryEdit
    }]
  }
  ```

  - ###### 调整样式

  ```vue
  <template>
    <div class="about">
      <h1>新建分类</h1>
  
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="名称">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  @submit.native.prevent="save"
  native表示原生表单，prevent表示阻止跳转
  ```

  - ###### 双向绑定model（data）

  ```javascript
  // 当表单中数据改变时，model中的name同时改变
  data() {
    return {
      model: {}
    }
  },
  // <el-input v-model="model.name"></el-input>
  
  优化思路：前端验证
  ```

  - ###### 保存提交数据的方法 ：save

    - 安装axios

    - 新建http.js，封装axios请求方法，设置baseURL等

    - 在main.js导入http并绑定到原型

      ```javascript
      Vue.prototype.$http = http
      调用：this.$http
      ```

  ```javascript
  async save() {
    const res = await this.$http.post('categories', this.model)
    this.$router.push('/categories/list')
    this.$message({
      type: "success",
      message: res + '保存成功'
    })
  }
  ```



### 3.创建分类（服务端接口）

> server文件夹

- 安装express框架

  `npm i express@next mongoose cors`

- 加载expres（server/index.js），创建web服务器（端口：3000）

- 完成后端路由

  - 一般直接写在server/index.js文件中，为了方便维护，将后端路由统一放在server/routes/admin/index.js中

  - ```javascript
    // 导出方式：
    module.exports = app => {}
    
    // server/index.js引用：
    require('./routes/admin')(app)
    ```

  ```javascript
  module.exports = app => {
    const express = require('express')
    const router = express.Router() // 定义一个子路由
    const Category = require('../../models/Category') // 加载分类数据库
  
    router.post('/categories', async (req, res) => {
      const model = await Category.create(req.body)
      res.send(model)
    })
  
    app.use('/admin/api', router) // 将子路由挂载到api接口上
  }
  ```

- 创建数据库（server/plugins/db.js）

  ```javascript
  module.exports = app => {
    const mongoose = require('mongoose')
    
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }
  ```

  - server/index.js引用：

    ```JavaScript
    require('./plugins/db')(app)
    ```

- 创建分类数据库模型（server/models/Category.js）

  ```JavaScript
  const mongoose = require('mongoose')
  
  const schema = new mongoose.Schema({
    name: { type: String }
  })
  
  module.exports = mongoose.model('Category', schema)
  ```

  - 在server/index.js中加载

    ```
    const Category = require('../../models/Category') // 加载分类数据库
    ```

  - 创建数据

    ```
    Category.create(req.body)
    ```

    - 前提（server/index.js中引入）

      ```javascript
      app.use(require('cors')()) //跨域模块
      app.use(express.json())
      ```

  - 发送到客户端页面

    ```
    res.send(model)
    ```

- 在前端页面发起请求（CategoryEdit.vue）

  ```javascript
  async save() {
    const res = await this.$http.post('categories', this.model)
    this.$router.push('/categories/list') // 创建好后跳转到分类列表
    this.$message({	// 提示成功
      type: "success",
      message: res + '保存成功'
    })
  }
  // 使用 async...await，与后端相同，将异步回调的写法换成同步的写法
  ```



### 4.分类列表

- 新建CategoryList.vue（admin/src/views/）

- 在admin/router/index.js中设置前端子路由

  ```
  {
    path: '/categories/list',
    component: CategoryList
  }
  ```

- 完成CategoryList.vue页面-

- 服务端分类列表接口（server/routes/admin/index.js）

  ```
  router.get('/categories', async (req, res) => {
    const items = await Category.find().limit(10)
    res.send(items) // 将获取的items发送给前端
  })
  ```



### 5.分类操作curd

- 完善CategoryList.vue页面

  - 添加操作按钮

  ```
  <template slot-scope="scope">
            <el-button type="text" size="small"
                       @click="$router.push(`categories/edit/${scope.row._id}`)">编辑</el-button>
  <!-- scope.row._id 表示当前这一行的id -->
  </template>
  ```

- 添加前端路由

  ```
  { path: '/categories/edit/:id', component: CategoryEdit, props: true }, // 将id注入到CategoryEdit页面，使CategoryEdit能直接使用id
  ```



### 6.分类删除

- 后端路由

  ```
  // 删除分类接口
  router.delete('/categories/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })
  ```

- remove方法（CategoryList.vue页面）

  ```javascript
  // 参数row为scope.row
  
  async remove(row) {
    this.$confirm(`是否确定删除分类"${row.name}"`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      await this.$http.delete(`categories/${row._id}`)
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
      this.fetch() // 重新获取数据
    })
  }
  ```

### 7.子分类

- 在数据库表结构添加摸板规则

  ```javascript
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category'},
  // ref: 'Category'表示关联数据库对象
  ```

- 父级分类的选择

  - 获取到所有分类
  - 默认当前分类

- 通过`parents`属性保存父级分类

- 优化思路：将分类级别越高的排在下拉列表最上面



### 8.通用 CRUD 接口封装 ★

- 将请求路径与参数定义成变量，再对前端请求传的路径进行处理转换（inflection插件）
- model命名规范
  - Category -- categories（url）

```
const modelName = require('inflection').classify(req.params.resource)
// categories =》Category
```

```javascript
app.use('/admin/api/rest/:resource',  async (req, res, next) => {
  const modelName = require('inflection').classify(req.params.resource)
  req.Model = require(`../../models/${modelName}`)
  next()
}, router)

// const Category = require('../../models/Category') 原版
```



### 9.装备（物品）管理

>  同分类管理



### 10.物品图片上传

- 安装multer中间件上传图片（server）

  ```javascript
  // admin/index.js
  const multer = require('multer')
  // 定义上传目标，即上传的内容放到哪个文件夹（动态获取路径）
  const upload = multer({dest: __dirname + '/../../uploads'})
  ```

- 完成后端上传路由接口

  ```javascript
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file) // 发送到前端
  })
  
  // upload.single表示接受单个文件上传
  ```

- 前端获取接口

  ```javascript
  <el-upload
    class="avatar-uploader"
    :action="$http.defaults.baseURL + '/upload'"
    :show-file-list="false"
    :on-success="afterUpload">
    <img v-if="model.icon" :src="model.icon" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  
  :action="$http.defaults.baseURL + '/upload'"
  // $http.defaults.baseURL即为 'http://localhost:3000/admin/api' 
  // 在模板中不需要this.$http, 因为this指向的就是该模板
  ```

- 开放静态文件

  ```javascript
  app.use('/uploads', express.static(__dirname + '/uploads'))  // 开放静态资源/uploads可访问
  ```

- 上传完之后的赋值操作

  ```javascript
  afterUpload(res) {
    this.$set(this.model, 'icon', res.url)  // 显示赋值
    // this.model.icon = res.url    // 隐式赋值，这种可能赋不上（vue响应式原理）
    // 除非在data属性中初始化变量
    // this.$set实现动态增加属性
  },
  ```



### 11.英雄管理

> 同分类页面

- 创建英雄数据库模型（server/model/Hero.js）

- 完成英雄新建、展示接口

  

### 12.英雄数据摸板字段

- 继续定义数据模型字段

  ```javascript
  const schema = new mongoose.Schema({
    name: { type: String },		// 英雄名字
    avatar: { type: String },		// 英雄头像
    title: { type: String },		// 简介
      
    //英雄定位（战士/刺客）
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],	
      
    scores: {						// 评分
      difficult: { type: Number },// 难度
      skills: { type: Number },	// 技巧
      attack: { type: Number },	// 攻击
      survive: { type: Number }	// 生存
    },
      
    skills: [{					// 技能
      icon: { type: String },		// 图标
      name: { type: String },		// 技能名称
      description: { type: String },// 技能描述
      tips: { type: String }		// 技能tips
    }]，
      
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], //顺风出装推荐
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], //逆风出装推荐
      
    usageTips: { type: String }, 	// 使用技巧
    battleTips: { type: String },	// 对抗技巧
    teamTips: { type: String },	// 团战技巧
        
    partners: [{					// 最佳搭档
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'},		// 英雄头像
      description: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'}// 原因描述
    }],    
  })
  ```

- 编辑表单

  

### 13.技能管理

```
<el-tab-pane label="技能" name="skills">
  <el-button size="small" @click="model.skills.push({})"><i class="el-icon-plus"></i> 添加技能</el-button>
  <el-row type="flex" style="flex-wrap:wrap;">
    <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
      <el-form-item label="名称">
        <el-input v-model="item.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload">
          <!--   $http.defaults.baseURL即为 'http://localhost:3000/admin/api'      -->
          <img v-if="item.icon" :src="item.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="item.description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="提示">
        <el-input v-model="item.tips" type="textarea"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
</el-tab-pane>
```

- 技能数据交互



### 14.文章管理

- 数据模型

  ```javascript
  const schema = new mongoose.Schema({
    title: { type: String },		// 标题
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
      // 文章分类
    body: { type: String } // 内容
  })
  ```

- 富文本编辑器

  > 安装
  >
  > npm i vue2-editor --save

- 上传图片

  > vue2-editor官网





### 15.广告管理（幻灯片等）

- 数据模型

  ```javascript
  const schema = new mongoose.Schema({
    name: { type: String },	// 广告名称
    items: [{		
      image: { type: String },// 广告图片	
      url: { type: String },	// 广告链接
    }],
  })
  ```





### 16.管理员账号管理

- 数据模型

  ```
  const schema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
  })
  ```

- 前端页面

- 前端路由

- 散列加密（server）

  >  安装
  >
  >  npm i bcrypt

  ```javascript
  type: String,
  select: false,		// 该属性作用（false）：查不出密码（不显示的功能）
  password: {
    type: String,
    set(val) {
    return require('bcrypt').hashSync(val, 10)
    // “10”表示加密指数，越大越安全，但是耗性能，一般取10-20
    // 比md5加密严格    
    }
  },
  ```

- 登陆页面

  - 前端路由

    ```
    { path: '/login', name: 'login', component: Login, meta: { isPublic: true } }
    ```

- 登陆接口

  1、根据用户名找用户（admin/index.js后端路由）

  ```javascript
  const AdminUser = require('../../models/AdminUser')
  const user = await AdminUser.findOne({
    username
  })
  if (!user){
    return res.status(422).send({
      message: '用户不存在'  // 发给前端弹出框
    })
  }
  ```

  - 响应拦截器
    - 查找用户是否存在（admin/http.js）

  ```javascript
  http.interceptors.response.use(res => {
    return res
  }, err => {
    if (err.response.data.message){
      Vue.prototype.$message({
        type: "error",
        message: err.response.data.message	// 接收后端message
      })
    }
    return Promise.reject(err)
  })
  ```

  2.校验密码

  ```
  const isValid = require('bcrypt').compareSync(password, user.password)
  if (!isValid) {
    return res.status(422).send({
      message: "账号或密码错误"
    })
  }
  ```

  3.返回token

  > 安装(server)
  >
  > npm i jsonwebtoken

  ```javascript
  （server/index.js）
  app.set('secret', 'errs55454da')  //  生成token的参数变量
  
  (admin/index.js)
  const jwt = require('jsonwebtoken')
  // 根据用户id + secret生成token
  const token = jwt.sign({ id: user._id }, app.get('secret'))
  res.send({token})
  ```

  ```javascript
  // 前端
  async login () {
    const res = await this.$http.post('login', this.model)
    localStorage.token = res.data.token  // 把token保存到浏览器
    this.$router.push('/admin_users/list')
    this.$message({
      type: 'success',
      message: '登录成功'
    })
  },
  ```

- 服务端登陆校验

  1、设置请求拦截器（admin/http.js）

  - 给每一次请求头加上**Authorization**属性

    ```javascript
    // 请求拦截器
    http.interceptors.request.use(config => {
      if(localStorage.token) {
        // 给所有请求加一个Authorization请求头
        config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
      }
      return config
    }, err => {
      return Promise.reject(err)
    })
    ```

  2、修改获取资源列表接口，检验用户是否登录，通过**Authorization**判断

  ```javascript
  router.get('/', async (req, res, next) => {
    // 校验用户是否登录（中间件）
    // 1.获取用户信息id（前端传请求头）
    const token  = String(req.headers.authorization || '').split(' ').pop()
    const { id } = jwt.verify(token, app.get('secret')) // 解析、解构赋值获取id
    req.user = await AdminUser.findById(id)
    console.log(req.user)
    await next()
  }, async (req, res) => {
    const queryOptions = {}
    if(req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items) // 将获取的items发送给前端
  })
  ```

  3.assert

  >安装（server）：
  >
  >npm i http-assert
  >
  >作用：
  >
  >​	判断或确保一个东西是否存在或正确

  ```javascript
  assert(user, 422, '此用户不存在')
  // 等效
  if (!user){
    return res.status(422).send({
      message: '用户不存在'  // 发给前端弹出框
    })
  }
  ```

- 错误处理函数

  ```javascript
  // 错误处理函数（中间件）
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    })
  })
  ```



### 17.客户端路由限制

- 路由守卫beforeEach

```javascript
// 每次进入路由之前的路由守卫
router.beforeEach((to, from, next) => {
  // 如果没有isPublic或用户token，则跳转到登录页面
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})
```

### 18.上传文件处理





## 三、移动端网站

#### 1.“工具样式”概念和SASS（SCSS）

> 安装
>
> npm i -D sass sass-loader@10.1.1 node-sass
>
> 注意版本问题！！
>
> sass-loader 11.x版本太高有问题，降到10.1.1就行

### 2.样式重置

### 3.网站色彩与字体定义（风格）

```scss
/* 定义色彩风格变量 */
$colors: (
  "primary": #db933f,
  "white": #fff,
  "light": #f9f9f9,
  "grey": #999,
  "dark-1": #343440,
  "dark": #222,
  "black": #000,
);
/* color&background-color：生成色彩(工具类) */
@each $colorKey, $color in $colors {
  .text-#{$colorKey} {
    color: $color;  /* 字体颜色类 */
  }
  .bg-#{$colorKey} {
    background-color: $color; /* 背景颜色类 */
  }
}

/* text-align：文本对齐方式（工具类） */
@each $var in (left, center, right) {
  .text-#{$var} {
    text-align: $var;
  }
}

/* font-size：字体尺寸（工具类） */
$base-font-size: 1rem;  // 相对于html定义的字体大小倍数：13px(1rem)
$font-sizes: (
  xs: 0.7692, // 10px
  sm: 0.9231, // 12px
  md: 1,      // 13px
  lg: 1.0769, // 14px
  xl: 1.2308  // 16px
);
@each $sizeKey,$size in $font-sizes {
  .fs-#{$sizeKey} {
    font-size: $size * $base-font-size;
  }
}
```



### 4.通用flex布局样式

```scss
/*
  通用flex布局样式
*/
.d-flex {
  display: flex;
  /* 默认垂直布局 */
}
.flex-column {
  flex-direction: column; /* 水平布局 */
}

/* 主轴对齐方式: justify-content */
$flex-jc: (
  start: flex-start,
  end: flex-end,
  center: center,
  between: space-between,
  around: space-around,
);
@each $key, $value in $flex-jc {
  .jc-#{$key} {
    justify-content: $value;
  }
}
/* 交叉轴对齐方式: align-items */
$flex-ai: (
  start: flex-start,
  end: flex-end,
  center: center,
  stretch: stretch,
);
@each $key, $value in $flex-ai {
  .ai-#{$key} {
    align-items: $value;
  }
}

.flex-1 {
  flex: 1;
}
.flex-grow-1 {
  flex-grow: 1;
}
```



### 5.常用边距定义

```scss
/*
  常用边距定义（space） ----------------------------------------------------------
*/
$spacing-types: ( m: margin, p: padding );
$spacing-directions: ( t: top, r: right, b: bottom, l: left );
$spacing-base-size: 1rem; /* 基础大小，后面的倍数表示该基础的多少倍 */
$spacing-sizes: (
  0: 0,
  1: 0.25,
  2: 0.5,
  3: 1,
  4: 1.5,
  5: 3,
);
@each $typeKey, $type in $spacing-types {
  // .m-1
  @each $sizeKey, $size in $spacing-sizes {
    /* .m-1 { margin: 0.25rem } */
    .#{$typeKey}-#{$sizeKey} {
      #{$type}: $size * $spacing-base-size;
    }
  }
  
  @each $sizeKey, $size in $spacing-sizes {
    // .mx-1  水平边距
    .#{$typeKey}x-#{$sizeKey} {
      #{$type}-left: $size * $spacing-base-size;
      #{$type}-right: $size * $spacing-base-size;
    }
    // .my-1 上下边距
    .#{$typeKey}y-#{$sizeKey} {
      #{$type}-top: $size * $spacing-base-size;
      #{$type}-bottom: $size * $spacing-base-size;
    }
  }

  // .mt-1
  @each $directionKey, $direction in $spacing-directions {
    @each $sizeKey, $size in $spacing-sizes {
      /* .mt-1 { margin: 0.25rem } */
      .#{$typeKey}#{$directionKey}-#{$sizeKey} {
        #{$type}-#{$direction}: $size * $spacing-base-size;
      }
    }
  }
}
```



### 6.主页框架和顶部菜单

> 安装路由
>
> vue add router

```
导航条
.nav {
  .nav-item {
    border-bottom: 3px solid transparent;
    padding-bottom: 0.2rem;

    // 高亮
    &.active {
      border-bottom: 3px solid #fff;
    }
  }
}
```

### 7.轮播图

>  安装插件
>
>  npm i -S vue-awesome-swiper@3.1.3

### 8.使用精灵图

>www.spritecow.com

### 9.使用字体图标

>https://www.iconfont.cn/ 阿里巴巴矢量图



### 10.卡片组件

>封装

> 时间格式化包
>
> npm i dayjs
>
> 



## 四、发布和部署

### 1.编译环境设置

> 将admin和web的文件进行打包，放到server中

- 设置**baseURL**编译环境变量（admin/src/http.js）

  ```
  baseURL: process.env.VUE_APP_API_URL || '/admin/api',
  ```

- 创建**.env.development**开发时编译环境文件（admin/src/）

  - 手动指定开发时API

    ```
    VUE_APP_API_URL='http://localhost:3000/admin/api'
    ```

- 配置admin编译参数（vue.config.js）

  ```
  outputDir: __dirname + '/../server/admin',  // 编译生成的文件直接放到server文件夹里
  publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/'
    : '/',    // 编译后的html文件里的资源引用路径前都加上/admin/
  ```

- web同理



### 2.服务器配置

#### Nginx

> https://www.jianshu.com/p/d58e438e8c2d
>
> apt install -y nginx

#### Mongoose安装与配置

> apt install -y mongodb-server
>
> 执行
>
> ：mongo
>
> 退出
>
> : exit

#### git安装与配置

` : apt install -y git`

配置

生成公钥：`ssh-keygen`

复制公钥：`cat /root/.ssh/id_rsa.pub`

> 注意：主机名包含在公钥中，所有更改主机名后公钥会失效



#### Nodejs安装与配置

- 安装

  `apt install -y nodejs`

  `apt install -y npm`

- 配置淘宝镜像

  `npm config set registry http://registry.npm.taobao.org/`

- *安装nrm (快速切换npm镜像地址工具)

  `npm i -g nrm`

  查看当前镜像地址：`nrm current`

  设置镜像地址：`nrm use taobao` / `nrm use npm`

- 安装 n  (切换node版本)

  `npm i -g n`     

  升级node最新版：`n latest`

  升级后重启服务器

#### 拉取代码，使用pm2启动项目

> 本地代码 => Git  =>  服务器

- Gitee创建仓库

- 在本地生成密钥

  C:\Users\86136\.ssh\id_rsa.pub

  > 复制到gitee里配置公钥

- 初始化项目

  `git init`

- 添加项目到仓库

  `git add .`

- 把修改提交到本地

  `git commit -am "初始化"`

- 给项目添加远程地址

  `git remote add origin https://gitee.com/ok-song/vue-nodejs-moba.git`

- 提交本地代码

  `git push -u origin master`

- 复制服务器的公钥到项目的部署公钥管理中

- 服务器拉取gitee仓库的代码

  - 复制项目地址(ssh)

    git@gitee.com:ok-song/vue-nodejs-moba.git

  - 默认nginx`/var/www/html`

  - 新建文件夹`/data`

  - `git clone git@gitee.com:ok-song/vue-nodejs-moba.git`

  - `cd /vue-nodejs-moba/server`

  - `npm i`

- 安装pm2 (后台运行nodejs，部署项目)（server根目录下）

  `npm i -g pm2`

  启动 ：`pm2 start index.js`

  查看进程：`pm2 list`

  查看日志：`pm2 logs index`

- 测试

  `curl http://localhost:3000`



#### 配置Nginx反向代理

> 客户端访问服务器 => 服务器访问pm2（node）服务

- *在vscode安装**Remote-SSH**插件管理服务器文件

- 在/etc/nginx/sites-enable/文件夹下新建一个配置文件moba，表示此项目

- 在[nginxconfig.io]()网站生成nginx配置

- 重启nginx

  `service nginx reload`

#### 迁移数据

> 将本地数据库数据迁移到服务器数据库

- 导出本地数据

  `mongodump -d 数据库名称`

  生成dump文件夹复制到服务器/root/路径下

- 在服务器执行

  `mongorestore ` 恢复数据

- 重启nodejs

  `cd /data/vue-nodejs-moba`

  `pm2 start server/index.js`

- 修改url

  提交修改

- pm2重启

  `pm2 reload index`











# 数据结构

## 一、后台数据admin

### （1）**后端路由表**

| 请求方法 | 请求路径        | 参数      | 返回值             | 备注      |
| -------- | --------------- | --------- | ------------------ | --------- |
| POST     | /categories     |           | 新建分类数据       |           |
| PUT      | /categories/:id | 分类项 id | 更新分类数据       |           |
| GET      | /categories     |           | 渲染分类数据项列表 | limit(10) |
| DELETE   | /categories/:id | 分类项 id | 删除分类项         |           |
| GET      | /categories     |           | 获取分类项详情     |           |
|          |                 |           |                    |           |
|          |                 |           |                    |           |

### （2）数据

1.分类数据categories

- news新闻资讯
- hero英雄
- video视频

2.物品列表items











