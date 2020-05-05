let currentColor = randomColor({
    format: 'rgbArray'
});
let nextColor;

function resetColors() {
    if (nextColor) {
        currentColor = nextColor;
    }
    nextColor = randomColor({
        format: 'rgbArray'
    });
}

function startChanging() {
    let currentPercent = 0;
    resetColors();

    const runTimer = () => {
        let backgroundColor = makeGradientColor(currentColor, nextColor, currentPercent++)

        if (currentPercent === 100) {
            currentPercent = 0;
            resetColors();
        }

        document.body.style.backgroundColor = backgroundColor.cssColor;

        setTimeout(() => {
            runTimer()
        }, 75)
    }
    runTimer();
}

function makeGradientColor(color1, color2, percent) {
    color1 = { r: color1[0], g: color1[1], b: color1[2] }
    color2 = { r: color2[0], g: color2[1], b: color2[2] }

    const newColor = {};

    function makeChannel(a, b) {
        return (a + Math.round((b - a) * (percent / 100)));
    }

    function makeColorPiece(num) {
        num = Math.min(num, 255); // not more than 255
        num = Math.max(num, 0); // not less than 0
        let str = num.toString(16);
        if (str.length < 2) {
            str = "0" + str;
        }
        return (str);
    }


    newColor.r = makeChannel(color1.r, color2.r);
    newColor.g = makeChannel(color1.g, color2.g);
    newColor.b = makeChannel(color1.b, color2.b);

    newColor.cssColor = "#" +
        makeColorPiece(newColor.r) +
        makeColorPiece(newColor.g) +
        makeColorPiece(newColor.b);
    return newColor;
}
