function calculateLoan() {
    // Obtaining values from the form
    const principalInput = document.getElementById('principal');
    const annualRateInput = document.getElementById('annualRate');
    const yearsInput = document.getElementById('years');
    const monthsInput = document.getElementById('months');
    const alertContainer = document.getElementById('alertContainer'); // Container for the alert

    const principal = parseFloat(principalInput.value);
    const annualRate = parseFloat(annualRateInput.value) / 100;
    const years = parseInt(yearsInput.value);
    const months = parseInt(monthsInput.value);

    let isValid = true;

    // Remove any existing alert
    alertContainer.innerHTML = '';

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

    if (isNaN(years) || years < 0 || years === 0) {
        yearsInput.classList.add('is-invalid');
        isValid = false;
    } else {
        yearsInput.classList.remove('is-invalid');
        yearsInput.classList.add('is-valid');
    }

    if (isNaN(months) || months < 0 || (months === 0 && years === 0)) {
        monthsInput.classList.add('is-invalid');
        isValid = false;
    } else {
        monthsInput.classList.remove('is-invalid');
        monthsInput.classList.add('is-valid');
    }

    // If either years or months is 0, show an alert message
    if (years === 0 && months === 0) {
        alertContainer.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>تنبيه!</strong> يجب إدخال مدة زمنية للقرض (سنوات أو أشهر).
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        return;
    }

    if (!isValid) {
        // Do not show results if any input is invalid
        document.getElementById('loanDetails').classList.add('hidden');
        document.getElementById('loanTableContainer').classList.add('hidden');
        return;
    }

    // Calculate total months
    const totalMonths = (years * 12) + months;

    // Calculate monthly payment
    const monthlyRate = annualRate / 12;
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);

    // Calculate total interest
    const totalRepayment = monthlyPayment * totalMonths;
    const totalInterest = totalRepayment - principal;

    // Prepare amortization schedule
    let balance = principal;
    let scheduleBody = '';
    for (let i = 1; i <= totalMonths; i++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        balance -= principalPayment;

        scheduleBody += `
            <tr>
                <td>${i}</td>
                <td>${monthlyPayment.toFixed(3)} د.ت</td>
                <td>${principalPayment.toFixed(3)} د.ت</td>
                <td>${interestPayment.toFixed(3)} د.ت</td>
                <td>${Math.max(balance, 0).toFixed(3)} د.ت</td>
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
