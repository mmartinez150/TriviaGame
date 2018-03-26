$(document).ready(function() {
    // start button

    function openingPage() {
        openScreen = "<p class='text-center main-button-container'><a class='btn btn-warning btn-md btn-block start-button' href='#' role=''>Start</a></p>";
        $("#mainArea").append(openScreen);
    }

    openingPage();

    //start of game

    $("#mainArea").on("click", ".start-button", function(event){
        event.preventDefault();
        clickSound.play();
        $('.jumbotron').hide();
        // wait();
         generateQuestions();

        timerWrapper();

    }); //closes start button

    $("body").on("click", ".answer", function(event){
            
        clickSound.play();
        selectedAnswer = $(this).text();
        //if/else replacement
        selectedAnswer === correctAnswers[questionCounter] ? (
            //alert("correct");
            clearInterval(theClock),
            generateWin()) :
            //else
            (//alert("wrong answer!");
            clearInterval(theClock),
            generateLoss()
        )
    }); //answer click close

    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        resetGame();
    }); // Closes reset-button click


    function timeoutLoss() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" 
        + counter 
        + "</span></p>" 
        + "<p class='text-center'>You ran out of time!  The correct answer was: " 
        + correctAnswers[questionCounter] 
        + "</p>" 
        + "<img class='center-block img-wrong' src='assets/images/nogiphy.gif'>";
            $("#mainArea").html(gameHTML);

        setTimeout(wait, 2500);
    }  //end 
    

    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" 
        + counter 
        + "</span></p>" 
        + "<p class='text-center'>Correct! The answer is: " 
        + correctAnswers[questionCounter] 
        + "</p>" 
        + imageArray[questionCounter];
        $("#mainArea").html(gameHTML);
        
        setTimeout(wait, 2500);  //end generatewin
    }

    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" 
        + counter 
        + "</span></p>" 
        + "<p class='text-center'>Wrong! The correct answer is: "
        + correctAnswers[questionCounter] 
        + "</p>" 
        + "<img class='center-block img-wrong' src='assets/images/nogiphy.gif'>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 2500); 
    }


    function generateQuestions() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>25</span></p><p class='text-center'>" 
        + questionArray[questionCounter] 
        + "</p><p class='first-answer answer'>A. " 
        + answerArray[questionCounter][0] 
        + "</p><p class='answer'>B. "
        +answerArray[questionCounter][1]
        +"</p><p class='answer'>C. "
        +answerArray[questionCounter][2]
        +"</p><p class='answer'>D. "
        +answerArray[questionCounter][3]
        +"</p>";
        $("#mainArea").html(gameHTML);
    }; //end generate question

    function wait() {
    // question generator
        console.log('wait');
        questionCounter < 7 ?
            (questionCounter++,
                generateQuestions(),
                counter = 25,
                timerWrapper () ):

                (finalScreen())
    };
    
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                timeoutLoss();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }

    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" 
        + counter 
        + "</span></p>" 
        + "<p class='text-center'>All done, here's how you did!" 
        + "</p>" 
        + "<p class='summary-correct'>Correct Answers: " 
        + correctTally + "</p>" 
        + "<p>Wrong Answers: " 
        + incorrectTally 
        + "</p>" 
        + "<p>Unanswered: " 
        + unansweredTally + "</p>" 
        + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $("#mainArea").html(gameHTML);
    }

    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 25;
        generateQuestions();
        timerWrapper();
    }

    var openScreen;
    var gameHTML;
    var counter; 25;
    var questionArray =
    [ "In the 80s if you turned on your television and saw the characters Tootie, Blair and Natalie, what show would you be watching?" ,
    "What 80s fashion trend was inspired by the movie Flashdance?",
    "What men's hairstyle was trendy in the 80s?",
    "Care Bears were all the rage during the 80s. Which Care Bear was green?",
    "In the 80s, Nintendo released their NES or Nintendo Entertainment System. What game came with the system?",
    "What was the highest grossing movie of the 1980s?",
    "Which of these characters was not one of the Cosby children?",
    "During the 1980s if you wanted to be fashionable, which of these things would you own?" ];

    var answerArray = [
    ["Saved by the Bell", "Lavern and Shirley", "The Facts of Life" , "Family Matters"],
    ["Bell Bottoms", "Crocs", "Legwarmers" , "Ear Muffs"],
    ["The Mullet", "The Crop", "Mop Top" , "The flip"],
    ["Best Friend Bear", "Good Luck Bear", "Funshine Bear" , "Birthday Bear"],
    ["Breakout", "Super Mario Bros", "Frogger" , "Tetris"],
    ["Kramer vs. Kramer", "E.T.", "Jaws" , "Rocky"],
    ["Marsha", "Denise", "Vanessa" , "Theo"],
    ["Moccasins", "Jelly shoes", "Saddle shoes" , "T-Bars"], ];

    var imageArray = new Array();
    imageArray[0] = "<img class='center-block' src='assets/images/factsoflife.jpg'>";
    imageArray[1] = "<img class='center-block' src='assets/images/legwarmers.jpg'>"; 
    imageArray[2] = "<img class='center-block' src='assets/images/mullet.jpeg'>"; 
    imageArray[3] = "<img class='center-block' src='assets/images/goodluckbear.gif'>";  
    imageArray[4] = "<img class='center-block' src='assets/images/supermariobros.png'>"; 
    imageArray[5] = "<img class='center-block' src='assets/images/et.jpeg'>"; 
    imageArray[6] = "<img class='center-block' src='assets/images/marsha.webp'>"; 
    imageArray[7] = "<img class='center-block' src='assets/images/jellyshoes.jpg'>"; 

    var correctAnswers = [
        "C. The Facts of Life", 
        "C. Legwarmers", 
        "A. The Mullet", 
        "B. Good Luck Bear", 
        "B. Super Mario Bros", 
        "B. E.T.", 
        "A. Marsha", 
        "B. Jelly shoes"
    ];

    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;
    var clickSound = new Audio("assets/sounds/click-sound.mp3");

});  //  Closes jQuery wrapper



