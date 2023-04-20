var currentDate = dayjs().format("dddd, MMMM D, YYYY");
var currentHour = dayjs().format("HH");
var saveBtnEl = $(".saveBtn");
$("#currentDay").text(`${currentDate}`);
var myModal = new bootstrap.Modal('#message-modal');
var messageEl = document.querySelector("#message");
var archive = [];

var timeBlock = [
  { id: "#hour-9", hour: 9 },
  { id: "#hour-10", hour: 10 },
  { id: "#hour-11", hour: 11 },
  { id: "#hour-12", hour: 12 },
  { id: "#hour-13", hour: 13 },
  { id: "#hour-14", hour: 14 },
  { id: "#hour-15", hour: 15 },
  { id: "#hour-16", hour: 16 },
  { id: "#hour-17", hour: 17 },
];

$.each(timeBlock, function (key, value) {
  var presentHour = value.id;

  if (value.hour < currentHour) {
    $(presentHour).removeClass("future");
    $(presentHour).removeClass("present");
    $(presentHour).addClass("past");

  } else if (value.hour == currentHour) {
    $(presentHour).removeClass("future");
    $(presentHour).removeClass("past");
    $(presentHour).addClass("present");

  } else {
    $(presentHour).removeClass("present");
    $(presentHour).removeClass("past");
    $(presentHour).addClass("future");
  }
});

$(function () {

  if (localStorage.getItem("dailyLog") !== null) {
    archive = JSON.parse(localStorage.getItem("dailyLog"));

    localStorage.setItem("dailyLog", JSON.stringify(archive));

    $.each(archive, function (key, value) {
      if (value.day === currentDate) {
        var record = `#${value.hour}`;
        $(record).find("textarea").text(value.event);
      }
    });
  }
});
$(".saveBtn").click(function () {
  var saveBtn = $(this).parent().attr("id");
  var saveBtnID = `#${saveBtn}`;
  var textInput = $(saveBtnID).find("textarea").val();
  var userEntry = {
    day: currentDate,
    hour: saveBtn,
    event: textInput,
  };

  if (localStorage.getItem("dailyLog") !== null) {
    archive = JSON.parse(
      localStorage.getItem("dailyLog")
    );
    archive.push(userEntry);
    localStorage.setItem(
      "dailyLog",
      JSON.stringify(archive)
    );

    $.each(archive, function (key, value) {
      if (value.day === currentDate) {
        record = `#${value.hour}`;
        $(record).find("textarea").text(value.event);
      }
    });
  }

  else {
    archive.push(userEntry);
    localStorage.setItem("dailyLog", JSON.stringify(archive));
  }

  myModal.show();
  setTimeout(function(){
    myModal.hide();
  }, 2000);
});
