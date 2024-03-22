// 获取所有的li元素
var tabItems = document.querySelectorAll('.tab li');

// 为每个li元素添加点击事件
for (var i = 0; i < tabItems.length; i++) {
    tabItems[i].addEventListener('click', function() {
        // 移除所有li元素的active类名
        for (var j = 0; j < tabItems.length; j++) {
            tabItems[j].classList.remove('active');
        }

        // 为当前点击的li元素添加active类名
        this.classList.add('active');
    });
}

function goToTab(tabNumber) {
    // 隐藏所有tab内容
    var tabContents = document.querySelectorAll('.tab-content');
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = 'none';
    }

    // 显示当前tab内容
    document.getElementById('tab' + tabNumber).style.display = 'block';
}