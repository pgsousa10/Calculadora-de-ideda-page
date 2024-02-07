window.onload = function () {
    const dia = document.getElementById('dia');
    const mes = document.getElementById('mes');
    const ano = document.getElementById('ano');
    const labels = document.getElementsByTagName('label');
    const error = document.querySelectorAll('.error');
    const button = document.getElementById('submit');
    const spans = document.getElementsByTagName('span');

    const data = new Date();
    let atualDia = data.getDate();
    let atualMes = data.getMonth() + 1;
    let atualAno = data.getFullYear();

    const typeError = [
        "",
        "Este campo é obrigatório",
        "Deve ser um mês válido",
        "Deve ser um ano válido",
        "Deve ser um dia válido",
        "Deve ser uma data válida",
    ];

    const stateError = (numberOfError, typeOfDate, typeOfError, color) => {
        error[numberOfError].innerHTML = typeOfError;
        labels[numberOfError].style.color = color;
        typeOfDate.style.borderColor = color;
    };

    const isLeapYear = (dia, mes, ano) => {
        mes = mes - 1;
        const fullDate = new Date(ano, mes, dia);

        if (dia == fullDate.getDate() && mes == fullDate.getMonth() && ano == fullDate.getFullYear()) {
            return true;
        } else {
            return false;
        }
    };

    const substractAge = () => {
        let novoAno = Math.abs(atualAno - parseInt(ano.value));
        let novoMes = 0;

        if (atualMes >= parseInt(mes.value)) {
            novoMes = atualMes - parseInt(mes.value);
        } else {
            novoAno--;
            novoMes = 12 + atualMes - parseInt(mes.value);
        }

        let novoDia = 0;

        if (isLeapYear(parseInt(dia.value), parseInt(mes.value), parseInt(ano.value))) {
            novoDia = 30 + atualDia - parseInt(dia.value);
        } else {
            novoDia = atualDia - parseInt(dia.value);
        }

        if (novoMes < 0) {
            novoMes = 11;
            novoAno--;
        }

        if (novoMes < atualMes) {
            novoDia++;
        }

        spans[0].innerHTML = novoAno;
        spans[1].innerHTML = novoMes;
        spans[2].innerHTML = novoDia;
    };

    const isDayCorrect = () => {
        if (dia.value == "") {
            stateError(0, dia, typeError[1], '#ff5757');
            return false;
        } else if (dia.value <= 0 || dia.value > 31) {
            stateError(0, dia, typeError[4], '#ff5757');
            return false;
        } else if (!isLeapYear(parseInt(dia.value), parseInt(mes.value), parseInt(ano.value))) {
            stateError(0, dia, typeError[5], '#ff5757');
            return false;
        } else {
            stateError(0, dia, typeError[0], '');
            return true;
        }
    };

    const isMonthCorrect = () => {
        if (mes.value == "") {
            stateError(1, mes, typeError[1], '#ff5757');
            return false;
        } else if (mes.value <= 0 || mes.value > 12) {
            stateError(1, mes, typeError[2], '#ff5757');
            return false;
        } else if (!isLeapYear(parseInt(dia.value), parseInt(mes.value), parseInt(ano.value))) {
            stateError(1, mes, typeError[5], '#ff5757');
            return false;
        } else {
            stateError(1, mes, typeError[0], '');
            return true;
        }
    };

    const isYearCorrect = () => {
        if (ano.value == "") {
            stateError(2, ano, typeError[1], '#ff5757');
            return false;
        } else if (parseInt(ano.value) > atualAno) {
            stateError(2, ano, typeError[3], '#ff5757');
            return false;
        } else if (!isLeapYear(parseInt(dia.value), parseInt(mes.value), parseInt(ano.value))) {
            stateError(2, ano, typeError[5], '#ff5757');
            return false;
        } else if (parseInt(ano.value) == atualAno && parseInt(mes.value) > atualMes) {
            stateError(1, mes, typeError[3], '#ff5757');
            return true;
        } else if (parseInt(ano.value) == atualAno && parseInt(mes.value) == atualMes && parseInt(dia.value) > atualDia) {
            stateError(0, dia, typeError[3], '#ff5757');
            return true;
        } else {
            stateError(2, ano, typeError[0], '');
            return true;
        }
    };

    button.addEventListener('click', () => {
        isDayCorrect();
        isMonthCorrect();
        isYearCorrect();

        if (isDayCorrect() && isMonthCorrect() && isYearCorrect()) {
            substractAge();
        }
    });
};
