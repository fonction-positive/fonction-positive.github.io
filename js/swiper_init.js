// 立即开始初始化过程
(function() {
    console.log('开始初始化 Swiper...');
    let currentSwiper = null; // 保存当前 Swiper 实例

    function destroySwiper() {
        if (currentSwiper && currentSwiper.destroy) {
            console.log('销毁旧的 Swiper 实例');
            currentSwiper.destroy(true, true); // 完全销毁，包括所有事件
            currentSwiper = null;
        }
    }
    
    function initSwiper() {
        // 检查 Swiper 是否加载
        if (typeof Swiper === 'undefined') {
            console.log('Swiper 未加载，等待中...');
            requestAnimationFrame(initSwiper);
            return;
        }
        console.log('Swiper 已加载');

        // 检查容器和数据是否准备好
        const slider = document.querySelector('.blog-slider');
        console.log('Slider 容器:', slider ? '存在' : '不存在');
        
        if (!slider || !slider.children.length) {
            console.log('Slider 内容未准备好，子元素数量:', slider?.children.length);
            requestAnimationFrame(initSwiper);
            return;
        }
        console.log('Slider 内容已准备好，子元素数量:', slider.children.length);

        // 确保内容已加载且未初始化过
        if (slider.children.length > 0 && !slider.swiper) {
            console.log('开始创建 Swiper 实例...');
            // 先销毁旧实例
            destroySwiper();
            
            // 创建新实例
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
                        console.log('Swiper 实例初始化完成');
                        slider.style.opacity = '1'; // 确保可见性
                    }
                }
            });

            var container = document.getElementById('swiper_container');
            console.log('Swiper 容器:', container ? '存在' : '不存在');
            
            if (container !== null) {
                container.onmouseenter = function() {
                    currentSwiper.autoplay.stop();
                    console.log('鼠标进入，自动播放停止');
                };
                container.onmouseleave = function() {
                    currentSwiper.autoplay.start();
                    console.log('鼠标离开，自动播放开始');
                }
            }
        } else {
            console.log('Swiper 已经初始化过或内容未准备好');
        }
    }

    // 立即开始初始化
    initSwiper();

    // pjax 加载完成后重新初始化
    if (typeof Pjax === 'function') {
        console.log('Pjax 可用，添加 pjax:complete 监听');
        document.addEventListener('pjax:complete', function() {
            console.log('Pjax 加载完成，准备重新初始化 Swiper');
            // 给一个短暂延时确保 DOM 更新完成
            setTimeout(() => {
                destroySwiper(); // 确保旧实例被销毁
                initSwiper();    // 重新初始化
            }, 100);
        });

        // 添加 pjax:send 监听，在页面切换前销毁 Swiper
        document.addEventListener('pjax:send', function() {
            console.log('Pjax 开始切换页面，销毁当前 Swiper');
            destroySwiper();
        });
    }
})();