## react_muti_page
- react+webpack+es6 打包多页面
- 输出文件可配置 默认同目录 dist
#### USAGE
```
git clone           #克隆项目
cd react_muti_page  #进入项目	
npm install         #安装
```
#### 命令
```
npm run dev         #在localhost:222运行dist
npm compile         #打包
npm compile_qiniu   #用七牛链接打包
```
#### 目录结构
```
- website
    - src                #代码开发目录
	+ components     #组件目录
        + static         #图片等静态资源
	+ http           #网络请求目录
        - view           #HTML模板
	    - page1      #页面1
               +template.html
	       +index.js
	    - page2      #页面2
	       +template.html
	       +index.js
    - dist               #webpack编译打包输出目录，无需建立目录可由webpack根据配置自动生成
        + css                
        + js
        + [html]
    + node_modules       #所使用的nodejs模块
    package.json         #项目配置
    webpack.config.js    #webpack配置
    README.md            #项目说明
```
