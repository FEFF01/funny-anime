import FunnyAnime from './funny_anime';
import Easing from './easing';

//const Easing = FunnyAnime.EASING;



let test_list = [

    {
        data: [
            { tt: 1000, tx: 100, es: Easing.easeBounce }
        ],
        config: {
            loop: 3,
        },
        args: `[
            { tt: 1000, tx: 100, es: Easing.easeBounce }
        ],{
            loop: 3,
        }`
    },
    {
        data: [
            { tt: 1000, tx: 100, rz: 180, es: Easing.easeBounce }
        ],
        config: {
            direction: "alternate",
            loop: 3,
        },
        args: `[
            { tt: 1000, tx: 100, rz: 180, es: Easing.easeBounce }
        ],{
            direction: "alternate",
            loop: 3,
        }`
    },
    {
        data: [
            { rz: 0, tx: 100 },
            { tt: 1000, rz: 120, es: Easing.easeBounce }
        ],
        config: {
            order: "auto",
            direction: "accumulative",
            loop: 3,
        },
        args: `[
            { rz: 0, tx: 100 },
            { tt: 1000, rz: 120, es: Easing.easeBounce }
        ],{
            order:"auto",
            direction: "accumulative",
            loop: 3,
        }`
    },
    {
        data: [
            { tt: 1000, tx: 100, es: Easing.easeBounce.mirror().symmetry() }
        ],
        config: {
            direction: "accumulative",
            loop: 3,
        },
        args: `[
            { tt: 1000, tx: 100, es: Easing.easeBounce.mirror().symmetry() }
        ],{
            direction: "accumulative",
            loop: 3,
        }`
    },
    {
        data: [
            {
                tt: 1000, tx: 100,
                es: Easing.easeBounce.mirror().symmetry().
                    concat(Easing.elastic(1, 1).mirror())
            }
        ],
        config: {
            direction: "accumulative",
            loop: 3,
        },
        args: `[
            {
                tt: 1000, tx: 100,
                es: Easing.easeBounce.mirror().symmetry().
                    concat(Easing.elastic(1, 1).mirror())
            }
        ],{
            direction: "accumulative",
            loop: 3,
        }`
    },
    {
        data: [
            { tt: 1000, tx: 100, es: Easing.easeBounce.steps(10) }
        ],
        config: {
            direction: "accumulative",
            loop: 3,
        },
        args: `[
            { tt: 1000, tx: 100, es: Easing.easeBounce.steps(10) }
        ],{
            direction: "accumulative",
            loop: 3,
        }`
    },
    {
        data: [
            {
                tt: 1000, tx: 100,
                es: Easing.easeBounce.steps(6).
                    concat(Easing.easeInCubic.steps(10, "start"))
            }
        ],
        config: {
            direction: "accumulative",
            loop: 3,
        },
        args: `[
            {
                tt: 1000, tx: 100,
                es: Easing.easeBounce.steps(6).
                    concat(Easing.easeInCubic.steps(10, "start"))
            }
        ],{
            direction: "accumulative",
            loop: 3,
        }`
    },
    function (wrap, text_field, element) {
        let anime1 = new FunnyAnime(element,
            [{ tt: 1000 * 2, tx: 100 * 2, rz: 100 * 2 }],
            { loop: true, direction: "alternate" }
        ).play();
        let anime2 = new FunnyAnime(element,
            [{ tt: 777 * 2, tx: 55 * 2, rz: 133 * 2 }],
            { loop: true, direction: "alternate" }
        ).play();

        wrap.onmouseenter = wrap.onclick = () => {
            wrap.onmouseenter = null;
            anime1.play();
            anime2.play();
        }

        text_field.innerHTML = `
        /**
         动画周期最细能划分到每个动画元素，
         如果需要为一个元素拥有两个不同周期的缓动，
         需要为该元素实例化两个 FunnyAnime 对象分别指定对于的数据
         */
new FunnyAnime(element,
            [{ tt: 1000 * 2, tx: 100 * 2, rz: 100 * 2 }],
            { loop: true, direction: "alternate" }
        ).play();
new FunnyAnime(element,
            [{ tt: 777 * 2, tx: 55 * 2, rz: 133 * 2 }],
            { loop: true, direction: "alternate" }
        ).play();`;
    },
    {
        data: [
            { ty: -40, tx: 100, rx3d: 1, green: 200, red: 200, bule: 200 },
            {
                tt: 990, tx: 100, red: 130, bule: 70, o: -0.5,
                es: Easing.easeCirc.symmetry()
            },
            { tt: 770, tx: -100, es: Easing.easeCirc.mirror() },
            { ft: 500, tt: 1700, green: 90, ty: 100, rz3d: 2, ry3d: -1, ra3d: 140 },
            {
                ft: 900, tt: 1830, o: 0.5, ty: -100, rz3d: -2, ry3d: 1, ra3d: -33,
                es: Easing.easeCirc.symmetry()
            },
            { tt: 2030, ra3d: -140, es: Easing.easeBounce }
        ],
        config: {
            ty: {
                es: Easing.easeCirc.mirror()
            },
            rotate3d: {
            },
            red: {},
            custom: {
                //green: {}, bule: {},
            },
            direction: "accumulative",
            loop: true,
            speed: 2
        },
        custom: function (green, red, bule) {
            this.style.backgroundColor = `rgb(${
                (red = red % 512 | 0) < 256 ? red : (512 - red)
                },${
                (green = green % 512 | 0) < 256 ? green : (512 - green)
                },${
                (bule = bule % 512 | 0) < 256 ? bule : (512 - bule)
                })`
        },
        args: `[
            { ty: -40, tx: 100, rx3d: 1, green: 200, red: 200, bule: 200 },
            {
                tt: 990, tx: 100, red: 130, bule: 70, o: -0.5,
                es: Easing.easeCirc.symmetry()
            },
            { tt: 770, tx: -100, es: Easing.easeCirc.mirror() },
            { ft: 500, tt: 1700, green: 90, ty: 100, rz3d: 2, ry3d: -1, ra3d: 140 },
            {
                ft: 900, tt: 1830, o: 0.5, ty: -100, rz3d: -2, ry3d: 1, ra3d: -33,
                es: Easing.easeCirc.symmetry()
            },
            { tt: 2030, ra3d: -140, es: Easing.easeBounce }
        ],{
            ty: {
                es: Easing.easeCirc.mirror()
            },
            rotate3d: {
            },
            red: {},
            custom: {
                //green: {}, bule: {},
            },
            direction: "accumulative",
            loop: true,
            speed: 2
        },function (green, red, bule){...}`
    }
];
for (let item of test_list) {
    let wrap = document.createElement("li");
    wrap.innerHTML = `
    <code></code>
    <aside>
        <span class="particule"></span>
    </aside>`;
    anime_box.appendChild(wrap);
    let particule = wrap.querySelector('.particule');
    let text_field = wrap.querySelector('code');
    if (typeof item !== "function") {
        let { data, config, args, custom } = item;
        wrap._anime = new FunnyAnime(particule, data, config, custom && custom.bind(particule));
        text_field.innerHTML = `new FunnyAnime(element,${args})`;
        wrap.onmouseenter = wrap.onclick = () => {
            wrap.onmouseenter = null;
            wrap._anime && wrap._anime.play(0);
        }
    } else {
        item(wrap, text_field, particule);
    }
    //anime.play.bind(anime, 0, undefined);
}