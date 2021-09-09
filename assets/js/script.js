const cpf = new Cpf();
const result = document.getElementById('result');

document.getElementById('validate').addEventListener('click', () => {
    writeResultCpf(cpf.validateCpf(document.getElementById('cpf').value));
});

document.getElementById('cpf').addEventListener('keypress', (event) => {
    if (event.key !== 'Enter') {
        return;
    }
    writeResultCpf(cpf.validateCpf(document.getElementById('cpf').value));
});

//Objeto CPF
function Cpf() {
    let cpf;

    Object.defineProperty(this, 'cpf', {
        enumerable: true,
        configurable: true,
        get: function () {
            return cpf;
        },
    });
}

//TODO
//Necessita verificar o porque a Setter do CPF não consegue chamar a função "verificationNumbers" do prototype
Cpf.prototype.verificationNumbers = function (string) {
    let rawCpf = String(string).split('');
    let count = 10;
    let total = rawCpf.reduce((sum, item) => {
        sum += count * item;
        count--;
        return sum;
    }, 0);

    let digit = 11 - (total % 11) > 9 ? 0 : 11 - (total % 11);

    rawCpf.push(digit);

    count = 11;

    total = rawCpf.reduce((sum, item) => {
        sum += item * count;
        count--;
        return sum;
    }, 0);

    digit = 11 - (total % 11) > 9 ? 0 : 11 - (total % 11);
    rawCpf.push(digit);
    return rawCpf.join('');
};

//70548445052
//07098772003

//Função responsável por exibir na tela o resultado da validação
function writeResultCpf(cpfValidate) {
    const result = document.getElementById('result');
    result.innerText = '';

    const h3 = document.createElement('h3');

    if (cpfValidate) {
        h3.classList.add('valid');
        h3.innerText = 'CPF válido';
    } else {
        h3.classList.add('invalid');
        h3.innerText = 'CPF inválido';
    }

    result.appendChild(h3);
}
