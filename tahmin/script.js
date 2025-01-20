let secretCode;
let attemptsLeft = 10;
let guesses = [];

function generateCode() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

function evaluateGuess(guess) {
    let feedback = '';

    for (let i = 0; i < 4; i++) {
        if (guess[i] === secretCode[i]) {
            feedback += 'X'; // Doğru sayı doğru yerde
        } else if (secretCode.includes(guess[i])) {
            feedback += 'O'; // Doğru sayı yanlış yerde
        } else {
            feedback += '-'; // Yanlış sayı
        }
    }

    return feedback;
}

function guess() {
    const guessInput = document.getElementById('guess');
    const guessValue = guessInput.value;

    if (guessValue.length !== 4 || isNaN(guessValue)) {
        alert("Geçersiz giriş! Lütfen 4 haneli bir sayı girin.");
        return;
    }

    const feedback = evaluateGuess(guessValue);
    guesses.push({ guess: guessValue, feedback: feedback });

    renderGuesses();

    attemptsLeft--;
    document.getElementById('attempts').textContent = attemptsLeft;

    if (feedback === 'XXXX') {
        alert("Tebrikler! Doğru şifreyi buldunuz: " + secretCode);
        location.reload(); // Oyunu yeniden başlat
    } else if (attemptsLeft === 0) {
        alert("Maalesef, tahmin hakkınız kalmadı. Doğru şifre: " + secretCode);
        location.reload(); // Oyunu yeniden başlat
    }

    guessInput.value = '';
}

function renderGuesses() {
    const guessesDiv = document.getElementById('guesses');
    guessesDiv.innerHTML = '';

    guesses.forEach(guess => {
        const guessBox = document.createElement('div');
        guessBox.classList.add('guess-box');
        
        for (let i = 0; i < 4; i++) {
            const digitBox = document.createElement('span');
            digitBox.textContent = guess.guess[i];
            
            if (guess.feedback[i] === 'X') {
                digitBox.style.backgroundColor = 'green';
            } else if (guess.feedback[i] === 'O') {
                digitBox.style.backgroundColor = 'yellow';
            } else {
                digitBox.style.backgroundColor = 'red';
            }

            guessBox.appendChild(digitBox);
        }

        guessesDiv.appendChild(guessBox);
    });
}

window.onload = function() {
    secretCode = generateCode();
}
