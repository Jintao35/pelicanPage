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

function callApi() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('showContent').style.display = 'none';
    setTimeout(function() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('showContent').style.display = 'block';
        const hitokoto = document.getElementById('hitokoto_text')
        const hitokotoFrom = document.getElementById('hitokoto_author')
        hitokoto.innerText = "「  」"
        hitokotoFrom.innerText = "——「  」"
        fetch('https://v1.hitokoto.cn')
            .then(response => response.json())
            .then(data => {
              const hitokoto = document.getElementById('hitokoto_text')
              const hitokotoFrom = document.getElementById('hitokoto_author')
              hitokoto.href = 'https://hitokoto.cn/?uuid=' + data.uuid
              hitokotoFrom.href = 'https://hitokoto.cn/?uuid=' + data.uuid
              hitokoto.innerText = "「 " + data.hitokoto + " 」"
              if(data.from_who == null){
                hitokotoFrom.innerText = "——「" + data.from + "」"
              }else{
                hitokotoFrom.innerText = "—— " + data.from_who + "「" + data.from + "」"
              }
            })
            .catch(console.error)
    }, 1000);
}

callApi()