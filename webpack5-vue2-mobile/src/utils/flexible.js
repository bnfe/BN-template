(function flexible(window, document) {
  var docEl = document.documentElement;
  var dpr = window.devicePixelRatio || 1;
  var tid;

  // set 1rem = viewWidth / 10
  function setRemUnit() {
    var rem = docEl.clientWidth / 10;
    docEl.style.fontSize = rem + "px";
  }

  setRemUnit();

  // reset rem unit on page resize
  window.addEventListener(
    "resize",
    function () {
      clearTimeout(tid);
      tid = setTimeout(setRemUnit, 300);
    },
    false
  );
  window.addEventListener(
    "pageshow",
    function (e) {
      if (e.persisted) {
        clearTimeout(tid);
        tid = setTimeout(setRemUnit, 300);
      }
    },
    false
  );

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement("body");
    var testElement = document.createElement("div");
    testElement.style.border = ".5px solid transparent";
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add("hairlines");
    }
    docEl.removeChild(fakeBody);
  }
})(window, document);
