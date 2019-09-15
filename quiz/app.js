// let random = (Math.random()*10).toFixed();
// let usedId = [];
let score = 0;
let index = 0;
let indexCreateQuiz = 0;
let statusClick = true;
// let value = 0;
let arrQuestionsTamplate = [
    {
        id:0,
        question:'3*(5-3)=?',
        answerOptions: [2, 5, 7, 6],
        correctAnswer: 6
    },
    {
        id:1,
        question:'2*2=?',
        answerOptions: [2, 4, 7, 6],
        correctAnswer: 4
    },{
        id:2,
        question:'2*3=?',
        answerOptions: [6, 10, 18, 8],
        correctAnswer: 6
    },{
        id:3,
        question:'2*4=?',
        answerOptions: [2, 5, 8, 10],
        correctAnswer: 8
    },{
        id:4,
        question:'2*5=?',
        answerOptions: [12, 10, 7, 6],
        correctAnswer: 10
    },{
        id:5,
        question:'2*6=?',
        answerOptions: [12, 5, 7, 6],
        correctAnswer: 12
    },{
        id:6,
        question:'2*7=?',
        answerOptions: [2, 14, 7, 6],
        correctAnswer: 14
    },{
        id:7,
        question:'2*8=?',
        answerOptions: [2, 5, 7, 16],
        correctAnswer: 16
    },{
        id:8,
        question:'2*9=?',
        answerOptions: [2, 5, 18, 6],
        correctAnswer: 18
    },{
        id:9,
        question:'12*12=?',
        answerOptions: [144, 142, 121, 122],
        correctAnswer: 144
    }
];
let arrGames = [];
let arrCreatedQuestion = [];
let ownQuize = {};



let container = document.querySelector('.container');
document.querySelector('#btnStart').addEventListener('click',()=>{startGame(arrQuestionsTamplate)});
document.querySelector('#btnCreate').addEventListener('click',()=>{createQuiz();}); // cделать нажатие срабатывало один раз
// document.querySelector('#btnPlayOwn').addEventListener('click',()=>{startGame(arrCreatedQuestion)});


function startGame(arr){
        // document.querySelector('#btnStart').remove();
        // document.querySelector('#btnCreate').remove();
        container.innerHTML = '';
        let btnAnswer = document.createElement('button');
        btnAnswer.classList.add('btn', 'btn-dark');
        btnAnswer.id = 'btnAnswer';
        btnAnswer.innerText ='Submit';

        btnAnswer.addEventListener('click',()=>{
            check(arr);
            container.innerHTML = '';
            getQuestion(arr);
        });
        getQuestion(arr);

        container.parentElement.appendChild(btnAnswer);

}


function getQuestion(arrQuestions){

    if(index < arrQuestions.length){
        let questionToShow = arrQuestions[index];
        let h3 = document.createElement('h3');
        h3.innerText = questionToShow.question;
        container.appendChild(h3);
        questionToShow.answerOptions.forEach(el =>{
            let radioBtn =`<input type="radio" class="option" name="optradio" value="${el}" >${el}`;
            container.insertAdjacentHTML('beforeend',radioBtn);
        });

        index++;
    }
    else{
        document.querySelector('#btnAnswer').remove();
        container.innerText= 'THE END\nYOUR SCORE  ' + score +'\n';
        startNewGame();
    }    

}
function check(arrQuestions){
    let radioBtn = document.querySelectorAll('input[name = "optradio"]');
    let correctAnswerToCheck = arrQuestions[index-1];
    radioBtn.forEach(el=>{
        if(el.checked === true && el.value ==correctAnswerToCheck.correctAnswer){
            score++;
            console.log(score);
        }
    })
}

function startNewGame(){
    let btnStart = document.createElement('button');
    btnStart.classList.add('btn', 'btn-dark', 'btnStart');
    btnStart.id = 'btnStart';
    btnStart.innerText ='Start';
    container.appendChild(btnStart);

    let btnCreate = document.createElement('button');
    btnCreate.classList.add('btn', 'btn-dark', 'btnCreate');
    btnCreate.id = 'btnCreate';
    btnCreate.innerText ='Create quiz';
    container.appendChild(btnCreate);
/////////////////////////
    let btnPlayOwn = document.createElement('button');
    btnPlayOwn.classList.add('btn', 'btn-dark', 'btnPlayOwn');
    btnPlayOwn.id = 'btnPlayOwn';
    btnPlayOwn.innerText ='Start own quiz';
    container.appendChild(btnPlayOwn);

    index = 0;
    indexCreateQuiz = 0;
    // arrCreatedQuestion = [];

    btnStart.addEventListener('click',()=>{startGame(arrQuestionsTamplate)});
    btnCreate.addEventListener('click',()=>{createQuiz()});
    btnPlayOwn.addEventListener('click',()=>{
        console.log(arrCreatedQuestion);
        
        startGame(arrCreatedQuestion)
    });
    

}

function createQuiz(){
    container.innerHTML = '';
    let div = document.createElement('div');
    div.classList.add("cresteQuiz");
    container.appendChild(div);
    let titleLable = document.createElement('label');
    titleLable.innerText = 'Title game:';
    div.appendChild(titleLable);
    let titleValue = document.createElement('input');
    div.appendChild(titleValue);


    let label = document.createElement('label');
    label.innerText = 'Amount of question:';-+
      
    div.appendChild(label);
    let numberOfQuestions = document.createElement('input');
    div.appendChild(numberOfQuestions);

    let btnNumberQuestion = document.createElement('button');
    btnNumberQuestion.classList.add('btn', 'btn-dark', 'btnStart');
    btnNumberQuestion.id = 'btnNumberQuestion';
    btnNumberQuestion.innerText ='OK';
    div.appendChild(btnNumberQuestion);

    btnNumberQuestion.addEventListener('click', ()=>{

        if(!numberOfQuestions.value.match(/^\d+$/) || titleValue.value.length === 0 ){
            alert('fill the form!');
            return false;
        }else{
            ownQuize.title = titleValue.value;
            ownQuize.numberQuestion = numberOfQuestions.value;

            console.log(ownQuize);
            container.innerHTML = '';

            let btnAddQuestion = document.createElement('button');
            btnAddQuestion.classList.add('btn', 'btn-dark', 'btnNumberQuestion');
            btnAddQuestion.id = 'btnNumberQuestion';
            btnAddQuestion.innerText ='Add to quiz';
            container.after(btnAddQuestion);

            templateQuestion();
            btnAddQuestion.addEventListener('click',()=>{
                createQuestion();
                templateQuestion();
            })

        }
    }) 
}

// localStorage.setItem('ключ', 'значение');
// console.log(localStorage.getItem('ключ'));

// localStorage.setItem('ключ', arrQuestions[0].correctAnswer);

// localStorage.removeItem('ключ')

function templateQuestion(){
    if(indexCreateQuiz < +ownQuize.numberQuestion){
        container.innerHTML = '';
        let questionDiv = document.createElement('div');
        questionDiv.classList.add('add-answer');
        container.appendChild(questionDiv);
        let questionLable = document.createElement('label');
        questionLable.innerText = 'Question:';
        questionDiv.appendChild(questionLable);
        let questionValue = document.createElement('input');
        questionValue.id = 'questionValue';
        questionDiv.appendChild(questionValue);

        let optionDiv = document.createElement('div');
        optionDiv.classList.add('add-answer');
        container.appendChild(optionDiv);
        let optionLable = document.createElement('label');
        optionLable.innerText = 'Options: ';
        optionDiv.appendChild(optionLable);
        let firstOption = document.createElement('input');
        firstOption.id  = 'firstOption';
        optionDiv.appendChild(firstOption);
        let secondOption = document.createElement('input');
        secondOption.id = 'secondOption';
        optionDiv.appendChild(secondOption);
        let thirdOption = document.createElement('input');
        thirdOption.id = 'thirdOption';
        optionDiv.appendChild(thirdOption);
        let fourthOption = document.createElement('input');
        fourthOption.id = 'fourthOption';
        optionDiv.appendChild(fourthOption);

        let correctAnswDiv = document.createElement('div');
        correctAnswDiv.classList.add('add-answer');
        container.appendChild(correctAnswDiv);
        let correctAnswLable = document.createElement('label');
        correctAnswLable.innerText = 'Correct answer:';
        correctAnswDiv.appendChild(correctAnswLable);
        let correctAnswValue = document.createElement('input');
        correctAnswValue.id = 'correctAnswValue';
        correctAnswDiv.appendChild(correctAnswValue);++

        indexCreateQuiz
    }else{
            container.innerHTML = '<h4 id="gameCreated">game created</h4>';
            document.querySelector('#btnNumberQuestion').remove();
            startNewGame();
        }
}

function createQuestion(){

    let newQuestion = {};
    newQuestion.id = indexCreateQuiz;
    newQuestion.question = document.querySelector('#questionValue').value;

    newQuestion.answerOptions = [+document.querySelector('#firstOption').value,
        +document.querySelector('#secondOption').value,
        +document.querySelector('#thirdOption').value,
        +document.querySelector('#fourthOption').value];

    // if (newQuestion.answerOptions.some(function(item) { return item === document.querySelector('#correctAnswValue').value; }) === true){
        newQuestion.correctAnswer =  +document.querySelector('#correctAnswValue').value;
    // }else {
    //     newQuestion = {};
    //     alert('Correct answer have to equal to one of option!')
    // }
    arrCreatedQuestion.push(newQuestion);

    console.log('game arr with obj (arr questions)', arrCreatedQuestion);
    
}

