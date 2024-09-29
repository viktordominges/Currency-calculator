window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.calculator__tab'),
          tabsContent = document.querySelectorAll('.calculator__block'),
          tabsParent = document.querySelector('.calculator__tabs');

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

    // Универсальная функция для обработки ввода данных
    const handleInput = (inputId, outputId, currency) => {
        const inputElement = document.getElementById(inputId);  // исходное поле (ввод)
        const outputElement = document.getElementById(outputId); // поле для результата (вывод)
        
        // Получаем значение из исходного поля
        const inputValue = parseFloat(inputElement.value);
        
        // Проверяем, является ли ввод корректным числом
        if (!isNaN(inputValue)) {
            // Вызываем calcTotal для расчета результата
            const result = calcTotal(inputValue, currency);
            
            // Записываем результат в поле вывода
            outputElement.value = result.toFixed(2); // округляем до двух знаков
        } else {
            outputElement.value = ''; // очищаем поле, если ввод некорректен
        }
    };

    // Добавляем обработчики событий на оба инпута
    document.getElementById('euro').addEventListener('input', () => handleInput('euro', 'usdResult', 'euro'));
    document.getElementById('dollar').addEventListener('input', () => handleInput('dollar', 'euroResult', 'dollar'));
});