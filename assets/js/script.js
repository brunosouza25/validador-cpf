class Cpf {
    static cpfGenerator() {
        let newCpf;
        //while para verificar se o cpg gerado não é uma sequência
        while (isNaN(newCpf)) {
            let rawCpf = [];
            for (let i = 0; i <= 9; i++) {
                rawCpf.push(Math.floor(Math.random() * 10));
            }

            newCpf = this.verificationNumbers(rawCpf.join(''));
        }
        return newCpf;
    }

    static verificationNumbers(string) {
        let rawCpf = String(string).slice(0, 9).split('');
        const itsSequence = this.itsASequence(rawCpf.join(''));

        if (itsSequence) {
            writeResultCpf(false);
            return;
        }

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
    }

    //verificar se o cpf é uma sequencia de numeros ex: 11111111111, 22222222222...
    static itsASequence(string) {
        return String(string).charAt(0).repeat(string.length) == string;
    }
}

const result = document.getElementById('result');
const input = document.getElementById('cpf');

document.getElementById('generate').addEventListener('click', () => {
    input.value = '';
    input.value = Cpf.cpfGenerator();
});

document.getElementById('copy').addEventListener('click', () => {
    navigator.clipboard.writeText(input.value);
});

document.getElementById('validate').addEventListener('click', () => {
    writeResultCpf(
        Cpf.verificationNumbers(document.getElementById('cpf').value) ==
            document.getElementById('cpf').value
    );
});

document.getElementById('cpf').addEventListener('keypress', (event) => {
    if (event.key !== 'Enter') {
        return;
    }
    writeResultCpf(
        Cpf.verificationNumbers(document.getElementById('cpf').value)
    );
});

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
