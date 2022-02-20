$(document).ready(function () {
  let themeStyle = "dark";
  let taskCount = $("#entry_card_continer").children().length;
  let newTask = "";
  let testArray = [];

  $("#item_count").html(taskCount);

  let newCard = (task) => {
    return `<div class="card added_task">
    <div class="right_side">
      <div class="task_button_container">
        <div class="task_button new_task_button">
          <img src="./images/icon-check.svg" alt="" class="checked" />
        </div>
      </div>
      <div class="added_task_text">${task}</div>
    </div>
    <div class="cancel_container">
      <img src="./images/icon-cross.svg" alt="" class="cancel_task" />
    </div>
  </div>`;
  };

  // new card object

  //Theme change function
  const changeTheme = () => {
    if (themeStyle === "dark") {
      $("#theme").attr("src", "./images/icon-sun.svg");
      $("#logo").css("color", "hsl(0, 0%, 98%)");
      $(document.body).css("background-color", "hsl(236, 33%, 92%)");
      $(".card").css("background-color", "hsl(0, 0%, 98%)");
      themeStyle = "light";
    } else {
      $("#theme").attr("src", "./images/icon-moon.svg");
      $("#logo").css("color", "hsl(235, 21%, 11%)");
      $(document.body).css("background-color", "hsl(235, 21%, 11%)");
      $(".card").css("background-color", "hsl(237, 14%, 26%)");
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

  $("#all").click(function (e) {
    e.preventDefault();
  });

  console.log(taskCount);

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
    $(this)
    .parent()
    .next()
    .css("text-decoration", "line-through")
    $(this).parents('.added_task').toggleClass('test');
    if (!$(this).hasClass("selected_task")) {
      $(this).parent().next().css("text-decoration", "none");
    
    }
  });

  //   enter key todo submit
  $("#task_input").keypress((e) => {
    $("#error-card").slideUp();
    newTask = $("#task_input:text").val();
    let keyPressed = e.key;
    if (keyPressed === "Enter") {
      if (
        $("#task_input:text").val() === undefined ||
        $("#task_input:text").val() === ""
      ) {
        $("#error-card").slideDown();
      } else {
        createTask(newTask);
        taskCount = $("#entry_card_continer").children().length;
        $("#item_count").html(taskCount);
        $("#task_input:text").val("");
      }
    }
  });

  // Mark task as completed

  $("#completed").on("click", function() {
      // console.log($('#entry_card_continer')[0].children)
      let amountRemoved = $("img").filter(".remove").length
      // $("img").filter(".remove").parents('.added_task').slideUp()
      $('#entry_card_continer').children('.test').each(function(){
        $(this).slideUp()
      })
      $("#item_count").html(taskCount -amountRemoved);
      
  });
  
});
