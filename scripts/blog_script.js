document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });

    // Модальное окно
    const modal = document.getElementById("modal");
    const openModalButton = document.getElementById("openModalButton");
    const closeModalButton = document.querySelector(".close");
    const addCardForm = document.getElementById("addCardForm");
    const blogContainer = document.getElementById("blogContainer");

    // Открытие модального окна
    openModalButton.addEventListener("click", function () {
        modal.style.display = "block";
    });

    // Закрытие модального окна
    closeModalButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Обработка формы добавления карточки
    addCardForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Получаем данные из формы
        const imageFile = document.getElementById("imageInput").files[0];
        const caption = document.getElementById("captionInput").value;
        const date = document.getElementById("dateInput").value;

        //Форматирование даты
        let regexp = new RegExp("(\\d{4})-(\\d{2})-(\\d{2})");
        let parse = regexp.exec(date);
        let months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
        const formattedDate = parse[3] + " " + months[Number(parse[2]) - 1] + ", " + parse[1];

        // Создаем новый элемент карточки
        const newCard = document.createElement("div");
        newCard.classList.add("blog_block");

        // Добавляем изображение
        const image = document.createElement("img");
        image.src = URL.createObjectURL(imageFile);
        image.alt = "blog_photo";
        newCard.appendChild(image);

        // Добавляем дату
        const dateElement = document.createElement("p");
        dateElement.innerHTML = `<i>${formattedDate}</i>`;
        newCard.appendChild(dateElement);

        // Добавляем подпись
        const captionElement = document.createElement("p");
        captionElement.textContent = caption;
        newCard.appendChild(captionElement);

        // Добавляем горизонтальную линию
        const line = document.createElement("img");
        line.src = "../assets/svg/horizontal_line.svg";
        line.alt = "horizontal_line";
        newCard.appendChild(line);

        // Добавляем карточку в блог
        blogContainer.appendChild(newCard);

        // Закрываем модальное окно
        modal.style.display = "none";

        // Очищаем форму
        addCardForm.reset();

        updatePagination();
    });

    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    const pageInfo = document.getElementById("pageInfo");

    let currentPage = 1;
    const cardsPerPage = 2;

    // Функция для отображения карточек на текущей странице
    function showCards(page) {
        const cards = blogContainer.querySelectorAll(".blog_block");
        cards.forEach((card, index) => {
            if (index >= (page - 1) * cardsPerPage && index < page * cardsPerPage) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Функция для обновления информации о странице
    function updatePagination() {
        const cards = blogContainer.querySelectorAll(".blog_block");
        const totalPages = Math.ceil(cards.length / cardsPerPage);

        if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        showCards(currentPage);
        pageInfo.textContent = `Страница ${currentPage} из ${totalPages}`;

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    // Кнопка "Назад"
    prevButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });

    // Кнопка "Вперед"
    nextButton.addEventListener("click", function () {
        const cards = blogContainer.querySelectorAll(".blog_block");
        const totalPages = Math.ceil(cards.length / cardsPerPage);

        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });

    // Инициализация пагинации
    updatePagination();

});