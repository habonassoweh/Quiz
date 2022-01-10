const question = document.querySelector("#question");
const choices = Array.from(document.querySelector(".choice-text"));
const progressText = document.querySelector("progressText");
const scoreText = document.querySelector("#score");
const progressBarFull= document.querySelector("#question");

let currentQuestion={}
let acceptingAnswers= true
let score= 0
let questionCounter= 0
let availableQuestions=[]

let questions= [
    {
        question: " Who is the first sign of the zodiac",
        choice1: "Capricorn",
        choice2: "Aries",
        choice3: "Neptune",
        choice4: "Virgo",
        answer: 2,
    },
    {
        question: " Who is the most talkative sign of the zodiac",
        choice1: "Gemini",
        choice2: "Pluto",
        choice3: "Libra",
        choice4: "Beyonce",
        answer: 1,
    },
    {
        question: " Which zodiac sign is considered the most lucky of the zodiac",
        choice1: "Leo",
        choice2: "Taurus",
        choice3: "Scorpio",
        choice4: "Sagittarius",
        answer: 4,
    },
    {
        question: " Which sign is considered the dreamer of the zodiac",
        choice1: "Pisces",
        choice2: "Cancer",
        choice3: "Aquarius",
        choice4: "Venus",
        answer: 1,
    }

]

const SCORE_POINTS=100
const MAX_QUESTIONS=4

startGame= ()=>{
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()

}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score)

        return window.location.assign("/end.html")
    }

    questionCounter++
    progressText.innerText = "Question ${questionCounter} of ${MAX_QUESTIONS}"
    progressBarFull.style.width = "${(questionCounter/MAX_QUESTIONS) * 100}%"

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset["number"]
        choice.innerText= currentQuestion["choice" + number]
    })

    availableQuestions.splice(questionsIndex, 1)
    acceptingAnswers = true

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers= false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset["number"]

        let classToApply = selectedAnswer === currentQuestion.answer ? "correct" : "incorrect  "

        if (classToApply === "correct") {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()