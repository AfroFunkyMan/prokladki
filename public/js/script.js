/**
 * Created by ca13m on 10.08.2016.
 */
$(function(){
    $('button').click(function(){
        $('.popup,.popup_overlay').fadeIn(400); //показываем всплывающее окно
    });
    $('.closer,.popup_overlay').click(function(){
        $('.popup,.popup_overlay').fadeOut(400); //скрываем всплывающее окно
    });
});