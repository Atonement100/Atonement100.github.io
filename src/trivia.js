$(function() {
    console.log("Loading page...");

    const userInput = $("#user-chat");
    userInput.on("keydown", function (event) {
        if (event.keyCode === 13) {
            const inputValue = $(this).val();

            console.log("Player pressed enter. Value was: " + inputValue);
            processResponse(inputValue);

            $(this).val("");
        }
    });

    // Suppress submission of form. Let keydown function handle everything for the user input.
    $("#user-form").on("submit",function(e) {
        e.preventDefault();
        return false;
    })

    console.log("Finished loading!");
    onLoad();
});

const runners = {
    PT_RUNNER: new PeriodicTableRunner()
};

const onLoad = function () {
    renderCurrentRunnerName();
    generateNewPrompt();
}

let currentPrompt;
let activeRunner = runners.PT_RUNNER;

const renderCurrentRunnerName = function () {
    console.log(activeRunner.name);
    $("#game-name").text("The current game is " + activeRunner.name);
}

const renderCurrentPrompt = function () {
    $("#prompt-target").text("Prompt: " + currentPrompt);
}

const generateNewPrompt = function () {
    currentPrompt = activeRunner.generatePrompt(1);
    renderCurrentPrompt();
}

const negativeColor = "#e6b2c6";
const positiveColor = "#c2e8ce";
const prefixResultsTableWithObject = function(responseObject) {
    //{
    //             prompt: prompt,
    //             response: response,
    //             isResponseCorrect: ptdata[prompt] === response.toLowerCase(),
    //             correctAnswer: ptdata[prompt]
    //         }
    let backgroundColor = responseObject.isResponseCorrect ? positiveColor : negativeColor;

    let tr = $('<tr/>');
    tr.append("<td>" + responseObject.prompt + "</td>");
    tr.append("<td style='background-color:" + backgroundColor + "'>" + responseObject.response + "</td>");
    tr.append("<td>" + responseObject.correctAnswer + "</td>");
    $('#results-table').prepend(tr);
}

const processResponse = function(response) {
    console.log("Current Prompt: " + currentPrompt + " ; Response: " + response);

    let responseObject = activeRunner.resolveResponseAgainstPrompt(currentPrompt, response);

    console.log("Response was correct?: " + JSON.stringify(responseObject));

    prefixResultsTableWithObject(responseObject);
    generateNewPrompt();
}


