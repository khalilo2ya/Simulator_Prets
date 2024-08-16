function calculateLoan() {
    // الحصول على القيم من النموذج
    const principal = parseFloat(document.getElementById('principal').value);
    const annualRate = parseFloat(document.getElementById('annualRate').value) / 100;
    const years = parseInt(document.getElementById('years').value);

    // حساب القسط الشهري
    const monthlyRate = annualRate / 12;
    const numberOfPayments = years * 12;
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // حساب إجمالي الفائدة
    const totalRepayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalRepayment - principal;

    // إعداد جدول السدادات
    let balance = principal;
    let scheduleBody = '';
    for (let i = 1; i <= numberOfPayments; i++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        balance -= principalPayment;

        scheduleBody += `
            <tr>
                <td>${i}</td>
                <td>${monthlyPayment.toFixed(2)} د.ت</td>
                <td>${principalPayment.toFixed(2)} د.ت</td>
                <td>${interestPayment.toFixed(2)} د.ت</td>
                <td>${Math.max(balance, 0).toFixed(2)} د.ت</td>
            </tr>
        `;
    }
    
    // عرض المعلومات الإجمالية
    document.getElementById('loanAmount').textContent = principal.toFixed(2);
    document.getElementById('monthlyPayment').textContent = monthlyPayment.toFixed(2);
    document.getElementById('totalInterest').textContent = totalInterest.toFixed(2);
    document.getElementById('totalRepayment').textContent = totalRepayment.toFixed(2);

    // إدراج جدول السدادات
    document.getElementById('scheduleBody').innerHTML = scheduleBody;
}
