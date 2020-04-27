## v-mec

v-mec，主要是一个vue项目工具库，试图将vue组件逻辑进行分层，细化。

### v-mec功能概述

-   抽象了service层，分离了数据处理逻辑与发送请求的逻辑。
-   通过vue的mixins提供eventBus功能，解决某些时候模块间的通讯问题。
-   封装了vuex的actions，改用类实现，从而利于类的继承达到业务逻辑的重用。
-   包含常用的工具类，如：ObjectUtil，DomUtil，Validator等

### 如何安装v-mec

```javascript
npm install -S v-mec
```

v-mec的service模块依赖[axios]( https://github.com/axios/axios )。在发送请求前，请确保您的项目先安装了axios。

### 如何使用v-mec

```javascript
import VMec from 'v-mec';
Vue.use(VMec);
```

### v-mec的目录结构

```jade
+---core
|   +---command
|   |       AsyncCommand.js
|   |       BaseCommand.js
|   |       SyncCommand.js
|   |
|   +---event
|   |       EventBus.js
|   |       EventDispatcher.js
|   |
|   +---service
|   |       AxiosService.js
|   |       BaseService.js
|   |
|   +---store
|   |       VuexModule.js
|   |       mapActions.js
|   |
|   \---view
+---portal
|       VMec.js
|       Loading.js
|       ResizeHandler.js
|
\---utils
    |   DomUtil.js
    |   ObjUtil.js
    |
    \---validator
            Rule.js
            Rules.js
            Validator.js
```

-   service - 处理发送请求逻辑。AxiosService类封装了axios用于与后台交互。
-   store - 用于对接vuex的store modules。VuexModule封装了vuex的模块，创建模块时actions能直接关联service。
-   command - 负责调用service发请求，负责请求之前与之后的数据处理逻辑。AsyncCommand类提供了请求失败与成功的统一处理，使用中我们需要继承此类，覆盖success方法。
-   event - 各组件间通讯的依靠。EventBus是一个可发送和接收事件的事件中心，会被controllers调用。
-   utils - 提供用到的工具类。
-   validator - 针对elementui的表单自定义验证逻辑封装的验证工具类，同样适用于[async-validator](https://github.com/yiminghe/async-validator)
-   portal - 针对vue项目做的适配。VMec是一个vue插件，使用时得调用Vue.use进行安装。

### v-mec使用示例



