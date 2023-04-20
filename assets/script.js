$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?


  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
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

  // $('.saveBtn').each(function() {
  //   $(this).on("click", function() {
  //       // Alert user task has been saved
  //       $('#saveEntryModal').modal('show');
  //   });
  // });
  // show it first
  myModal.show();
  // count to 5
  setTimeout(function(){
      // hide it again
    myModal.hide();
  }, 5000);
});

// $('#myModal').on('shown.bs.modal', function () {
//   $('#myInput').trigger('focus')
// })