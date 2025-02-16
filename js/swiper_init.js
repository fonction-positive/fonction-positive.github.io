function initSwiper() {
  if (typeof Swiper === 'undefined' || !document.querySelector('.blog-slider')) {
    setTimeout(initSwiper, 100);
    return;
  }

  var swiper = new Swiper('.blog-slider', {
    passiveListeners: true,
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    autoplay: {
      disableOnInteraction: true,
      delay: 3000
    },
    mousewheel: true,
    pagination: {
      el: '.blog-slider__pagination',
      clickable: true,
    },
    on: {
      init: function() {
        document.querySelector('.blog-slider').style.opacity = '1';
      }
    }
  });

  var container = document.getElementById('swiper_container');
  if (container !== null) {
    container.onmouseenter = function() {
      swiper.autoplay.stop();
    };
    container.onmouseleave = function() {
      swiper.autoplay.start();
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  initSwiper();
  if (typeof WOW === 'function') {
    new WOW().init();
  }
});

if (typeof Pjax === 'function') {
  document.addEventListener('pjax:complete', function() {
    initSwiper();
    if (typeof WOW === 'function') {
      new WOW().init();
    }
  });
}