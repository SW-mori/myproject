import jQuery from 'jquery';
const $ = jQuery;
import 'slick-carousel';

$(function() {
  $('.navi_toggle').on('click', function () {
    $('#header').toggleClass('show');
  });

  $('.shadow').on('click', function() {
    $('#header').removeClass('show');
  });

  $('#navi a').on('click', function() {
    $('#header').removeClass('show');
  });

  $('a[href^="#"]').on('click', function(){
    const href= $(this).attr("href");
    const target = $(href == "#" || href == "" ? 'html' : href);
    const position = target.offset().top;
    $("html, body").animate({scrollTop:position}, 500, "swing");
    return false;
  });

  $('.slick-area').slick({
    arrows: false,
    centerMode: true,
    centerPadding: '100px',
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: '50px',
          slidesToShow: 1
        }
      }
    ]
  });

  $(window).on('scroll', function() {
    $('.scroll').each(function() {
      let scroll = $(window).scrollTop();
      let target = $(this).offset().top;
      let windowHeight = $(window).height();
      if (scroll > target - windowHeight + 200) {
        $(this).css('opacity','1');
        $(this).css('transform','translateY(0)');
      }
    });
  });
})