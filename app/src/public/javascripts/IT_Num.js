let selectSel = null;
const time = document.getElementById('timer');
time.innerHTML = '0秒';
let problem = new Array;
let cand = new Array;
let answer = new Array;

function btnClick(id){
    let btn = document.getElementById(id);
    let color = btn.style.backgroundColor;   

    if(selectSel != null){
        let bfr = document.getElementById(selectSel);
        bfr.style.backgroundColor = 'seashell';
    }

    if(color == 'seashell'){
        btn.style.backgroundColor='yellow';                
        selectSel = id
    }else if(color == 'yellow'){
        btn.style.backgroundColor = 'seashell';
        selectSel = null
    }
}
function numinput(id){
    if(selectSel != null){
        let num = document.getElementById(id);
        let btn = document.getElementById(selectSel);
        btn.innerHTML = num.innerHTML;
        btn.style.color = 'black';
        btn.style.fontSize = "120%";
    }
}
function optClick(id){
    let btn = document.getElementById(id);
    let color = btn.style.backgroundColor;

    if(color != 'yellow'){
        btn.style.backgroundColor='yellow';        
    }else{
        btn.style.backgroundColor='';
    }
}
document.getElementById("memo").addEventListener('click',
() => {
    let btn = document.getElementById("0-0");
    var cnum = new String;
    for(i=0;i<9;i++){
        for(j=0;j<9;j++){
            let id = i + "-" + j;
            btn = document.getElementById(id);
            if(btn.innerHTML == "."){
                cnum = "123\n456\n789";
                for(k=1;k<=9;k++){
                    if(cand[i][j].indexOf(k) == -1){
                        cnum = cnum.replace(k,"&nbsp;&thinsp;");
                    }
                }
                btn.innerHTML = cnum;
                btn.style.fontSize = "100%";
                btn.style.lineHeight = "13.5px"
                btn.style.letterSpacing = "1.5px"
            }
        }
    }
});

function createQues(){
    var ques = sudoku.generate("insane");
    problem = sudoku.board_string_to_grid(ques);
    cand = sudoku.get_candidates(ques);
    for(i=0;i<9;i++){
        for(j=0;j<9;j++){
            let id = i + "-" + j;
            let btn = document.getElementById(id);
            btn.innerHTML = problem[i][j];
            if(problem[i][j] == "."){
                btn.style.backgroundColor = 'SeaShell';
                btn.style.color = 'green';
            }else{
                btn.style.backgroundColor = '';
                btn.style.color = 'black';
            }
        }
    }    
}
function timeset(){
    let flg = false;
    let cnt = 0;
    let start = Date.now();
    
    setInterval(() => {
    
        if(flg){
            time.innerHTML = cnt + '秒';
        }else{
            // const millis = Date.now() - start;
            // time.innerHTML = Math.floor(millis / 1000)  + '秒';
            time.innerHTML = cnt++ + '秒';
        }
        
    }, 1000);
    
    document.getElementById('stop').addEventListener('click', () => {
        if(flg){
            flg = false;
        }else{
            flg = true;
        }
    });
    document.getElementById('game').addEventListener('click', () => {
        cnt = 0;
    });
}
function start(){
    createQues();
    timeset();
}


/*const content = document.getElementById('content');
const table = document.createElement('table');
const tbody = document.createElement('tbody');
table.appendChild(tbody);
table.border = "0";
table.id = "t5";
problem.forEach(element => {
    const tr = document.createElement('tr');

    element.forEach(e => {
        const td = document.createElement('td');
        const input = document.createElement('input');
        input.value = e;
        input.type = "submit";
        // td.innerHTML = e;
        td.appendChild(input);
        tr.appendChild(td);
    });
    tbody.appendChild(tr);

content.appendChild(table)
});*/

const record = document.getElementById('record');
record.addEventListener('click', () => {
    const XHR = new XMLHttpRequest();
    const username = document.getElementById('username').innerHTML;
    const urlEncodedData = encodeURIComponent('username') + '=' + encodeURIComponent(username) + '&' + encodeURIComponent('time') + '=' + encodeURIComponent(time.innerHTML);

    XHR.addEventListener('load', (event) => {
        // alert('data sent and response loaded');
    });

    XHR.open('POST', 'http://localhost:3000/record');
    XHR.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
    const result = XHR.send(urlEncodedData);
    console.log(result);
    location.href = 'http://localhost:3000/result';

});