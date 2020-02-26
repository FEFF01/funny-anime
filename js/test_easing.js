import FunnyAnime from './funny_anime';
//import Easing from './easing';

const Easing = FunnyAnime.EASING;


let test_list = [


    "Linear",
    "InBack",
    "OutBack",
    "InOutBack",
    "InCirc",
    "OutCirc",
    "InOutCirc",
    "Swing",
    "InBounce",
    "OutBounce",
    "InOutBounce",
    "Reverse",

    "elastic|1,0.1",
    "elastic|1,0.5",
    "elastic|3,0.5",

    "bezier|-1,1",
    "bezier|-1,1.5",
    "bezier|1,-1",

    {
        text: "Easing.easeLinear.steps(4)",
        ease: Easing.easeLinear.steps(4)
    },
    {
        text: `Easing.easeLinear.steps(4, "start")`,
        ease: Easing.easeLinear.steps(4, "start")
    },

    {
        text: "Easing.elastic(1,0.5).mirror()",
        ease: Easing.elastic(1, 0.5).mirror()
    },
    {
        text: "Easing.elastic(1,0.5).symmetry()",
        ease: Easing.elastic(1,0.5).symmetry()
    },
    {
        text: "Easing.elastic(1, 0.5).mirror().symmetry()",
        ease: Easing.elastic(1, 0.5).mirror().symmetry()
    },


    {
        text: "Easing.easeReverse.concat(Easing.easeBack)",
        ease: Easing.easeReverse.concat(Easing.easeBack)
    },
    {
        text: "Easing.easeBack.concat(Easing.easeReverse)",
        ease: Easing.easeBack.concat(Easing.easeReverse)
    },
    {
        text:
            `Easing.easeBack.concat(
                Easing.bezier(-1,1.2),
                Easing.easeSwing,
                Easing.easeBounce
                )`,
        ease: Easing.easeBack.concat(
            Easing.bezier(-1, 1.2),
            Easing.easeSwing,
            Easing.easeBounce
        )
    },
    {
        text: `Easing.split(
            0.5,
            Easing.split(
                0.4,
                Easing.easeBack.split(0.4),
                Easing.easeBounce
            )
        )`,
        ease: Easing.split(
            0.5,
            Easing.split(
                0.4,
                Easing.easeBack.split(0.5),
                Easing.easeBounce
            )
        )
    },

    ...Array.prototype.concat.apply([], ["Quad", "Cubic", "Quart", "Quint", "Expo"].map(name => ["In" + name, "Out" + name, "InOut" + name]))

];


for (let item of test_list) {
    let text, ease;
    if (typeof item === "string") {
        let parts = item.split("|");
        if (parts.length === 1) {
            text = `Easing.ease${parts[0]}`;
            ease = Easing[`ease${parts[0]}`];
        } else {
            let args = parts[1].split(",").map(arg => Number(arg));
            text = `Easing.${parts[0]}(${parts[1]})`;
            ease = Easing[`${parts[0]}`];
            ease = ease.apply(ease, args);
        }
    } else {
        text = item.text;
        ease = item.ease;
    }
    let wrap = document.createElement("li");
    wrap.innerHTML = `
    <code></code>
    <aside style="text-align:center;">
        <p style="
        position:relative;
        display:inline-block;
        width:70%;
        background-color:gray;
        border-right:40px solid gray;
        text-align:left;
        border-radius:10px;
        ">
        <span class="particule" style="border-radius:50%;line-height:40px;text-align:center;font-size:12px;"></span>
        </p>
    </aside>`;
    anime_box.appendChild(wrap);
    let particule = wrap.querySelector('.particule');
    let text_field = wrap.querySelector('code');
    let anime = new FunnyAnime(
        particule,
        [{ tt: 1000, left: 100, es: ease }],
        {
            onPlay(ft, tt) {
                wrap.onmouseenter = null;
                console.log("play", ft, tt, text);
            }, onEnd(dt) {
                console.log("end", dt, text);
            }
        },
        function (left) {
            particule.innerHTML = `${left | 0}%`;
            particule.style.left = `${left.toFixed(6)}%`;
        }
    );
    wrap.onmouseenter = () => {
        anime.play(0);
    }
    wrap.onclick = anime.play.bind(anime, 0, undefined);
    text_field.innerHTML = text;
}
 //return Easing.concat("__t<0.5?(__t*=2,${$}/2):(__t=2-__t*2,1-${$}/2)", ease);