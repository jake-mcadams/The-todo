$(document).ready(function () {
  let themeStyle = "dark";
  let taskCount = $("#entry_card_continer").children().length;
  let newTask = '';
  
  
  $("#item_count").html(taskCount);


  let newCard =(task)=> { return (`<div class="card added_task">
  <div class="task_button_container">
    <div class="task_button new_task_button">
    <img src="./images/icon-check.svg" alt="" class="checked"/>
    </div>
  </div>
  <div class="added_task">${task}</div>
</div>`)};

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
    $("#entry_card_continer").append(newCard(task));
  };

  //click functions

  $("#all").click(function (e) {
    e.preventDefault();
    console.log("Test");
    console.log(taskCount);
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
    
    console.log(taskCount);
    $("#item_count").html(taskCount);
    
    console.log(newTask);
  });

  $(".task_button").click(function (e) {
    e.preventDefault();
    $(this).toggleClass('selected_task');
    $(this).children('img').toggle();
    
    // $(this).children().attr("src", "./images/icon-check.svg");
  });
  $(document).on('click', ".new_task_button", function () {
    $(this).toggleClass('selected_task');
    $(this).children('img').toggle();
  });

//   enter key todo submit
$('#task_input').keypress((e)=> {
    $('#error-card').slideUp() 
    newTask = $('#task_input:text').val();
    let keyPressed = e.key;
      if(keyPressed === 'Enter'){
        if($('#task_input:text').val() === undefined || $('#task_input:text').val() === ''){
            $('#error-card').slideDown();
        }else{
            createTask(newTask);
            taskCount = $("#entry_card_continer").children().length;
            $("#item_count").html(taskCount);
            $('#task_input:text').val('');
        }
      }

});
  
});
