$(document).ready(function () {
  let themeStyle = "dark";
  let taskCount = $("#entry_card_continer").children().length;
  let newTask = "";

  $("#item_count").html(taskCount);

  const newCard = (task) => {
    let cardTheme;
    if (themeStyle === "dark") {
      cardTheme = "card_Dark";
    } else {
      cardTheme = "card_Light";
    }
    return `<div class="${cardTheme} card added_task activeTask">
    <div class="right_side">
      <div class="task_button_container">
        <div class="task_button new_task_button">
          <img src="./images/icon-check.svg" alt="" class="checked" />
        </div>
      </div>
      <div class="added_task_text">${task}</div>
    </div>
    <div class="cancel_container">
      <img src="./images/icon-cross-${themeStyle}.svg" alt="" class="cancel_task" />
    </div>
  </div>`;
  };

  //update item count

  const itemCount = (currentItems, removedItems, displayType) => {
    if (displayType === "remove") {
      return currentItems - removedItems;
    }
    if (displayType === "add") {
      return currentItems + removedItems;
    }
  };

  // new card object

  //Theme change function
  const changeTheme = () => {
    if (themeStyle === "dark") {
      $("#theme").attr("src", "./images/icon-moon.svg");
      $("#logo").css("color", "hsl(0, 0%, 98%)");
      $(document.body).css("background-color", "hsl(236, 33%, 92%)");
      // $(".card").css("background-color", "hsl(0, 0%, 98%)");
      $(".card").removeClass("card_Dark");
      $(".card").addClass("card_Light");
      $("#task_input").css("color", "hsl(231, 100%, 1%)");
      $("#error_container").css("background-color", "hsl(0, 0%, 98%)");
      $("#clear_completed_container").css(
        "background-color",
        "hsl(0, 0%, 98%)"
      );
      $(".cancel_task").attr("src", "./images/icon-cross-light.svg");
      $(".added_task_text").css("color", "hsl(237, 14%, 26%)");
      themeStyle = "light";
    } else {
      $("#theme").attr("src", "./images/icon-sun.svg");
      $("#logo").css("color", "hsl(235, 21%, 11%)");
      $(document.body).css("background-color", "hsl(235, 21%, 11%)");
      // $(".card").css("background-color", "hsl(237, 14%, 26%)");
      $(".card").addClass("card_Dark");
      $(".card").removeClass("card_Light");
      $("#task_input").css("color", "hsl(234, 39%, 85%)");
      $("#error_container").css("background-color", "hsl(237, 14%, 26%)");
      $("#clear_completed_container").css(
        "background-color",
        "hsl(237, 14%, 26%)"
      );
      $(".cancel_task").attr("src", "./images/icon-cross-dark.svg");
      $(".added_task_text").css("color", "hsl(234, 39%, 85%)");
      themeStyle = "dark";
    }
  };

  //create new card

  const createTask = (task) => {
    if ($("#entry_card_continer").children().length > 0) {
      $("#entry_card_continer")
        .children()
        .last()
        .after(newCard(task))
        .hide()
        .slideDown();
    } else {
      $("#entry_card_continer").append(newCard(task)).hide().slideDown();
    }
  };

  //click functions

  // console.log(taskCount);

  $("#theme").click((e) => {
    e.preventDefault();
    changeTheme();
    taskCount = $(".task_track").length;
  });

  $("#logo").click(function (e) {
    e.preventDefault();
    // createTask();
  });

  // $(".task_button").click(function (e) {
  //   e.preventDefault();
  //   $(this).toggleClass("selected_task");
  //   $(this).children("img").toggle();

  //   // $(this).children().attr("src", "./images/icon-check.svg");
  // });
  $(document).on("click", ".new_task_button", function () {
    $(this).toggleClass("selected_task");
    $(this).children("img").toggle();
    $(this).children("img").toggleClass("remove");
    $("#clear_completed_container").slideUp();
    $(this).parent().next().css("text-decoration", "line-through");
    $(this).parents(".added_task").toggleClass("activeTask");
    $(this).parents(".added_task").toggleClass("markedCompleted");
    if (!$(this).hasClass("selected_task")) {
      $(this).parent().next().css("text-decoration", "none");
    }
  });

  //   enter key todo submit
  $("#task_input").keypress((e) => {
    $("#error_container").slideUp();
    newTask = $("#task_input:text").val();
    let keyPressed = e.key;
    if (keyPressed === "Enter") {
      if (
        $("#task_input:text").val() === undefined ||
        $("#task_input:text").val() === ""
      ) {
        if (themeStyle === "light") {
          $("#error_container").css("background-color", "hsl(0, 0%, 98%)");
        }
        $("#error_container").slideDown();
      } else {
        createTask(newTask);
        taskCount = $("#entry_card_continer").children().length;
        $("#item_count").html(taskCount);
        $("#task_input:text").val("");
      }
    }
  });

  // Filter completed

  $("#completed").on("click", function () {
    // let amountRemoved = $("img").filter(".remove").length;
    let amountRemoved = $("#entry_card_continer")
      .children()
      .not(".markedCompleted").length;
    // console.log($("img").filter(".remove").length);
    // console.log($("#entry_card_continer").children(".markedCompleted").length);
    if (
      $("#entry_card_continer").children(".markedCompleted").length === 1 &&
      $("#entry_card_continer").children().length > 1
    ) {
      if (!$("#completed").hasClass("currentFilter")) {
        $("#active").addClass("disabledFilter");
        $("#active").prop("disabled", true);
        $("#all").addClass("disabledFilter");
        $("#all").prop("disabled", true);
        $("#completed").toggleClass("currentFilter");
        $("#entry_card_continer")
          .children(".activeTask")
          .each(function () {
            $(this).slideUp();
          });
        console.log("taskCount Before: " + taskCount);
        console.log("amountRemoved Before: " + amountRemoved);
        taskCount = itemCount(taskCount, amountRemoved, "remove");
        $("#item_count").html(taskCount);
        console.log("taskCount after: " + taskCount);
        console.log("amountRemoved after: " + amountRemoved);
        console.log($("#item_count").html());
      } else {
        $("#active").removeClass("disabledFilter");
        $("#active").prop("disabled", false);
        $("#completed").toggleClass("currentFilter");
        $("#entry_card_continer")
          .children(".activeTask")
          .each(function () {
            $(this).slideDown();
          });
        // console.log("taskCount Before: " + taskCount);
        // console.log("amountRemoved Before: " + amountRemoved);
        $("#item_count").text(itemCount(taskCount, amountRemoved, "add"));
        taskCount = itemCount(amountRemoved, taskCount, "add");
        // console.log("taskCount after: " + taskCount);
        // console.log("amountRemoved after: " + amountRemoved);
      }
    }
  });

  //Filter active

  $("#active").on("click", function () {
    let amountRemoved = $("#entry_card_continer")
      .children()
      .filter(".markedCompleted").length;
    // console.log($("img").filter(".remove").length);
    if ($("#entry_card_continer").children(".activeTask").length > 0) {
      if (!$("#active").hasClass("currentFilter")) {
        $("#completed").addClass("disabledFilter");
        $("#completed").prop("disabled", true);
        $("#all").addClass("disabledFilter");
        $("#all").prop("disabled", true);
        $("#active").toggleClass("currentFilter");
        $("#entry_card_continer")
          .children(".markedCompleted")
          .each(function () {
            $(this).slideUp();
          });
        if (taskCount > 0) {
          console.log("taskCount Before: " + taskCount);
          console.log("amountRemoved Before: " + amountRemoved);
          console.log(taskCount - amountRemoved);
          taskCount = itemCount(taskCount, amountRemoved, "remove");
          console.log(taskCount);
          $("#item_count").html(taskCount);
          console.log("taskCount after: " + taskCount);
          console.log("amountRemoved after: " + amountRemoved);
        }
      } else {
        $("#completed").removeClass("disabledFilter");
        $("#completed").prop("disabled", false);
        $("#active").toggleClass("currentFilter");
        $("#entry_card_continer")
          .children(".markedCompleted")
          .each(function () {
            $(this).slideDown();
          });
        $("#item_count").text(itemCount(taskCount, amountRemoved, "add"));
        taskCount = itemCount(amountRemoved, taskCount, "add");
      }
    }
  });

  //clear completed
  $("#clear_completed").on("click", function () {
    let amountRemoved = $("#entry_card_continer")
    .children()
    .filter(".markedCompleted").length;
    if ($("#entry_card_continer").children(".markedCompleted").length === 0) {
      console.log("working");
      $("#clear_completed_container").slideDown();
    }
    $("#entry_card_continer")
      .children(".markedCompleted")
      .each(function () {
        $(this).slideUp();
        setTimeout(() => {
          $(this).remove();
        }, 1000);
      });
    console.log(taskCount);
    console.log(amountRemoved);
    // taskCount = taskCount - amountRemoved;
    taskCount = itemCount(taskCount, amountRemoved, "remove")
    console.log(taskCount);
    $("#item_count").text(taskCount);
  });

  //clicking remove individual tasks

  $(document).on("click", ".cancel_container", function () {
    let amountRemoved = 1;
    // let testing = $(this).prev().text();
    // console.log(testing);
    // if ($(this).prev().children(".remove")) {
    //   // console.log($(this).prev().children(".remove"))
    //   $(this).prev().children(".added_task_text").text("testing");
    // }
    $(this).parents(".added_task").slideUp();
    setTimeout(() => {
      $(this).parents(".added_task").remove();
    }, 1000);
    $("#item_count").text(itemCount(taskCount, amountRemoved, "remove"));
    taskCount = itemCount(taskCount, amountRemoved, "remove");
  });
});
