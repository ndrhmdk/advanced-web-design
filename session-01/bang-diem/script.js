function process() {
    const sem1 = parseFloat(document.getElementById('semester1').value);
    const sem2 = parseFloat(document.getElementById('semester2').value);
    const year = parseInt(document.getElementById('year').value);

    const resultInput = document.getElementById('summarize');
    const status = document.querySelector('.result-status');

    if (isNaN(sem1) || isNaN(sem2)) {
        status.textContent = 'Please enter valid scores for both semesters.';
        status.style.color = 'red';
        resultInput.value = '';
        return;
    }

    let summarize;

    if (year === 1) {
        summarize = (sem1 + sem2) / 2;
    } else {
        summarize = (sem1 + sem2 * 2) / 3;
    }
    
    summarize = Math.round(summarize * 100) / 100;
    resultInput.value = summarize.toFixed(2);

    if (summarize >= 9) {
        status.textContent = 'Giỏi';
        status.style.color = 'red';
    } 
    else if (summarize >= 8) {
        status.textContent = 'Khá';
        status.style.color = 'blue';
    } 
    else if (summarize >= 7) {
        status.textContent = 'Trung bình';
        status.style.color = 'orange';
    } 
    else if (summarize >= 5) {
        status.textContent = 'Yếu';
        status.style.color = 'goldenrod';
    } 
    else {
        status.textContent = 'Kém';
        status.style.color = 'purple';
    }
}


function cancel() {
    document.getElementById('semester1').value = '';
    document.getElementById('semester2').value = '';
    document.getElementById('year').value = '1';
    document.getElementById('summarize').value = '';

    const status = document.querySelector('.result-status');

    status.textContent = '';
    status.style.color = '';
}