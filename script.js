const calculatorForm = document.getElementById('calculator-form');
const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const operator = document.getElementById('operator');
const result = document.getElementById('result');

calculatorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const num1Value = parseFloat(num1.value);
    const num2Value = parseFloat(num2.value);
    const selectedOperator = operator.value;

    fetch('/webbackend/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ num1: num1Value, num2: num2Value, operator: selectedOperator })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            result.textContent = `Error: ${data.error}`;
        } else {
            result.textContent = `Result: ${data.result}`;
        }
    });
});
