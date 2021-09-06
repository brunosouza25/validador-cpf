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
        set: function (string) {
            const cpfValidate = validateCpf(string);
            if (!cpfValidate) {
                return false;
            }

            cpf = cpfValidate;
        },
    });

    /**
     * Função responsável por validar CPF
     * @param {string} string cpf a ser válidado
     * @returns {*} retorna false se o cpf não for válido ou o própio se for válido
     */
    this.validateCpf = function (string) {
        const rawCpf = string.replace(/[-.]/g, '');

        if (isNaN(rawCpf) || rawCpf.length !== 11) {
            return false;
        }

        let equals = false;
        //Validar se o cpf é inválido do tipo sequencial, ex: 11111111111, 55555555555, 99999999999
        for (let i = 0; i < rawCpf.length - 1; i++) {
            if (rawCpf[i] == rawCpf[i + 1]) {
                equals = true;
            } else {
                equals = false;
                break;
            }
        }
        if (equals) {
            writeResultCpf(!equals);
            return;
        }

        let sum = 0;

        for (let i = 10; i >= 2; i--) {
            sum += rawCpf[10 - i] * i;
        }

        const verifyOne = (sum * 10) % 11 === 10 ? 0 : (sum * 10) % 11;

        const secondRawCpf = String(rawCpf.slice(0, 9)) + String(verifyOne);

        sum = 0;

        for (let i = 11; i >= 2; i--) {
            sum += secondRawCpf[11 - i] * i;
        }

        const verifyTwo = (sum * 10) % 11 === 10 ? 0 : (sum * 10) % 11;

        const newCpf = String(secondRawCpf) + String(verifyTwo);
        if (rawCpf !== newCpf) {
            return false;
        }

        return newCpf;
    };
}

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
