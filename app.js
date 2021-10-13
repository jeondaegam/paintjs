/*
* function : 특정 이벤트가 발생하면 해당 이벤트를 catch 하여 동작한다.
*
* */

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

// canvas 내의 pixel 에 접근하기 위해 size 를 설정한다.
canvas.width = 700;
canvas.height = 700;
//canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
// 직접 값을 주면 오류의 여지가 있으므로 캔버스 크기를 가져올 수도 있다.

//set the context default
ctx.strokeStyle = "#d0ff00";
ctx.lineWidth = 2.5;

let painting = false;

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
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
        console.log("creating line ", x, y)
        ctx.lineTo(x, y); // 선 끝 좌표. 이전 위치에서 현재 위치까지 선을 연결한다.
        ctx.stroke(); // 선 그리기
        ctx.closePath();
    }
}

// 클릭하는 순간 painting => true 로 변경한다.
function onMouseDown(event) {
    startPainting();
}

/*
 canvas 에서 발생하는 이벤트를 감지한다.
 Ex) canvas에서 "mouseenter" 이벤트가 발생하면 해당 이벤트를 function onMouseMove 에게 보낸다.
*/
if (canvas) { // canvas가 있는지 체크
    canvas.addEventListener("mousemove", onMouseMove); // 커서의 움직임을 체크한다.
    canvas.addEventListener("mousedown", startPainting); // 클릭 했을 때, 마우스 버튼을 누르는 순간을 체크.

    canvas.addEventListener("mouseup", stopPainting); // 마우스 버튼을 뗀 순간 체크.
    canvas.addEventListener("mouseleave", stopPainting); // 커서가 캔버스를 벗어나는지 체크크
}
