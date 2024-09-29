window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.calculator__tab'),
          tabsContent = document.querySelectorAll('.calculator__block'),
          tabsParent = document.querySelector('.calculator__tabs');
          currencyInput = document.querySelectorAll('.calculator__content-input');

    const hideTabContent = () => {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(item => {
            item.classList.remove('calculator__tab_active');
        });
    }

    const showTabContent = (i = 0) => {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show');
        tabs[i].classList.add('calculator__tab_active');
        currencyInput[i].children[0].focus();
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('calculator__tab')) {;
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    }); 

    const calcTotal = (sum, currency) => {
        const RATIO = 1.12; // курс евро к доллару
        return currency === 'euro' ? sum * RATIO : sum / RATIO;
    };

    const handleInput = (inputId, outputId, currency) => {
        const inputElement = document.getElementById(inputId);  // исходное поле (ввод)
        const outputElement = document.getElementById(outputId); // поле для результата (вывод)
    
        // Обработчик события для ввода значений
        inputElement.addEventListener('input', () => {
            // Текущее значение поля ввода
            let inputValue = inputElement.value;
    
            // Проверяем каждый символ и удаляем некорректные
            if (!/^[0-9]*\.?[0-9]*$/.test(inputValue)) {
                // Удаляем последний некорректный символ
                inputElement.value = inputValue.slice(0, -1);
                inputElement.classList.remove('valid');
                inputElement.classList.add('invalid');
                return; // Останавливаем дальнейшую обработку
            }
    
            // Проверяем, что значение не пустое
            if (inputValue !== "") {
                inputElement.classList.remove('invalid');
                inputElement.classList.add('valid');
    
                // Преобразуем строку в число для расчета
                const parsedValue = parseFloat(inputValue);
    
                // Вызываем calcTotal для расчета результата
                const result = calcTotal(parsedValue, currency);
    
                // Записываем результат в поле вывода
                outputElement.value = result.toFixed(2); // округляем до двух знаков
            } else {
                // Очищаем поле результата, если ввод пустой
                outputElement.value = '';
                inputElement.classList.remove('invalid');
                inputElement.classList.add('valid');
            }
        });
    };    
   
   handleInput('euro', 'usdResult', 'euro');
   handleInput('dollar', 'euroResult', 'dollar');
});