const cpf = new Cpf();
const result = document.getElementById('result');
const input = document.getElementById('cpf');

document.getElementById('generate').addEventListener('click', () => {
    input.value = '';
    input.value = cpf.cpfGenerator();
});

//TODO
//FAZER A COPIA DO CPF
document.getElementById('copy').addEventListener('click', () => {
    input.select();
    document.execCommand('copy');
});

document.getElementById('validate').addEventListener('click', () => {
    const result = cpf.verificationNumbers(
        document.getElementById('cpf').value
    );
    writeResultCpf(
        cpf.verificationNumbers(document.getElementById('cpf').value) ==
            document.getElementById('cpf').value
    );
});

document.getElementById('cpf').addEventListener('keypress', (event) => {
    if (event.key !== 'Enter') {
        return;
    }
    writeResultCpf(
        cpf.verificationNumbers(document.getElementById('cpf').value)
    );
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
        set: function (string) {
            const cpfValidate = this.verificationNumbers(string);

            if (cpfValidate != string) {
                console.log(cpfValidate);

                return false;
            }
            console.log(cpfValidate);
        },
    });
}

Cpf.prototype.verificationNumbers = function (string) {
    let rawCpf = String(string).slice(0, 9).split('');
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

Cpf.prototype.cpfGenerator = function () {
    let rawCpf = [];

    for (let i = 0; i <= 9; i++) {
        rawCpf.push(Math.floor(Math.random() * 10));
    }

    const newCpf = this.verificationNumbers(rawCpf.join(''));

    return newCpf;
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
