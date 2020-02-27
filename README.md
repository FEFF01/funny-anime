## funny-anime
    
> * 通过指定动画配置即时编译执行的js动画引擎，即使每个动画元素有上百个不同时间段（可能有重叠）不同值的缓动，每次计算也能在几个逻辑判断中得出最终值；不过即时编译需要消耗大量资源不太适用于频繁初始化并销毁的情况

> * [Examples](https://feff01.github.io/funny-anime/dist/test.html)
> * [Examples-Easing](https://feff01.github.io/funny-anime/dist/test_easing.html)


## 使用

```
    npm install funny-anime
```
> * 免安装可直接保存 `https://feff01.github.io/funny-anime/dist/js/funny_anime.js` 文件，本地 script 引入后通过 `window.FunnyAnime` 使用

```typescript

    /**
     * @description 具体使用方式参考 `test.html` `text_easing.html`  
     */
    import FunnyAnime from 'funny-anime';
    //const FunnyAnime = require('funny-anime');
    //const FunnyAnime = window.FunnyAnime;

    let anime = new FunnyAnime(
        element as HTMLElement,
        [//动画数据
            {rz:180，tx:100},    //不指定 tt (到达时间) 的为初始值不参与缓动计算
            {tt:1000, tx:-100, rz:180},  //不指定 ft (开始事件) 默认为 0 
            {ft:500, tt:1200, tx:140}
        ],
        {//动画配置(可选参数)
            duration:2000,  //一个运动周期用时，默认为动画组中最大的 tt

            /**
             * 默认为 normal 表示相邻两个周期的运动路线相同
             * alternate 表示下一周期运动路线与前一周期相反
             * accumulative 表示下一周期运动轨迹和前一周期相同，不过运动路线是接在前一周期路线末端
            */
            directoin:"normal", 

            loop:1, //运动周期数，默认为 1 ,如果为 true 表示基本无限循环

            begin:0,    //表示默认从什么时间点开始缓动（time+=begin）

            es:Easing.easeLinear,   //默认为 easeLinear ，每组动画数据如果不指定 es 默认使用该值

            order:"normal", //默认为 normal ,auto表示缓动数据的变换顺序为动画数据中出现的先后顺序

            speed:1,    //默认为 1，表示播放速度倍数


            /**
             * 某个缓动元素需要使用单独的配置，
             * 可以指定元素键名和可选以下对应的配置，
             * 没配置到的值向上查找
            */
            tx:{
                duration,directoin,loop,begin,es
            }
            translate:{//缓动组 translate 使用单独配置
                duration,directoin,loop,begin,es
                ty:{//属于组 translate 的 ty 元素使用单独配置
                    duration,directoin,loop,begin,es
                }
            }

            [custom_key]:{//如果指定了非默认动画元素，非默认动画元素使用单独配置
                duration,directoin,loop,begin,es
            },
            custom:{//如果指定了非默认动画元素，这里表示非默认动画元素组使用单独配置
                duration,directoin,loop,begin,es
                [custom_key]:{
                    ...
                }
            }
        },

        /**
         * 可选参数，如果指定了非默认动画元素，当一次缓动计算中元素值有变则该方法被调用
         * 参数顺序为动画数中最先出现的先后顺序
        */
        function(...custom_values){

        }
    );

    anime.play(0);  //从时间点 0 开始播放至结束
    anime.play(1000,2000);  //从时间点 1000 播放至 2000
    anime.play(2000,1000);  //从时间点 2000 播放至 1000（倒序播放）
    anime.play(undefined,1000); //从时间点 1000 播放至之前停止的时间（可能顺序可能倒序）
    anime.play();   //从之前停止的时间播放至结束

    anime.pause();  //暂停

    anime.step(1000);   //单步执行让动画状态为时间点 1000


    /**
    * 默认动画键定义如下
    */
    [
    {
        name: "translate",
        keys: ["tx", "ty", "tz"],
        parent: "matrix"
    },
    {
        name: "rotateX",
        keys: ["rx"],
        parent: "matrix"
    },
    {
        name: "rotateY",
        keys: ["ry"],
        parent: "matrix"
    },
    {
        name: "rotateZ",
        keys: ["rz"],
        parent: "matrix"
    },
    {
        name: "rotate3d",
        keys: ["rx3d", "ry3d", "rz3d", "ra3d"],
        parent: "matrix"
    },
    {
        name: "scale",
        keys: ["sx", "sy", "sz"],
        values: { sx: 1, sy: 1, sz: 1 },
        parent: "matrix"
    },
    {
        name: "opacity",
        keys: ["o"],
        values: { o: 1 }
    },
    ]


```
