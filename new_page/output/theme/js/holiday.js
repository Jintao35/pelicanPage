function loadData() {
    fetch('./theme/js/holiday.json')
        .then(response => response.json())
        .then(data => {
            const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            const dataList = data['data'];
            const container = document.getElementById('recordContainer');
            const navMenu = document.getElementById('navMenu');
            const menuH2 = document.createElement('h2');
            menuH2.innerHTML = '年月时间';
            navMenu.appendChild(menuH2);
            dataList.forEach(itemData => {
                const yearMonth = itemData['year-month'];
                const restDay = itemData['rest-day'];
                const allDayInMonth = getDaysInCurrentMonth(yearMonth+'-01');
                const startDayWeek = getWeekday(yearMonth+'-01');

                const article = document.createElement('article');
                const table = document.createElement('table');
                table.className = 'ping-table';
                for(let j=0; j<8; j++){
                    let endFlg = 0;
                    const tr = document.createElement('tr');
                    for(let i=0; i<7 ; i++){
                        const td = document.createElement('td');
                        if(j==0){
                            td.innerHTML = yearMonth.replace('-',' 年 ')+' 月';
                            td.className = 'col-color-1';
                            td.setAttribute('colspan','7');
                            tr.appendChild(td);
                            break;
                        }else if(j==1){
                            td.innerHTML = weekdays[i];
                            td.className = 'col-color-1 width-10';
                        }else{
                            if(j==2){
                                if(startDayWeek==7){
                                    continue;
                                }else{
                                    if(i<startDayWeek){
                                        td.innerHTML = '';
                                    }else{
                                        td.innerHTML = i-startDayWeek+1;
                                    }
                                }
                            }else{
                                const realDay = (j-2)*7+i+1-startDayWeek;
                                td.innerHTML = realDay;
                                if(allDayInMonth<realDay){
                                    td.innerHTML = '';
                                    endFlg++;
                                }
                            }
                            td.className = 'col-color-0 width-10';
                            let dayWeek = 0;
                            if(td.innerHTML>0&&td.innerHTML<10){
                                dayWeek = getWeekday(yearMonth+'-0'+td.innerHTML);
                            }else if(td.innerHTML>9&&td.innerHTML<32){
                                dayWeek = getWeekday(yearMonth+'-'+td.innerHTML);
                            }
                            if(7==dayWeek||6==dayWeek){
                                td.className = 'col-color width-10';
                            }
                            restDay.forEach(restD=>{
                                if(restD==td.innerHTML){
                                    td.className = 'col-color width-10';
                                }
                            });
                        }
                        tr.appendChild(td);
                    }
                    if(endFlg>6){
                        break;
                    }
                    if(j==2&&startDayWeek==7){
                        continue;
                    }
                    table.appendChild(tr);
                }
                const div = document.createElement('div');
                div.className = 'm-t-12';
                article.appendChild(div);
                article.appendChild(table);
                container.appendChild(article);
            });
        })
        .catch(error => console.error('Error:', error));
}

function getDaysInCurrentMonth(dateString) {
  // 创建Date对象
  const date = new Date(dateString);

  // 获取当前月份和年份
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // 判断是否是闰年
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  // 计算本月有多少天
  const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return daysInMonth[month - 1];
}

function getWeekday(dateString) {
  // 创建Date对象
  const date = new Date(dateString);

  // 获取星期几的数字表示
  const dayNumber = date.getDay();

  // 将数字表示转换为中文的星期几名称
  const weekdays = [7, 1, 2, 3, 4, 5, 6];
  return weekdays[dayNumber];
}


loadData()