# Webpack-5 Build Tool For SFRA

## Cartridges to build
> Update the **defaultCartridgeList** in webpack.config.js with all the cartridges that needs to be build
>>
```js
const defaultCartridgeList = [
        'app_storefront_base',
        'app_cartridge-1',
        'app_cartridge-2',
        'app_cartridge-3',
        'app_cartridge-4'
        ...
        ...
    ];
```

## Commands

> ### package.json | **Build whole project** (defaultCartridgeList provided in webpack.config.js)
>> **"build":** "webpack build --config webpack.config.js --env production" <br>
>> **"watch":** "webpack watch --config webpack.config.js --env development",
> ### package.json | **Indivisual task** (defaultCartridgeList provided in webpack.config.js)
>> **"build:js":** "webpack build --config webpack.config.js --env production  --env js" <br>
>> **"build:css":** "webpack build --config webpack.config.js --env production  --env css" <br>
>> **"watch:js":** "webpack watch --config webpack.config.js --env development --env js" <br>
>> **"watch:css":** "webpack watch --config webpack.config.js --env development --env css"
> ### Cartridge passed from command line:
> **cartridges** parameter: comma separated cartridge name(s). (*Run with all the above command; ex: watch:js*)
>> npm run watch:js **cartridges=**"app_storefront_base, app_cartridge-1, app_cartridge-2"
<br/>
<br/>

## Tasks (configs)
- Each indivisual task/config resides inside **webpackconfigs/** folder, such as **jsConfig.js**, **scssConfig.js** etc.
- Utils functions resides in **webpackconfigs/utils/**
- getEntries util function create entry point for **SFRA**. Following parameter is supported
    - ```js
        getEntries({
            cartridgeList: cartridgeList,
            srcExt: 'scss',
            destExt: 'css',
            exclude: /\/_.+[.]scss$/,
            subFolder: true
        })
        ```
<br>

## How to add new Task(s)
- Create webpack config file for the task in **webpackconfigs/** folder
- For entry(s) point use getEntries util function
- Require this config file in webpack.config.js file at root of the project
- Add it to the *IF_ELSEIF_ELSE* block as indivisual task and add to array for all the tasks
- In package.json add the indivisual command for it in **scripts{}** Object

<br>

## Other config files
- babel.config.json
- postcss.config.js

<br>

---