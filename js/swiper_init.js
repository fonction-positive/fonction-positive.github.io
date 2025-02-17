(function() {
    let currentSwiper = null;
    let initializationTimer = null;

    function destroySwiper() {
        if (currentSwiper && currentSwiper.destroy) {
            currentSwiper.destroy(true, true);
            currentSwiper = null;
        }
        // 清除可能存在的定时器
        if (initializationTimer) {
            clearTimeout(initializationTimer);
            initializationTimer = null;
        }
    }
    
    function initSwiper() {
        // 确保之前的实例和定时器被清理
        destroySwiper();

        // 使用 Promise 来处理初始化
        return new Promise((resolve, reject) => {
            function tryInit() {
                if (typeof Swiper === 'undefined' || !document.querySelector('.blog-slider')) {
                    initializationTimer = setTimeout(tryInit, 100);
                    return;
                }

                const slider = document.querySelector('.blog-slider');
                if (!slider || !slider.children.length) {
                    initializationTimer = setTimeout(tryInit, 100);
                    return;
                }

                if (slider.children.length > 0 && !slider.swiper) {
                    currentSwiper = new Swiper('.blog-slider', {
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
                                slider.style.opacity = '1';
                                resolve(currentSwiper);
                            }
                        }
                    });

                    var container = document.getElementById('swiper_container');
                    if (container !== null) {
                        container.onmouseenter = function() {
                            currentSwiper.autoplay.stop();
                        };
                        container.onmouseleave = function() {
                            currentSwiper.autoplay.start();
                        }
                    }
                }
            }

            tryInit();
        });
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initSwiper().catch(console.error);
        });
    } else {
        initSwiper().catch(console.error);
    }

    // 处理 Pjax
    if (typeof Pjax === 'function') {
        document.addEventListener('pjax:send', () => {
            destroySwiper();
        });

        document.addEventListener('pjax:complete', () => {
            // 给DOM更新一些时间
            setTimeout(() => {
                initSwiper().catch(console.error);
            }, 100);
        });
    }
})();