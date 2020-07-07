function createRationChart(Obj, options) {
  //图片区域
  let imgArea = document.createElement("div");
  //角标区域
  let numArea = document.createElement("div");
  let currentIndex = 0;
  let len = options.length;
  let changeDuration = 1000;
  let Timer = null;
  let changeTimer = null;

  initImg();
  initNum();
  setStatus();
  autoChange();

  //初始化图片区域
  function initImg() {
    imgArea.style.width = "500px";
    imgArea.style.height = "313px";
    imgArea.style.display = "flex";
    imgArea.style.overflow = "hidden";
    for (let item of options) {
      let img = document.createElement("img");
      img.src = item.url;
      img.style.height = "100%";
      img.style.width = "100%";
      img.style.marginLeft = "0";
      imgArea.appendChild(img);
      console.log(item);
    }
    imgArea.addEventListener("mouseenter", function () {
      clearInterval(Timer);
      Timer = null;
    });

    imgArea.addEventListener("mouseleave", function () {
      autoChange();
    });
    Obj.appendChild(imgArea);
  }

  //设置角标
  function initNum() {
    numArea.style.textAlign = "center";
    numArea.style.marginTop = "-25px";
    for (let i in options) {
      let span = document.createElement("span");
      span.style.height = "12px";
      span.style.width = "12px";
      span.style.display = "inline-block";
      span.style.borderRadius = "50%";
      span.style.margin = "0 7px";
      span.style.backgroundColor = "red";
      span.style.cursor = "pointer";
      span.addEventListener("click", function () {
        currentIndex = i;
        setStatus();
        clearInterval(Timer);
      });
      numArea.appendChild(span);
    }
    Obj.appendChild(numArea);
  }

  //设置轮播图状态
  function setStatus() {
    //设置角标背景
    for (let i = 0; i < len; i++) {
      if (i == currentIndex) {
        numArea.children[i].style.backgroundColor = "#ff6100";
      } else {
        numArea.children[i].style.backgroundColor = "#c0c0c0";
      }
    }

    let start = parseInt(imgArea.children[0].style.marginLeft);
    console.log(imgArea.children[0].style.marginLeft);
    let end = currentIndex * -100;
    let dis = end - start;
    let duration = 500;
    let speed = dis / duration;
    if (changeTimer) {
      clearInterval(changeTimer);
    }
    changeTimer = setInterval(function () {
      start += speed * 20;
      imgArea.children[0].style.marginLeft = start + "%";
      if (Math.abs(end - start) < 1) {
        imgArea.children[0].style.marginLeft = end + "%";
        clearInterval(changeTimer);
      }
    }, 20);

    // let imgShift = currentIndex * -100;
    // imgArea.children[0].style.marginLeft = imgShift + "%";
  }

  function autoChange() {
    if (Timer) {
      return;
    }
    Timer = setInterval(function () {
      if (currentIndex == len - 1) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      setStatus();
    }, changeDuration);
  }
}
