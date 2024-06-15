$(document).ready(function () {
  // 恢复导航条状态
  var currentIndex = localStorage.getItem("navIndex");
  if (currentIndex !== null) {
    currentIndex = parseInt(currentIndex);
    var position = $("#nav li").eq(currentIndex).position();
    var width = $("#nav li").eq(currentIndex).width();
    $("#nav .slide1").css({ opacity: 1, left: position.left, width: width });
  }

  // 导航链接点击事件
  $("#nav a").on("click", function () {
    var index = $(this).parent().index();
    var position = $(this).parent().position();
    var width = $(this).parent().width();
    $("#nav .slide1").css({ opacity: 1, left: position.left, width: width });

    // 保存当前索引到本地存储
    localStorage.setItem("navIndex", index);
  });

  // 鼠标悬停事件
  $("#nav a").on("mouseover", function () {
    var position = $(this).parent().position();
    var width = $(this).parent().width();
    $("#nav .slide2")
      .css({ opacity: 1, left: position.left, width: width })
      .addClass("squeeze");
  });

  // 鼠标移出事件
  $("#nav a").on("mouseout", function () {
    $("#nav .slide2").css({ opacity: 0 }).removeClass("squeeze");
  });
});
