function ajax(url, type = 'get', success, data) {
    let xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest;
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
    xhr.open(type, url, true)
    if (type.toLowerCase() == 'post' && data != 'undefined') {
        xhr.send(data)
    } else {
        xhr.send()
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            success(data);
        }
    }
}





    let find = document.querySelector('.find');
    let mask = document.querySelector('.mask')
    let name = document.querySelector('.name')
    let sex = document.querySelector('.sex')
    let yw = document.querySelector('.yw')
    let sx = document.querySelector('.sx')
    let yy = document.querySelector('.yy')
        //刷新
    xiugai();
    remove();
    //添加
    add.addEventListener('click', () => {
            name.value = '';
            sex.value = '';
            yw.value = '';
            sx.value = '';
            yy.value = '';
            mask.style.display = 'block'
            no.onclick = () => {
                mask.style.display = 'none';

            }
            yes.onclick = () => {
                mask.style.display = 'none';
                let url = `http://127.0.0.1:3000/add?name=${name.value}&sex=${sex.value}&yw=${yw.value}&sx=${sx.value}&yy=${yy.value}`
                ajax(url, 'get', (data) => {
                    shuju.innerHTML += `<tr><td>${data.name}</td><td>${data.sex}</td>
                <td>${data.yw}</td><td>${data.sx}</td><td>${data.yy}</td>
                <td><button class='xiugai'>修改</button><button class='shanchu'>删除</button></td></tr>`

                    xiugai();
                    remove();
                })
            }
        })
        //查询
    chazhao.onclick = () => {
            shuju.innerHTML = '';
            if (find.value) {
                ajax(`http://127.0.0.1:3000/find?name=${find.value}`, 'get', (data) => {
                    for (let i = 0; i < data.length; i++) {
                        shuju.innerHTML += `<tr><td>${data[i].name}</td><td>${data[i].sex}</td>
                <td>${data[i].yw}</td><td>${data[i].sx}</td><td>${data[i].yy}</td>
                <td><button class='xiugai'>修改</button><button class='shanchu'>删除</button></td></tr>`
                    }
                    xiugai();
                    remove();
                })
            } else {
                ajax(`http://127.0.0.1:3000/findAll?name=${find.value}`, 'get', (data) => {
                    console.log(data)
                    let html = template('shu', {
                        shu: data
                    });
                    shuju.innerHTML += html
                    xiugai();
                    remove();
                })
            }
        }
        //封装修改函数
    function xiugai() {
        let xiugais = document.querySelectorAll('.xiugai')
        let trs = document.querySelectorAll('#shuju tr');
        let inputs = document.querySelectorAll("ul input");
        xiugais.forEach((value, index) => {
            xiugais[index].onclick = () => {
                let tds = trs[index].querySelectorAll('td');
                mask.style.display = 'block';
                for (let i = 0; i < tds.length - 1; i++) {
                    inputs[i].value = tds[i].innerHTML;
                }
                yes.onclick = () => {
                    mask.style.display = 'none';
                    let url = `http://127.0.0.1:3000/update?oname=${tds[0].innerHTML}&nname=${inputs[0].value}&nsex=${inputs[1].value}&nyw=${inputs[2].value}&nsx=${inputs[3].value}&nyy=${inputs[4].value}`
                    ajax(url, 'get', (data) => {
                        console.log(data)
                        for (let i = 0; i < tds.length - 1; i++) {
                            tds[i].innerHTML = inputs[i].value;
                        }
                    })
                }
                no.addEventListener('click', () => {
                    mask.style.display = 'none';
                })
            }
        })
    }
    //封装删除函数
    function remove() {
        let shanchus = document.querySelectorAll('.shanchu')
        let trs = document.querySelectorAll('#shuju tr');
        shanchus.forEach((value, index) => {
            shanchus[index].onclick = () => {
                let tds = trs[index].querySelectorAll('td');
                panduan.style.display = 'block';
                qd.onclick = () => {
                    panduan.style.display = 'none';
                    ajax(`http://127.0.0.1:3000/remove?name=${tds[0].innerHTML}`, 'get', (data) => {
                        console.log(data);
                        trs[index].remove();
                    })
                }
                qx.onclick = () => {
                    panduan.style.display = 'none';
                }
            }
        })
    }

