function unlockPrices() {
    // Password defined in the request
    const CORRECT_PASSWORD = 'deje6hbc';

    // Prompt user
    const password = prompt("パスワードを入力してください (Enter Password):");

    if (password === CORRECT_PASSWORD) {
        // Unlock logic
        const hiddenPrices = document.querySelectorAll('.hidden-price');
        const lockButtons = document.querySelectorAll('.price-lock-btn');

        // Show prices
        hiddenPrices.forEach(el => {
            el.classList.remove('hidden');
        });

        // Hide buttons
        lockButtons.forEach(btn => {
            btn.style.display = 'none';
        });

        // Persist state
        sessionStorage.setItem('priceUnlocked', 'true');
    } else {
        // Incorrect password
        alert("パスワードが違います (Incorrect Password)");
    }
}

// Check state on load
document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('priceUnlocked') === 'true') {
        const hiddenPrices = document.querySelectorAll('.hidden-price');
        const lockButtons = document.querySelectorAll('.price-lock-btn');

        hiddenPrices.forEach(el => {
            el.classList.remove('hidden');
        });

        lockButtons.forEach(btn => {
            btn.style.display = 'none';
        });
    }
});
