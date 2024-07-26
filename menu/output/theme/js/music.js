function showMoreSinger() {
    let content = document.getElementById("showSingerContent").innerText;
    if(content=='收起歌手列表'){
        for (var i = 15; i < 49; i++) {
            document.getElementById('row' + i).style.display = 'none';
        }
        document.getElementById("showSingerContent").innerText = '更多歌手';
    }else{
        for (var i = 15; i < 49; i++) {
            document.getElementById('row' + i).style.display = 'block';
        }
        document.getElementById("showSingerContent").innerText = '收起歌手列表';
    }
}

function loadData() {
    fetch('./theme/js/artist.json')
        .then(response => response.json())
        .then(data => {
            const dataList = data['data']['list'];
            const artUrl = data['url'];
            const container = document.getElementById('artistContainer');
            let colIndex = 0;
            let rowIdIndex = 0;
            let div1 = document.createElement('div');
            div1.id = 'row0';
            dataList.forEach(itemData => {
                let id = itemData['id']
                let name = itemData['name']
                let pic = itemData['pic']
                if(colIndex==6){
                    rowIdIndex++;
                    colIndex=0;
                    container.appendChild(div1);
                    div1 = document.createElement('div');
                    div1.id = 'row'+rowIdIndex;
                    if(rowIdIndex>14){
                        div1.style.display = "none";
                    }
                }
                colIndex++;
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

    fetch('./theme/js/content.json')
        .then(response => response.json())
        .then(data => {
            const allDataList = data['data'];
            const artUrl = data['artUrl'];
            const albumUrl = data['albumUrl'];
            const container = document.getElementById('musicDetail');
            for(let artIndex=0;artIndex<allDataList.length;artIndex++){
                detailContent = allDataList[artIndex];
                let artName = detailContent['name'];
                let dataList = detailContent['list'];
                const button = document.createElement('button');
                button.className = 'titleClass';
                const div0 = document.createElement('div');
                div0.className = 'row';
                const div01 = document.createElement('div');
                div01.className = 'col-md-5';
                div01.innerHTML = artName;
                const div02 = document.createElement('div');
                div02.className = 'col-md-3';
                const div03 = document.createElement('div');
                div03.className = 'col-md-3';
                const div04 = document.createElement('div');
                div04.className = 'col-md-1';
                div0.appendChild(div01);
                div0.appendChild(div02);
                div0.appendChild(div03);
                div0.appendChild(div04);
                button.appendChild(div0);
                container.appendChild(button);
                const div1 = document.createElement('div');
                div1.className = 'panelContent';

                const div20 = document.createElement('div');
                div20.className = 'row';
                const div30 = document.createElement('div');
                div30.className = 'col-md-5';
                div30.innerHTML = '歌曲';
                const div40 = document.createElement('div');
                div40.className = 'col-md-3';
                div40.innerHTML = '歌手';
                const div50 = document.createElement('div');
                div50.className = 'col-md-3';
                div50.innerHTML = '专辑';
                const div60 = document.createElement('div');
                div60.className = 'col-md-1';
                div60.innerHTML = '时长';
                div20.appendChild(div30);
                div20.appendChild(div40);
                div20.appendChild(div50);
                div20.appendChild(div60);
                div1.appendChild(div20);

                dataList.forEach(itemData => {
                    let musicId = itemData['id']
                    let musicName = itemData['name']
                    let musicUrl = itemData['url']
                    let musicTime = itemData['time']
                    let artist = itemData['artist']
                    let album = itemData['album']

                    const div2 = document.createElement('div');
                    div2.className = 'row';

                    const div3 = document.createElement('div');
                    div3.className = 'col-md-5';
                    const a1 = document.createElement('a');
                    a1.target = '_blank';
                    a1.href = musicUrl;
                    a1.innerHTML = musicName;
                    div3.appendChild(a1);

                    const div4 = document.createElement('div');
                    div4.className = 'col-md-3';
                    if(artist!=null){
                        var allArtNameStr = '';
                        for(var a=0;a<artist.length;a++){
                            var art = artist[a];
                            var artId = art['id'];
                            var artName = art['name'];
                            allArtNameStr += artName;
                            if(allArtNameStr.length>15){
                                var comNodeText = document.createTextNode('...');
                                div4.appendChild(comNodeText);
                                break;
                            }
                            const a2 = document.createElement('a');
                            a2.target = '_blank';
                            a2.href = artUrl+artId;
                            a2.innerHTML = artName;
                            if(a>0){
                                var comNodeText = document.createTextNode(',');
                                div4.appendChild(comNodeText);
                            }
                            div4.appendChild(a2);
                        }
                    }

                    const div5 = document.createElement('div');
                    div5.className = 'col-md-3';
                    if(album!=null){
                        const a3 = document.createElement('a');
                        a3.target = '_blank';
                        a3.href = albumUrl+album['id'];
                        var albumName = album['name'];
                        if(albumName.length>15){
                            albumName = albumName.substring(0,15)+'...';
                        }
                        a3.innerHTML = albumName;
                        div5.appendChild(a3);
                    }

                    const div6 = document.createElement('div');
                    div6.className = 'col-md-1';
                    if(musicTime!=null){
                        let second = parseInt(musicTime)%60;
                        let minute = (parseInt(musicTime)-second)/60;
                        div6.innerHTML = minute + ':'+second;
                    }

                    div2.appendChild(div3);
                    div2.appendChild(div4);
                    div2.appendChild(div5);
                    div2.appendChild(div6);
                    div1.appendChild(div2);
                });
                container.appendChild(div1);
            }
            var acc = document.getElementsByClassName("titleClass");
            for (var i = 0; i < acc.length; i++) {
                acc[i].addEventListener("click", function() {
                    this.classList.toggle("active");
                    var panel = this.nextElementSibling;
                    if (panel.style.maxHeight) {
                        panel.style.maxHeight = null;
                    } else {
                        panel.style.maxHeight = panel.scrollHeight + "px";
                    }
                });
            }
        })
        .catch(error => console.error('Error:', error));
}
loadData()