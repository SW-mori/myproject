import jQuery from 'jquery';
const $ = jQuery;

$(function(){
    $(".content").on("click", function() {
      $(this).next().slideToggle();
      $(this).toggleClass("open");
    });
  });