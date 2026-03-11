// Get all input elements
const inputs = {
    deepDream: document.getElementById('deepDream'),
    excelVBA: document.getElementById('excelVBA'),
    htmlScore: document.getElementById('htmlScore'),
    cssScore: document.getElementById('cssScore'),
    js1Score: document.getElementById('js1Score'),
    js2Score: document.getElementById('js2Score'),
    midterm: document.getElementById('midterm'),
    taScore: document.getElementById('taScore'),
    teacherScore: document.getElementById('teacherScore'),
    otherGroupsScore: document.getElementById('otherGroupsScore'),
    groupMembersScore: document.getElementById('groupMembersScore'),
    bonus: document.getElementById('bonus')
};

// Get display elements
const displays = {
    labHwSubtotal: document.getElementById('labHwSubtotal'),
    scoreA: document.getElementById('scoreA'),
    scoreB: document.getElementById('scoreB'),
    tempScore: document.getElementById('tempScore'),
    scoreC: document.getElementById('scoreC'),
    finalProjectScore: document.getElementById('finalProjectScore'),
    finalScore: document.getElementById('finalScore'),
    percentage: document.getElementById('percentage'),
    letterGrade: document.getElementById('letterGrade'),
    result: document.getElementById('result'),
    deepDreamPts: document.getElementById('deepDreamPts'),
    excelVBAPts: document.getElementById('excelVBAPts'),
    htmlScorePts: document.getElementById('htmlScorePts'),
    cssScorePts: document.getElementById('cssScorePts'),
    js1ScorePts: document.getElementById('js1ScorePts'),
    js2ScorePts: document.getElementById('js2ScorePts'),
    midtermPts: document.getElementById('midtermPts'),
    bonusPts: document.getElementById('bonusPts')
};

const calculateBtn = document.getElementById('calculateBtn');

// Add real-time calculation for Lab + Homework subtotal
Object.keys(inputs).forEach(key => {
    if (['deepDream', 'excelVBA', 'htmlScore', 'cssScore', 'js1Score', 'js2Score'].includes(key)) {
        inputs[key].addEventListener('input', updateLabHwSubtotal);
    }
    if (key === 'midterm') {
        inputs[key].addEventListener('input', updateMidtermDisplay);
    }
    if (key === 'bonus') {
        inputs[key].addEventListener('input', updateBonusDisplay);
    }
    if (['taScore', 'teacherScore', 'otherGroupsScore', 'groupMembersScore'].includes(key)) {
        inputs[key].addEventListener('input', updateFinalProjectCalculation);
    }
});

function updateLabHwSubtotal() {
    // Convert percentage to actual points
    const deepDreamPts = ((parseFloat(inputs.deepDream.value) || 0) / 100) * 5;
    const excelVBAPts = ((parseFloat(inputs.excelVBA.value) || 0) / 100) * 5;
    const htmlScorePts = ((parseFloat(inputs.htmlScore.value) || 0) / 100) * 7;
    const cssScorePts = ((parseFloat(inputs.cssScore.value) || 0) / 100) * 7;
    const js1ScorePts = ((parseFloat(inputs.js1Score.value) || 0) / 100) * 7;
    const js2ScorePts = ((parseFloat(inputs.js2Score.value) || 0) / 100) * 7;
    
    // Update individual displays
    displays.deepDreamPts.textContent = deepDreamPts.toFixed(2);
    displays.excelVBAPts.textContent = excelVBAPts.toFixed(2);
    displays.htmlScorePts.textContent = htmlScorePts.toFixed(2);
    displays.cssScorePts.textContent = cssScorePts.toFixed(2);
    displays.js1ScorePts.textContent = js1ScorePts.toFixed(2);
    displays.js2ScorePts.textContent = js2ScorePts.toFixed(2);
    
    const total = deepDreamPts + excelVBAPts + htmlScorePts + cssScorePts + js1ScorePts + js2ScorePts;
    displays.labHwSubtotal.textContent = total.toFixed(2);
}

function updateMidtermDisplay() {
    const midtermPts = ((parseFloat(inputs.midterm.value) || 0) / 100) * 30;
    displays.midtermPts.textContent = midtermPts.toFixed(2);
}

function updateBonusDisplay() {
    const bonusPts = ((parseFloat(inputs.bonus.value) || 0) / 100) * 5;
    displays.bonusPts.textContent = bonusPts.toFixed(2);
}

function updateFinalProjectCalculation() {
    const taScore = parseFloat(inputs.taScore.value) || 0;
    const teacherScore = parseFloat(inputs.teacherScore.value) || 0;
    const otherGroupsScore = parseFloat(inputs.otherGroupsScore.value) || 0;
    const groupMembersScore = parseFloat(inputs.groupMembersScore.value) || 0;
    
    // A: average (TA + Teacher)
    const scoreA = (taScore + teacherScore) / 2;
    displays.scoreA.textContent = scoreA.toFixed(2);
    
    // B: average (other groups)
    const scoreB = otherGroupsScore;
    displays.scoreB.textContent = scoreB.toFixed(2);
    
    // Temp_Final_Score = A*0.5 + B*0.5
    const tempScore = (scoreA * 0.5) + (scoreB * 0.5);
    displays.tempScore.textContent = tempScore.toFixed(2);
    
    // C: average (your group members)
    const scoreC = groupMembersScore / 10;
    displays.scoreC.textContent = scoreC.toFixed(2);
    
    // Final_Score = (Temp_Final_Score*0.7) + (C*Temp_Final_Score*0.3)
    const finalProjectScore = (tempScore * 0.7) + (scoreC * tempScore * 0.3);
    const finalProjectScoreOut35 = (finalProjectScore / 100) * 35;
    
    displays.finalProjectScore.textContent = finalProjectScoreOut35.toFixed(2);
}

function calculateFinalGrade() {
    // Lab + Homework (38%) - convert percentage to points
    const labHwScore = ((parseFloat(inputs.deepDream.value) || 0) / 100) * 5 +
                       ((parseFloat(inputs.excelVBA.value) || 0) / 100) * 5 +
                       ((parseFloat(inputs.htmlScore.value) || 0) / 100) * 7 +
                       ((parseFloat(inputs.cssScore.value) || 0) / 100) * 7 +
                       ((parseFloat(inputs.js1Score.value) || 0) / 100) * 7 +
                       ((parseFloat(inputs.js2Score.value) || 0) / 100) * 7;
    
    // Midterm (30%) - convert percentage to points
    const midtermScore = ((parseFloat(inputs.midterm.value) || 0) / 100) * 30;
    
    // Final Project (35%)
    const taScore = parseFloat(inputs.taScore.value) || 0;
    const teacherScore = parseFloat(inputs.teacherScore.value) || 0;
    const otherGroupsScore = parseFloat(inputs.otherGroupsScore.value) || 0;
    const groupMembersScore = parseFloat(inputs.groupMembersScore.value) || 0;
    
    const scoreA = (taScore + teacherScore) / 2;
    const scoreB = otherGroupsScore;
    const tempScore = (scoreA * 0.5) + (scoreB * 0.5);
    const scoreC = groupMembersScore / 10;
    const finalProjectScore = (tempScore * 0.7) + (scoreC * tempScore * 0.3);
    const finalProjectScoreOut35 = (finalProjectScore / 100) * 35;
    
    // Bonus (5%) - convert percentage to points
    const bonusScore = ((parseFloat(inputs.bonus.value) || 0) / 100) * 5;
    
    // Total Final Grade
    const finalGrade = labHwScore + midtermScore + finalProjectScoreOut35 + bonusScore;
    const percentage = (finalGrade / 108) * 100;
    
    // Display results
    displays.finalScore.textContent = finalGrade.toFixed(2);
    displays.percentage.textContent = percentage.toFixed(2);
    displays.letterGrade.textContent = getLetterGrade(percentage);
    
    // Show result section with animation
    displays.result.classList.add('show');
    
    // Scroll to result
    displays.result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function getLetterGrade(percentage) {
    if (percentage >= 90) return 'A+';
    if (percentage >= 85) return 'A';
    if (percentage >= 80) return 'A-';
    if (percentage >= 77) return 'B+';
    if (percentage >= 73) return 'B';
    if (percentage >= 70) return 'B-';
    if (percentage >= 67) return 'C+';
    if (percentage >= 63) return 'C';
    if (percentage >= 60) return 'C-';
    if (percentage >= 50) return 'D';
    return 'F';
}

// Event listeners
calculateBtn.addEventListener('click', calculateFinalGrade);

// Initialize
updateLabHwSubtotal();
updateMidtermDisplay();
updateBonusDisplay();
updateFinalProjectCalculation();
