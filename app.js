/*
* function : 특정 이벤트가 발생하면 해당 이벤트를 catch 하여 동작한다.
*
* */

const canvas = document.getElementById("jsCanvas");

    let painting = false;


function stopPainting(){
    painting = false;
}

// 커서가 움직이면 좌표를 가져온다.
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
}

// 클릭하는 순간 painting => true 로 변경한다.
function onMouseDown(event) {
    console.log(event);
    console.log("click");
    painting = true;
}

// 마우스 버튼을 뗀 순간 painting => false 로 변경한다.
function onMouseUp(event) {
    stopPainting();
}

/*
 canvas 에서 발생하는 이벤트를 감지한다.
 Ex) canvas에서 "mouseenter" 이벤트가 발생하면 해당 이벤트를 function onMouseMove 에게 보낸다.
*/
if (canvas) { // canvas가 있는지 체크
    canvas.addEventListener("mouseenter", onMouseMove); // 커서의 움직임을 체크한다.
    canvas.addEventListener("mousedown", onMouseDown); // 클릭 했을 때, 마우스 버튼을 누르는 순간을 체크.
    canvas.addEventListener("mouseup", onMouseUp); // 마우스 버튼을 뗀 순간 체크.
    canvas.addEventListener("mouseleave", stopPainting);
}
