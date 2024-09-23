function loadData() {
    fetch('./theme/js/pingpang.json')
        .then(response => response.json())
        .then(data => {
            const dataList = data['data'];
            const container = document.getElementById('recordContainer');
            const navMenu = document.getElementById('navMenu');
            const menuH2 = document.createElement('h2');
            menuH2.innerHTML = '对局时间';
            navMenu.appendChild(menuH2);
            const hr0 = document.createElement('hr');
            container.appendChild(hr0);
            let menuAllNum = 0;
            let menuLongWin = 0;
            let menuTaoWin = 0;
            dataList.forEach(itemData => {
                const time = itemData['time'];
                const date = itemData['date'];
                const longData = itemData['王云龙'];
                const taoData = itemData['王锦涛'];
                let longWin = 0;
                let taoWin = 0;
                let collectLongAll = 0;
                let collectTaoAll = 0;

                const dataLength = longData.length;
                menuAllNum+=dataLength;
                let tableNum = Math.floor(dataLength/15)+1;
                const lastTableRecordNum = dataLength%15;
                if(lastTableRecordNum==0){
                    tableNum-=1;
                }
                for(let num=0; num<tableNum; num++){
                    thisTableLongWin = 0;
                    thisTableTaoWin = 0;

                    const article = document.createElement('article');
                    if(num==0){
                        const h4 = document.createElement('h4');
                        const ah4 = document.createElement('a');
                        ah4.innerHTML = date+' '+time;
                        ah4.href = '#'+date+' '+time;
                        h4.appendChild(ah4);
                        navMenu.appendChild(h4)
                        const h3 = document.createElement('h3');
                        h3.innerHTML = date+' '+time+' ';
                        h3.id = date+' '+time;
                        const a = document.createElement('a');
                        a.innerHTML = '点击下载 '+date+' 表格';
                        a.href = './theme/download/record '+date+'.xlsx';
                        h3.appendChild(a);
                        article.appendChild(h3);
                    }
                    const table = document.createElement('table');
                    table.className = 'ping-table';
                    for(let j=0; j<3; j++){
                        const tr = document.createElement('tr');
                        for(let i=0; i<17 ; i++){
                            const td = document.createElement('td');
                            if(i==0){
                                if(j==0){
                                    td.innerHTML = '对局数';
                                }else if(j==1){
                                    td.innerHTML = '王云龙';
                                }else{
                                    td.innerHTML = '王锦涛';
                                }
                                td.className = 'col-color-1 width-8 min-w-60';
                            } else if (i==16){
                                if(j==0){
                                    td.innerHTML = '总';
                                    td.className = 'col-color-1 width-5';
                                }else if(j==1){
                                    td.innerHTML = thisTableLongWin;
                                    td.className = 'col-color-0 width-5';
                                }else{
                                    td.innerHTML = thisTableTaoWin;
                                    td.className = 'col-color-0 width-5';
                                }
                            } else{
                                if(num==(tableNum-1)&&lastTableRecordNum>0){
                                    lastRecordIndex = lastTableRecordNum
                                }else{
                                    lastRecordIndex = 15
                                }
                                if(j==0){
                                    td.innerHTML = num*15 + i;
                                    td.className = 'col-color-1 width-5';
                                }else if(j==1){
                                    if(i<=lastRecordIndex){
                                        if(longData[num*15+i-1]>=11&&longData[num*15+i-1]>taoData[num*15+i-1]){
                                            thisTableLongWin++;
                                            longWin++;
                                            td.className = 'col-color width-5';
                                        }else{
                                            td.className = 'col-color-0 width-5';
                                        }
                                        td.innerHTML = longData[num*15+i-1];
                                        collectLongAll+=longData[num*15+i-1];
                                    }else{
                                        td.innerHTML = '';
                                        td.className = 'col-color-0 width-5';
                                    }
                                }else{
                                    if(i<=lastRecordIndex){
                                        if(taoData[num*15+i-1]>=11&&taoData[num*15+i-1]>longData[num*15+i-1]){
                                            thisTableTaoWin++;
                                            taoWin++;
                                            td.className = 'col-color width-5';
                                        }else{
                                            td.className = 'col-color-0 width-5';
                                        }
                                        td.innerHTML = taoData[num*15+i-1];
                                        collectTaoAll+=taoData[num*15+i-1];
                                    }else{
                                        td.innerHTML = '';
                                        td.className = 'col-color-0 width-5';
                                    }
                                }
                            }
                            tr.appendChild(td);
                        }
                        table.appendChild(tr);
                    }
                    const div = document.createElement('div');
                    div.className = 'm-t-12';
                    article.appendChild(div);
                    article.appendChild(table);
                    container.appendChild(article);
                }

                const article = document.createElement('article');
                const div = document.createElement('div');
                div.className = 'm-t-12';
                article.appendChild(div);

                const allTotalNum = longWin+taoWin;
                menuLongWin+=longWin;
                menuTaoWin+=taoWin;
                const dateTime = itemData['date'];

                const table = document.createElement('table');
                table.className = 'ping-table';

                const tr0 = document.createElement('tr');
                const td0 = document.createElement('td');
                td0.className = 'col-color width-10';
                td0.innerHTML = dateTime + ' 当日汇总';
                td0.setAttribute("colspan", "8");
                tr0.appendChild(td0);
                table.appendChild(tr0);

                const tr1 = document.createElement('tr');
                const td11 = document.createElement('td');
                td11.className = 'col-color width-15';
                td11.innerHTML = '王云龙';
                tr1.appendChild(td11);
                const td12 = document.createElement('td');
                td12.className = 'col-color-0 width-15';
                td12.innerHTML = '胜'+longWin+' 负'+taoWin+'';
                tr1.appendChild(td12);
                const td13 = document.createElement('td');
                td13.className = 'col-color width-15';
                td13.innerHTML = '对局胜率';
                tr1.appendChild(td13);
                const td14 = document.createElement('td');
                td14.className = 'col-color-0 width-15';
                let todayLongRate = (longWin*100/allTotalNum).toFixed(1);
                td14.innerHTML = longWin+'/'+allTotalNum+'='+todayLongRate+'%';
                tr1.appendChild(td14);
                const td15 = document.createElement('td');
                td15.className = 'col-color width-10';
                td15.innerHTML = '总赢球';
                tr1.appendChild(td15);
                const td16 = document.createElement('td');
                td16.className = 'col-color-0 width-10';
                td16.innerHTML = collectLongAll;
                tr1.appendChild(td16);
                const td17 = document.createElement('td');
                td17.className = 'col-color width-10';
                td17.innerHTML = '赢球率';
                tr1.appendChild(td17);
                const td18 = document.createElement('td');
                td18.className = 'col-color-0 width-10';
                let rate2=(collectLongAll*100/(collectLongAll+collectTaoAll)).toFixed(1);
                td18.innerHTML = collectLongAll+'/'+(collectLongAll+collectTaoAll)+'='+rate2+'%';
                tr1.appendChild(td18);
                table.appendChild(tr1);

                const tr2 = document.createElement('tr');
                const td21 = document.createElement('td');
                td21.className = 'col-color width-15';
                td21.innerHTML = '王锦涛';
                tr2.appendChild(td21);
                const td22 = document.createElement('td');
                td22.className = 'col-color-0 width-15';
                td22.innerHTML = '胜'+taoWin+' 负'+longWin+'';
                tr2.appendChild(td22);
                const td23 = document.createElement('td');
                td23.className = 'col-color width-15';
                td23.innerHTML = '对局胜率';
                tr2.appendChild(td23);
                const td24 = document.createElement('td');
                td24.className = 'col-color-0 width-15';
                let todayTaoRate = (taoWin*100/allTotalNum).toFixed(1);
                td24.innerHTML = taoWin+'/'+allTotalNum+'='+todayTaoRate+'%';
                tr2.appendChild(td24);
                const td25 = document.createElement('td');
                td25.className = 'col-color width-10';
                td25.innerHTML = '总赢球';
                tr2.appendChild(td25);
                const td26 = document.createElement('td');
                td26.className = 'col-color-0 width-10';
                td26.innerHTML = collectTaoAll;
                tr2.appendChild(td26);
                const td27 = document.createElement('td');
                td27.className = 'col-color width-10';
                td27.innerHTML = '赢球率';
                tr2.appendChild(td27);
                const td28 = document.createElement('td');
                td28.className = 'col-color-0 width-10';
                let rate4=(collectTaoAll*100/(collectLongAll+collectTaoAll)).toFixed(1);
                td28.innerHTML = collectTaoAll+'/'+(collectLongAll+collectTaoAll)+'='+rate4+'%';
                tr2.appendChild(td28);
                table.appendChild(tr2);

                article.appendChild(table);
                container.appendChild(article);
                const hr = document.createElement('hr');
                container.appendChild(hr);
            });

            const menuH22 = document.createElement('h2');
            menuH22.innerHTML = '胜率汇总';
            navMenu.appendChild(menuH22);
            const menuH30 = document.createElement('h4');
            menuH30.innerHTML = '总对局天数 : '+dataList.length;
            navMenu.appendChild(menuH30);
            const menuH40 = document.createElement('h4');
            menuH40.innerHTML = '总对局次数 : '+menuAllNum;
            navMenu.appendChild(menuH40);
            const menuH41 = document.createElement('h4');
            menuH41.innerHTML = '王云龙 总胜: '+menuLongWin+' / 胜率: '+(menuLongWin*100/(menuLongWin+menuTaoWin)).toFixed(1)+'%';
            navMenu.appendChild(menuH41);
            const menuH42 = document.createElement('h4');
            menuH42.innerHTML = '王锦涛 总胜: '+menuTaoWin+' / 胜率: '+(menuTaoWin*100/(menuLongWin+menuTaoWin)).toFixed(1)+'%';
            navMenu.appendChild(menuH42);
        })
        .catch(error => console.error('Error:', error));
}
loadData()