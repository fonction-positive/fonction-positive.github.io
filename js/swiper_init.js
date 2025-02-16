// 确保 Swiper 已加载
function initSwiper() {
    if (typeof Swiper === 'undefined') {
        // 如果 Swiper 未加载，等待 100ms 后重试
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
        // autoHeight: true,
        pagination: {
            el: '.blog-slider__pagination',
            clickable: true,
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
document.addEventListener('DOMContentLoaded', initSwiper);

// pjax 加载完成后重新初始化
if (typeof Pjax === 'function') {
    document.addEventListener('pjax:complete', initSwiper);
}