let themeStyle = 'dark';


const changeTheme=()=>{
    if(themeStyle ==='dark'){
        $('#theme').attr('src', './images/icon-sun.svg');
        $('#logo').css('color', 'hsl(0, 0%, 98%)');
        $(document.body).css('background-color', 'hsl(236, 33%, 92%)');
        $('.card').css('background-color', 'hsl(0, 0%, 98%)');
        themeStyle = 'light';
    }else{
        $('#theme').attr('src', './images/icon-moon.svg');
        $('#logo').css('color', 'hsl(235, 21%, 11%)');
        $(document.body).css('background-color', 'hsl(235, 21%, 11%)');
        $('.card').css('background-color', 'hsl(237, 14%, 26%)');
        themeStyle = 'dark';
    }
}



$(document).ready(function () {
    $('#theme').click((e)=> { 
        e.preventDefault();
        changeTheme();
    });






});

