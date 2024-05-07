let question;
let options;
let votes = {};

function startPoll() {
  // Get question and options from the input fields
  question = document.getElementById("question").value;
  options = document.getElementById("options").value.split(",");

  // Display the poll form
  document.getElementById("poll-question").innerText = question;
  document.getElementById("options-list").innerHTML = "";
  options.forEach((option) => {
    const optionElement = document.createElement("div");
    optionElement.className = "option";
    optionElement.innerHTML = `
            <div><input type="radio" name="vote-option" value="${option}"/></div>
            <div><label>${option}</label></div>
        `;
    document.getElementById("options-list").appendChild(optionElement);
  });

  // Hide the initial form and show the poll form
  document.getElementById("poll-form").style.display = "block";
  document.getElementById("results-container").style.display = "none";
}

function submitVote() {
  const selectedOption = document.querySelector(
    'input[name="vote-option"]:checked'
  );

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
    alert("Please select an option before submitting your vote.");
  }
}

function displayResults() {
  // Hide the poll form and show the results
  document.getElementById("poll-form").style.display = "none";
  document.getElementById("results-container").style.display = "block";

  // Create a stacked scale chart for results
  const resultsChart = document.getElementById("results-chart");
  resultsChart.innerHTML = "";

  const totalVotes = Object.values(votes).reduce(
    (total, count) => total + count,
    0
  );

  options.forEach((option) => {
    const percentage = ((votes[option] || 0) / totalVotes) * 100 || 0;

    const bar = document.createElement("div");
    bar.style.width = `${percentage}%`;
    bar.className = "result-bar";
    bar.innerHTML = `
            <span class="option-name">${option}</span>
            <span class="option-percentage">${percentage.toFixed(1)}%</span>
        `;

    resultsChart.appendChild(bar);
  });

  // Add a button to download results
  const downloadButton = document.createElement("button");
  downloadButton.innerText = "Download Results";
  downloadButton.onclick = downloadResults;
  downloadButton.style = "margin-top: 10px"
  resultsChart.appendChild(downloadButton);
}

function downloadResults() {
  // Generate CSV content
  const csvContent = generateCSV();

  // Create a Blob (Binary Large Object) with the CSV content
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

  // Create a download link
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = "poll_results.csv";

  // Append the link to the document and simulate a click
  document.body.appendChild(downloadLink);
  downloadLink.click();

  // Remove the link from the document
  document.body.removeChild(downloadLink);
}

function generateCSV() {
  // Create CSV header
  let csvContent = "Question,Options,Votes\n";

  // Add poll details
  csvContent += `"${question}","${options.join(",")}"\n`;

  // Add vote counts
  options.forEach((option) => {
    const voteCount = votes[option] || 0;
    csvContent += `,"${option}",${voteCount}\n`;
  });

  return csvContent;
}
