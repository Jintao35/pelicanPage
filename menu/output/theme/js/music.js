function loadData() {
    fetch('./theme/js/artist.json')
        .then(response => response.json())
        .then(data => {
            const dataList = data['data']['list'];
            const artUrl = data['url'];
            const container = document.getElementById('artistContainer');
            let rowIndex = 0;
            let div1 = document.createElement('div');
            dataList.forEach(itemData => {
                let id = itemData['id']
                let name = itemData['name']
                let pic = itemData['pic']
                if(rowIndex==6){
                    rowIndex=0;
                    container.appendChild(div1);
                    div1 = document.createElement('div');
                }
                rowIndex++;
                div1.className = 'row mar-top-20';
                const div2 = document.createElement('div');
                div2.className = 'col-md-2';
                const a = document.createElement('a');
                a.target = '_blank';
                a.href = artUrl+id;
                if(pic!=null){
                    const img = document.createElement('img');
                    img.src = pic;
                    a.appendChild(img);
                }
                if(name.length>10){
                    name = name.substring(0,9)+'...';
                }
                var textNode = document.createTextNode(name);
                a.appendChild(textNode);
                div2.appendChild(a);
                div1.appendChild(div2);
            });
        })
        .catch(error => console.error('Error:', error));
}
loadData()