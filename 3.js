let question;
let options;
let votes = {};

function startPoll() {
    // Get question and options from the input fields
    question = document.getElementById('question').value;
    options = document.getElementById('options').value.split(',');

    // Display the poll form
    document.getElementById('poll-question').innerText = question;
    document.getElementById('options-list').innerHTML = '';
    options.forEach((option) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.innerHTML = `
            <input type="radio" name="vote-option" value="${option}">
            <label>${option}</label>
        `;
        document.getElementById('options-list').appendChild(optionElement);
    });

    // Hide the initial form and show the poll form
    document.getElementById('poll-form').style.display = 'block';
    document.getElementById('results-container').style.display = 'none';
}

function submitVote() {
    const selectedOption = document.querySelector('input[name="vote-option"]:checked');

    if (selectedOption) {
        const selectedOptionValue = selectedOption.value;

        // Record the vote
        if (votes[selectedOptionValue]) {
            votes[selectedOptionValue]++;
        } else {
            votes[selectedOptionValue] = 1;
        }

        // Display results
        displayResults();
    } else {
        alert('Please select an option before submitting your vote.');
    }
}

function displayResults() {
    // Hide the poll form and show the results
    document.getElementById('poll-form').style.display = 'none';
    document.getElementById('results-container').style.display = 'block';

    // Create a stacked scale chart for results
    const resultsChart = document.getElementById('results-chart');
    resultsChart.innerHTML = '';

    const totalVotes = Object.values(votes).reduce((total, count) => total + count, 0);

    options.forEach((option) => {
        const percentage = ((votes[option] || 0) / totalVotes) * 100 || 0;

        const bar = document.createElement('div');
        bar.style.width = `${percentage}%`;
        bar.className = 'result-bar';
        bar.innerHTML = `
            <span class="option-name">${option}</span>
            <span class="option-percentage">${percentage.toFixed(1)}%</span>
        `;

        resultsChart.appendChild(bar);
    });
}
