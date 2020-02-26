import FunnyAnime from './funny_anime';
import Easing from './easing';

//const Easing = FunnyAnime.EASING;



let test_data = [
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
            { tt: 1000, tx: 100, es: Easing.easeBounce }
        ],
        config: {
            direction: "alternate",
            loop: 3,
        },
        args: `[
            { tt: 1000, tx: 100, es: Easing.easeBounce }
        ],{
            direction: "alternate",
            loop: 3,
        }`
    },
    {
        data: [
            { tt: 1000, tx: 100, es: Easing.easeBounce }
        ],
        config: {
            direction: "accumulative",
            loop: 3,
        },
        args: `[
            { tt: 1000, tx: 100, es: Easing.easeBounce }
        ],{
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
for (let { data, config, args, custom } of test_data) {
    let wrap = document.createElement("li");
    wrap.innerHTML = `
    <code></code>
    <aside>
        <span class="particule"></span>
    </aside>`;
    anime_box.appendChild(wrap);
    let particule = wrap.querySelector('.particule');
    let text_field = wrap.querySelector('code');
    let anime = new FunnyAnime(particule, data, config, custom && custom.bind(particule));

    wrap.onmouseenter = wrap.onclick = () => {
        wrap.onmouseenter = null;
        anime.play(0);
    }
    //anime.play.bind(anime, 0, undefined);
    text_field.innerHTML = `new FunnyAnime(element,${args})`;
}