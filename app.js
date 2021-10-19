/*
* function : 특정 이벤트가 발생하면 해당 이벤트를 catch 하여 동작한다.
*
* */

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor"); //  jsColor의 이름을 가진 모든 div 를 가져온다.
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#d0ff00";

// canvas 내의 pixel 에 접근하기 위해 size 를 설정한다.
const CANVAS_SIZE = 700;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
//canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
// 직접 값을 주면 오류의 여지가 있으므로 캔버스 크기를 가져올 수도 있다.

let painting = false;
let filling = false;

//set the context default
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = "white";

/*
ctx.fillStyle ="green";
ctx.fillRect(50, 20, 100, 40); // x,y 위치에 색칠된 사각형을 그린다.
ctx.fillStyle="purple";
ctx.fillRect(330, 400, 100, 40); // x,y 위치에 색칠된 사각형을 그린다.
*/

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

// random rgb 값 생성
function randomRgb() {
    return Math.round(Math.random() * 255);
}

// 커서의 움직임을 감지하고 선을 그린다.
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    // painting 을 하지 않을 때, 커서의 움직임을 따라 시작점을 만든다.
    // 클릭하는 순간 시작점이 사용된다.
    if (!painting) {
        ctx.beginPath(); // 선의 시작 점을 생성. 클릭하는 순간 시작점이 사용된다.
        ctx.moveTo(x, y); // 선의 시작 좌표
    } else {
        //console.log("creating line ", x, y)
        ctx.lineTo(x, y); // 선 끝 좌표. 이전 위치에서 현재 위치까지 선을 연결한다.
        ctx.stroke(); // 선 그리기

    }
}


function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    console.log(ctx.strokeStyle);

    // random color
    if (color.length === 0) {
        const randomColor = "rgb(" + randomRgb() + "," + randomRgb() + "," + randomRgb() + ")";
        ctx.strokeStyle = randomColor;
        ctx.fillStyle = randomColor;
        console.log(randomColor);
    }
}

// change brush size
function handleRangeChange(event) {
    // console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;
}

// change brush mode (fill vs paint : 버튼을 클릭할 때마다 이름 변경)
function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "FILL"
    } else {
        filling = true;
        mode.innerText = "PAINT"
    }
}

// filling canvas
function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    console.log(event);
    event.preventDefault(); // 우클릭 방지
}

function handleSaveClick() {
    const image = canvas.toDataURL(); // default - png, "image/jpeg"
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]"
    link.click();
    console.log(image);
}

/*
 canvas 에서 발생하는 이벤트를 감지한다.
 Ex) canvas에서 "mouseenter" 이벤트가 발생하면 해당 이벤트를 function onMouseMove 에게 보낸다.
*/
if (canvas) { // canvas가 있는지 체크
    canvas.addEventListener("mousemove", onMouseMove); // 커서의 움직임을 체크한다.
    canvas.addEventListener("mousedown", startPainting); // 클릭 했을 때, 마우스 버튼을 누르는 순간을 체크.

    canvas.addEventListener("mouseup", stopPainting); // 마우스 버튼을 뗀 순간 체크.
    canvas.addEventListener("mouseleave", stopPainting); // 커서가 캔버스를 벗어나는지 체크

    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}


// console.log(Array.from(colors)); // object 로부터 array 를 생성한다.
// color에 click이 발생하면 이벤트를 handleColorClick 에게 보낸다.
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}