function calculateLoan() {
    // Obtaining values from the form
    const principalInput = document.getElementById('principal');
    const annualRateInput = document.getElementById('annualRate');
    const yearsInput = document.getElementById('years');

    const principal = parseFloat(principalInput.value);
    const annualRate = parseFloat(annualRateInput.value) / 100;
    const years = parseInt(yearsInput.value);

    let isValid = true;

    // Validate inputs
    if (isNaN(principal) || principal <= 0) {
        principalInput.classList.add('is-invalid');
        isValid = false;
    } else {
        principalInput.classList.remove('is-invalid');
        principalInput.classList.add('is-valid');
    }

    if (isNaN(annualRate) || annualRate < 0) {
        annualRateInput.classList.add('is-invalid');
        isValid = false;
    } else {
        annualRateInput.classList.remove('is-invalid');
        annualRateInput.classList.add('is-valid');
    }

    if (isNaN(years) || years <= 0) {
        yearsInput.classList.add('is-invalid');
        isValid = false;
    } else {
        yearsInput.classList.remove('is-invalid');
        yearsInput.classList.add('is-valid');
    }

    if (!isValid) {
        // Do not show results if any input is invalid
        document.getElementById('loanDetails').classList.add('hidden');
        document.getElementById('loanTableContainer').classList.add('hidden');
        return;
    }

    // Calculate monthly payment
    const monthlyRate = annualRate / 12;
    const numberOfPayments = years * 12;
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Calculate total interest
    const totalRepayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalRepayment - principal;

    // Prepare amortization schedule
    let balance = principal;
    let scheduleBody = '';
    for (let i = 1; i <= numberOfPayments; i++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        balance -= principalPayment;

        scheduleBody += `
            <tr>
                <td>${i}</td>
                <td>${monthlyPayment.toFixed(3)} </td>
                <td>${principalPayment.toFixed(3)} </td>
                <td>${interestPayment.toFixed(3)} </td>
                <td>${Math.max(balance, 0).toFixed(3)} </td>
            </tr>
        `;
    }
    
    // Display results
    document.getElementById('loanAmount').textContent = principal.toFixed(3);
    document.getElementById('monthlyPayment').textContent = monthlyPayment.toFixed(3);
    document.getElementById('totalInterest').textContent = totalInterest.toFixed(3);
    document.getElementById('totalRepayment').textContent = totalRepayment.toFixed(3);

    // Insert schedule table
    document.getElementById('scheduleBody').innerHTML = scheduleBody;

    // Show results
    document.getElementById('loanDetails').classList.remove('hidden');
    document.getElementById('loanTableContainer').classList.remove('hidden');
}

function clearForm() {
    // Reset form values
    document.getElementById('loanForm').reset();

    // Hide results
    document.getElementById('loanDetails').classList.add('hidden');
    document.getElementById('loanTableContainer').classList.add('hidden');

    // Remove validation classes
    document.querySelectorAll('#loanForm input').forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
    });
}
