// declaração constantes
const MINUTES_IN_ONE_HOUR = 60;
const SECONDS_IN_ONE_MINUTE = 60;
const HALF_HOURS_IN_ONE_DAY = 12;
const FULL_ROTATION = 360;
const ROTATION = 30;
const PM = 12;

// função para adicionar elementos. fonte: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement e https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
function addElement() {
    let clockNumber = 1;
    let subClockNumber = 1;
    let rotation = 30;
    // para cada DIV, adiciona o valor de 1 a 12 e os alinha a cada 30 graus
    for (clockNumber; clockNumber <= HALF_HOURS_IN_ONE_DAY; clockNumber++) {
        var parent = document.getElementById(clockNumber); // define o elemento pai           
        var newDiv = document.createElement('div'); // define novo elemento (div)
        var newContent = document.createTextNode(clockNumber); // define o texto da div
        newDiv.appendChild(newContent); // adiciona o texto da div dentro da mesma
        newDiv.style.transform = 'rotate(-' + rotation + 'deg)'; // rotaciona o texto para ficar na mesma posição - 0 (zero) grau
        newDiv.id = 'hourID' + clockNumber;
        parent.insertAdjacentElement('afterbegin', newDiv); // adiciona a nova div no elemento pai (após a div)
        parent.style.transform = 'rotate(' + rotation + 'deg)'; // rotaciona o elemento pai a cada 30 graus
        rotation += ROTATION; // acrescenta mais 30 graus para alinhar a próxima div                
    }
}

// declaração variáveis
let second = document.querySelector("#second");
let minute = document.querySelector("#minute");
let hour = document.querySelector("#hour");

setInterval(rotation, 1000)  //função para rotacionar o ponteiro a cada 1 segundo (1000ms)

// função para rotacionar os ponteiros
function rotation() {
    var date = new Date();
    var getSeconds = date.getSeconds() / SECONDS_IN_ONE_MINUTE;
    var getMinutes = (getSeconds + date.getMinutes()) / MINUTES_IN_ONE_HOUR;
    var getHours = (getMinutes + date.getHours()) / HALF_HOURS_IN_ONE_DAY;

    second.style.transform = 'rotate(' + getSeconds * FULL_ROTATION + 'deg)';
    minute.style.transform = 'rotate(' + getMinutes * FULL_ROTATION + 'deg)';
    hour.style.transform = 'rotate(' + getHours * FULL_ROTATION + 'deg)';

    // verifica se a hora pelo date.GetHours() é AM (entre 00h e 11h59min59seg) ou PM (entre 12h e 23h59min59seg) pelo horário do Date()
    if (date.getHours() < PM) {
        document.getElementById('amPm').innerHTML = 'AM';
    }
    else {
        document.getElementById('amPm').innerHTML = 'PM';
    }
}
