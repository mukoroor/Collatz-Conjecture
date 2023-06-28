
function collatz(evenCoefficient, oddCoefficient, beginNum) {
    let conjecturePath = [];
    if (beginNum == 1) {
        conjecturePath.push(beginNum);
    } else {
        while (beginNum != 1) {
            conjecturePath.push(beginNum);
            if (beginNum % evenCoefficient == 0) {
                beginNum /= evenCoefficient;
            } else {
                beginNum = (oddCoefficient * beginNum + 1);
            }
        }
        conjecturePath.push(1);
    }
    conjecturePath.reverse();
    return conjecturePath;

}

function randomBitArray(length) {
    let a = [];
    for (let index = 0; index < length; index++) {
        a.push(getRndInteger(0,2));
    }
    return a
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


let colorrArr1 = ["#552c13",
"#5f3e28",
"#98745d",
"#3e1c00",
"#3B1E08",
"#362511",
"#371D10",
"#3C280D",
"#481F01",
"#492201",
"#352315",
"#4A0404",
"#562b00",
"#432616",
"#4A2511",
"#3F301D",
"#5E2C04",
"#633200",
"#4B371C",
"#532915",
"#4A3728",
"#652A0E",
"#65350F",
"#483C32",
"#7B3F00",
"#783D1A",
"#995024",
"#B25F2D",
"#6F2C03",
"#704C37",
"#9C6A4C",
"#8C591C",
"#623A0B",
"#755A3A",
"#6D5524",
"#a5633c",
"#5f6344",
"#694b37",
"#7a6935",
"#ccaa66",
"#996633",
"#332211",
"#664433",
"#553311",
"#704826",
"#9d5c12",
"#7c5633",
"#421e05",
"#251910",
"#223b05",
"#1e3504",
"#384e1d",
"#4e341d",
"#351b04",
"#3e1c00",
"#3B1E08",
"#362511",
"#371D10",
"#3C280D",
"#481F01",
"#492201",
"#352315",
"#4A0404",
"#562b00",
"#432616",
"#4A2511",
"#3F301D",
"#5E2C04",
"#633200",
"#4B371C",
"#532915",
"#4A3728",
"#652A0E",
"#65350F",
"#483C32",
"#7B3F00"
];

let colorrArr2 = [/*"#E8B4B8", "#EED6D3", "#A49393", "#67595E", "#C5ADA9", "#2B2528", "#694440", "#815949",*/ "#281F15", "#D2C9BF", "#A69887", "#817786"];
let colorrArr = ["#994FB2","#F58024","#7BB662"];
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


let canW = JSON.parse(canvas.getAttribute("width"));
let canH = JSON.parse(canvas.getAttribute("height"));

let squareL = 10;
let maxCap = 4;
let boxArr = [];

for (let row = 0; row < canW / squareL; row++) {
    let rowArr = [];
    for (let column = 0; column < canH / squareL; column++) {
        let [x, y] = [column * squareL, row * squareL];
        rowArr.push([x, y]);
    }
    boxArr.push(rowArr);
}


function generatePath() {
    let currLoc = [1, 1];
    let path = [[0, 0]];
    let possiblePos = [[0,1], [1,1], [1,0], [0, -1], [-1,-1], [-1,0], [-1,1], [1,-1]];

    while(currLoc[0] + 1 < canW / squareL && currLoc[0] > -1 && currLoc[1] + 1 < canH / squareL && currLoc[1] > -1) {
        let nextPos = possiblePos[getRndInteger(0, possiblePos.length)];
        currLoc[0] += nextPos[0];
        currLoc[1] += nextPos[1];
        path.push([currLoc[0], currLoc[1]]);
    }

    return path;
}

for (let r = 1; r < 10001; r++) {
    for (let l = 0; l < 2; l++) {
    let a = collatz(2, 3, r);
    let angA = 16.023;
    let angB = 27.1167;
    let xprevious = -3;
    let yprevious = 0
    let cursorx = -3;
    let cursory = 0;
    ctx.beginPath();
    if (l == 0) {
        ctx.lineWidth = 20 * 1.197
    } else {
        ctx.lineWidth = (20 - 20* 2 * (l - 1) / 7);
    }
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (let index = 0; index < a.length; index++) {
        if (index < (a.length - 1)) {
            var nextValue = a[index + 1];
        } else {
            var nextValue = a[index];
        }
        if (a[index] * 2 == nextValue) {
            let xnew = xprevious * Math.cos((Math.PI / 180) * (-angA)) - yprevious * Math.sin((Math.PI / 180) * (-angA));
            let ynew = xprevious * Math.sin((Math.PI / 180) * (-angA)) + yprevious * Math.cos((Math.PI / 180) * (-angA));
            cursorx += -xnew;
            cursory += -ynew;
            xprevious = xnew;
            yprevious = ynew;
        } else {
            let ynew = xprevious * Math.sin((Math.PI / 180) * (angB)) + yprevious * Math.cos((Math.PI / 180) * (angB));
            let xnew = xprevious * Math.cos((Math.PI / 180) * (angB)) - yprevious * Math.sin((Math.PI / 180) * (angB));
            cursorx += -xnew;
            cursory += -ynew;
            xprevious = xnew;
            yprevious = ynew;
        }
        ctx.lineTo(100 -cursorx, 1000 + cursory);

    }
    var c = colorrArr[getRndInteger(0, colorrArr.length)];
    if (l == 0) {
        ctx.strokeStyle = '#000000'
    } else {
        ctx.strokeStyle = c;
    }
    ctx.stroke();
    ctx.closePath();
    }
}