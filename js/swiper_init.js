// 同时初始化 Swiper 和 WOW
function initSwiper() {
    if (typeof Swiper === 'undefined' || !document.querySelector('.blog-slider')) {
        // 如果 Swiper 未加载或没有 blog-slider 元素，等待 100ms 后重试
        setTimeout(initSwiper, 100);
        return;
    }

    // 立即初始化 Swiper
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
        // autoHeight: true,
        pagination: {
            el: '.blog-slider__pagination',
            clickable: true,
        },
        // 添加初始化回调
        on: {
            init: function() {
                // 确保 Swiper 容器可见
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

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 同时初始化 Swiper 和 WOW
    initSwiper();
    if (typeof WOW === 'function') {
        new WOW().init();
    }
});

// pjax 加载完成后重新初始化
if (typeof Pjax === 'function') {
    document.addEventListener('pjax:complete', function() {
        initSwiper();
        if (typeof WOW === 'function') {
            new WOW().init();
        }
    });
}