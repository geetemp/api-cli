## api-cli

#### 安装api-cli

```
npm install -g api-cli
```

#### 监控流程

接口监控操作工具，具体的操作流程如下：

##### 配置监测项目

首先使用`api project add` 命令来添加要监测的项目。该命令接收两个必填参数`project-name` 和 `host`和一些选填参数，参数如下表所示：

|    属性名    | 是否必填 | 默认值 | 简写 | 说明                                                         |
| :----------: | :------: | :----: | :--: | :----------------------------------------------------------- |
| project-name |    是    |   -    |  -   | 项目名称                                                     |
|     host     |    是    |   -    |  -   | 项目的host地址                                               |
|     name     |    否    |   -    |  -n  | 项目中文名称                                                 |
|   location   |    否    |   0    |  -l  | 版本号的位置，如接口地址为:' /admin/v1/experts/{id} '，则该值配置为1。 |
|    regex     |    否    |   ""   |  -r  | 版本号的正则，如接口地址为:' /admin/v1/experts/{id} '，则该值配置为v[0-9] |

 添加一个项目名为gp， host 为 www.geetemp.com ,版本号正则为v[0-9]的项目。

```javascript
api project add gp www.geetemp.com --regex v[0-9]
// 等同于
api project add gp www.geetemp.com -r v[0-9]
```

命令执行成功之后，会把添加的项目信息打印出来，结果如下:

```javascript
api-cli · { proxy: { target: 'www.geetemp.com', status: 1 }, // host
  name: '',
  identity: 'gp',        // 项目名
  regex: 'v[0-9]',       // 版本号正则  
  regexlocation: 0,      // 版本号位置
  _id: '5b4da08e502e7d2bf8261549',
  __v: 0 }
```

这个时候我发现host和版本号正则我写错了，需要修改，就来看`api project set` 命令。

`api project set` 命令有一个必填参数为项目命令， 还有一些和add命令一样的选填参数，也就是说，除了项目名称不能修改以外，其它信息均可修改。那么现在我来使用以下命令修改这个上文中配错的信息。

```javascript
 api project set gp --host http:\\www.geetemp.com -r v[0-9]_[0-9] 
// 等同于
 api project set gp --host http:\\www.geetemp.com --regex v[0-9]_[0-9] 
```

命令执行成功之后，同样会把修改的项目信息打印出来。

##### 开启监听

使用`api proxy` 开启监听，该接口接收一个 可选参数`host`，该host为api server 的 host ， 如果不配置则为默认host `http://monitor.api.com`, 一般情况下，不配置即可。若监听开启成功，会打印监听端口号等信息。

```javascript
// 启动监听
 api proxy http://monitor.api.com

// 监听结果
Proxy created: /  ->  http://monitor.api.com
```

开启监听之后，你就可以愉快的请求接口了。

##### 请求接口

在请求接口的时候，请求的服务端就是上文中开启监听的服务端host即`http://localhost:3002` 再服务端host和后端提供的接口地址之间需要加上上文配置的项目名称。入下所示：

```javascript
// host 为 http://monitor.api.com
// 项目名称为 gp
// 接口地址为 /v3_0/profile/info
http://monitor.api.com/gp/v3_0/profile/info?profile_id=18947
```

##### 接口内容改变

如果在请求的过程中，接口的内容（包括字段或字段的数据类型）改变，则ci会打印出差异内容，你可根据当时的情况去和后端协调或者修改前端代码。

如果改变为前后端双方均接受的改变，则前端需要使用`api result merge` 命令，更新一下接口内容，防止下次请求到该接口时，ci还是认为接口数据改变了，仍然把结果打印出来。

##### 更新接口内容

使用`api result merge`更新接口内容，该命令接收 `url` `method` `code` 三个必填参数。参数如下表所示：

| 属性名 | 是否必填 | 默认值 | 简写 | 说明                      |
| ------ | :------: | :----: | :--: | ------------------------- |
| url    |    是    |   -    |  -   | 接口路径                  |
| method |    是    |   -    |  -   | 接口的请求方式            |
| code   |    是    |   -    |  -   | 接口的状态码,非http状态码 |

比如，上面请求的那条接口的字段发生了改变，执行以下命令即可：

```javascript
api result merge /v3_0/profile/info get 0 
```

#### 其它常用命令

##### 配置常用项目

近期的迭代项目为即派，那可以使用`api project use` 命令配置即派为常用项目，待做下个迭代时，再把常用项目改为另外项目即可。

该命令接收一个必填参数`project-name` ,项目名称。

配置即派为常用项目命令及反馈如下：

```javascript
// 命令
api project use gp

// 反馈 
used project success.current work project:gp
```

##### 配置常用接口

当然，你可以使用`api interface use` 命令配置一条最常用的接口，这样你在使用接口相关的命令的时候，就可以不用每次都要输入`url` 和 `method` 这两个参数了。改接口接收两个必填参数和一个选填参数，参数见下表：

| 属性名 | 是否必填 | 默认值 | 简写 | 说明                      |
| ------ | :------: | :----: | :--: | ------------------------- |
| url    |    是    |   -    |  -   | 接口路径                  |
| method |    是    |   -    |  -   | 接口的请求方式            |
| code   |    否    |   -    |  -   | 接口的状态码,非http状态码 |

如下命令所示，我将profile/info设置为常用接口

```javascript
// 命令
api interface use /v3_0/profile/info get

// 反馈
api-cli · used interface success. current work interface:{"url":"C:/Program F                                 iles/Git/v3_0/profile/info","method":"get","code":0}

```

##### 更多命令

使用help命令查看更多内容。help命令及反馈如下：

```javascript
// 命令
     api -h
// 反馈
 Usage: api <command> [options]

  Options:

    -V, --version  output the version number
    -h, --help     output usage information

  Commands:

    project        query and set project info
    interface      query and set interface info
    result         query and set interface info
    proxy          start proxy server
    help [cmd]     display help for [cmd]

// 命令
api project -h

// 反馈
  Usage: api roject [options] [command]        

  Options:  

    -h, --help                           output usage information

  Commands:

    list [project-name]                  display project list
    add [options] <project-name> <host>  add a project
    set [options] <project-name>         set product info
    use <project-name>                   use someone project
    work                                 show work project
```









