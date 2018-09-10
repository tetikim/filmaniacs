$(document).ready(function(){

        //in form-input  focus in
    $('.form-input').focusin(function(){

            //If parent hasn't class 'focus' THEN add it
        !$(this).parent().hasClass('focus') && $(this).parent().addClass('focus');

        //also in form-input, focusout
    }).focusout(function(){
            //if there is not value in form-input and parent has class  'focus'..THEN remove class 'focus'.
        ( $(this).val() =='' && $(this).parent().hasClass('focus') ) && $(this).parent().removeClass('focus');
    });
});
