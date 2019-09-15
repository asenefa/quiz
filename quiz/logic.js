let container = document.querySelector('.container');
let btnStart = document.querySelector('.btnStart');
let questions = document.querySelector('.question');

btnStart.addEventListener('click', ()=>{
    container.innerHTML = '';
    generateQuestion('6*8=?',[48,46,54]);
    renderQuestion('2*4=?', [8,10,3]);

    // getCorrectAnswer();
})

function generateQuestion(question, arrAnswer){
    // let i = 0;
    // questions.innerHTML = `question${++i}`;
    let h3 = document.createElement('h3');
    h3.innerText = question;
    container.appendChild(h3);
    let form = document.createElement('form');
    
    arrAnswer.forEach((element, index) => {
                
        let radioBtn =`
        <label class="form-check-label" for="radio${index}">
        <input type="radio" class="form-check-input" id="radio${index}" name="optradio" value="${element}" >${element}
      </label>
        `;
        form.insertAdjacentHTML('beforeend', radioBtn);
        
    });
    container.appendChild(form);
    let btnAnswer = `<button type="submit" class="btn btn-dark" id="btnAnswer">Submit</button>`;
    container.insertAdjacentHTML('beforeend', btnAnswer);

};
function renderQuestion(question, arrAnswer, correctAnswer){
    document.querySelector('#btnAnswer').addEventListener('click', ()=>{
        container.innerHTML = '';
        generateQuestion(question,arrAnswer);
    });
    // getCorrectAnswer();    
};

function getCorrectAnswer(){
    let radioBtn = document.querySelectorAll('[name="optradio"]');
    console.log(radioBtn);
    let arrRadioBtn = Array.from(radioBtn);
    arrRadioBtn.forEach(element=>{
        if (element.checked === 46){
            console.log(element,'+');
        }else{
            console.log('er');
            
        }
        
    })
    // console.log(arrRadioBtn[1].value);
    
    
}


function check()
{
    var inp = document.getElementsByName('optradio');
    for (var i = 0; i < inp.length; i++) {
        if (inp[i].type == "radio" && inp[i].checked) {
            alert("selected: " + inp[i].value);
        }
    }
}
