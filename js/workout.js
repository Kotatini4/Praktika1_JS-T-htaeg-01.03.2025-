// Глобальная переменная для хранения состояния тёмного режима
let darkModeEnabled = false;

document.addEventListener("DOMContentLoaded", () => {
    // Применяем тёмный режим к body при загрузке страницы
    if (darkModeEnabled) {
        document.body.classList.add("bg-gray-900");
    } else {
        document.body.classList.remove("bg-gray-900");
    }

    let workoutContent = document.getElementById("workout-content");
    workoutContent.innerHTML = `
        <button id='toggle-dark-mode' class='bg-gray-800 text-white p-2 rounded mb-4'>Тёмный режим</button>
        <form id='workout-form' class='${
            darkModeEnabled ? "bg-gray-900" : "bg-white"
        } p-4 shadow-md rounded-lg mb-6'>
            <input type='text' id='workout-name' placeholder='Название тренировки' class='border p-2 w-full mb-2' required>
            <select id='workout-type' class='border p-2 w-full mb-2'>
                <option value='Силовая'>Силовая</option>
                <option value='Кардио'>Кардио</option>
                <option value='Йога'>Йога</option>
            </select>
                <input type='number'
                id='workout-duration'
                placeholder='Длительность (мин)'
                class='border p-2 w-full mb-2'
                required
                min="1"
                max="1000">
            <div class='mb-2'>
                <label><input type='radio' name='intensity' value='Низкая'> Низкая</label>
                <label><input type='radio' name='intensity' value='Средняя'> Средняя</label>
                <label><input type='radio' name='intensity' value='Высокая'> Высокая</label>
            </div>
            <input type='number'
            id='workout-frequency'
            placeholder='Частота в неделю'
            class='border p-2 w-full mb-2'
            required
            min="1"
            max="1000">
            <textarea id='workout-comment' placeholder='Комментарий (необязательно)' class='border p-2 w-full mb-2'></textarea>
            <button type="submit" class="bg-blue-500 text-white p-2 w-[90%] rounded block mx-auto">Добавить тренировку</button>
        </form>
        <div id='filters' class='mb-4'>
            <button onclick='filterWorkouts("Силовая")' class='my-btn-gree bg-green-500 text-white p-2 rounded'>Силовые</button>
            <button onclick='filterWorkouts("Кардио")' class='my-btn-yellow bg-yellow-500 text-white p-2 rounded'>Кардио</button>
            <button onclick='filterWorkouts("Йога")' class='my-btn-purple bg-purple-500 text-white p-2 rounded'>Йога</button>
            <button onclick='filterWorkouts("")' class='my-btn-gray bg-gray-500 text-white p-2 rounded'>Все</button>
        </div>
        <div id='workout-list' class='${
            darkModeEnabled ? "bg-gray-900" : "bg-white"
        } p-4 shadow-md rounded-lg mb-6'></div>
        <div id='stats' class='mt-4 text-lg ${
            darkModeEnabled ? "bg-gray-900 text-white" : ""
        }'></div>
        <button id='clear-workouts' class='bg-red-500 text-white p-2 rounded mt-4'>Удалить все тренировки</button>
    `;

    loadWorkouts();
    // Функция валидации поля ввода
    function validateInputField(input) {
        // Удаляем все символы, не являющиеся цифрами
        input.value = input.value.replace(/[^0-9]/g, "");

        // Удаляем ведущие нули, если они есть
        input.value = input.value.replace(/^0+/, "");

        // Если поле пустое, ничего не делаем (допустим промежуточное состояние)
        if (input.value === "") return;

        let numericValue = Number(input.value);

        // Проверяем диапазон от 1 до 1000
        if (numericValue < 1) {
            input.value = "1";
        } else if (numericValue > 1000) {
            input.value = "1000";
        }
    }

    // Находим поля ввода
    const durationInput = document.getElementById("workout-duration");
    const frequencyInput = document.getElementById("workout-frequency");

    // Добавляем обработчик события "input" для проверки вводимых данных в реальном времени
    durationInput.addEventListener("input", function () {
        validateInputField(this);
    });
    frequencyInput.addEventListener("input", function () {
        validateInputField(this);
    });
    document
        .getElementById("workout-form")
        .addEventListener("submit", function (event) {
            event.preventDefault();
            addWorkout();
        });

    document
        .getElementById("clear-workouts")
        .addEventListener("click", function () {
            localStorage.removeItem("workouts");
            loadWorkouts();
        });

    document
        .getElementById("toggle-dark-mode")
        .addEventListener("click", function () {
            // Переключаем переменную и сохраняем в localStorage
            darkModeEnabled = !darkModeEnabled;
            localStorage.setItem("darkMode", darkModeEnabled);
            applyDarkMode();
        });
});

// Функция, которая применяет нужные классы в зависимости от darkModeEnabled
function applyDarkMode() {
    if (darkModeEnabled) {
        document.body.classList.add("bg-gray-900");
        document.getElementById("workout-content").classList.add("bg-gray-900");
        document.getElementById("workout-form").classList.remove("bg-white");
        document.getElementById("workout-form").classList.add("bg-gray-900");
        document.getElementById("workout-list").classList.remove("bg-white");
        document.getElementById("workout-list").classList.add("bg-gray-900");
        document
            .getElementById("stats")
            .classList.add("bg-gray-900", "text-white");

        document
            .querySelectorAll("h1, h2, label")
            .forEach((el) => el.classList.add("text-white"));

        document.querySelectorAll('input[type="radio"]').forEach((input) => {
            input.classList.add("bg-gray-700", "text-white", "border-gray-600");
        });
        document
            .getElementById("workout-name")
            .classList.add("bg-gray-700", "text-white", "border-gray-600");
        document
            .getElementById("workout-type")
            .classList.add("bg-gray-700", "text-white", "border-gray-600");
        document
            .getElementById("workout-duration")
            .classList.add("bg-gray-700", "text-white", "border-gray-600");
        document
            .getElementById("workout-frequency")
            .classList.add("bg-gray-700", "text-white", "border-gray-600");
        document
            .getElementById("workout-comment")
            .classList.add("bg-gray-700", "text-white", "border-gray-600");
        document.querySelectorAll(".container").forEach((div) => {
            div.classList.add("bg-gray-900");
        });
    } else {
        document.body.classList.remove("bg-gray-900");
        document
            .getElementById("workout-content")
            .classList.remove("bg-gray-900");
        document.getElementById("workout-form").classList.remove("bg-gray-900");
        document.getElementById("workout-form").classList.add("bg-white");
        document.getElementById("workout-list").classList.remove("bg-gray-900");
        document.getElementById("workout-list").classList.add("bg-white");
        document
            .getElementById("stats")
            .classList.remove("bg-gray-900", "text-white");

        document
            .querySelectorAll("h1, h2, label")
            .forEach((el) => el.classList.remove("text-white"));

        document.querySelectorAll('input[type="radio"]').forEach((input) => {
            input.classList.remove(
                "bg-gray-700",
                "text-white",
                "border-gray-600"
            );
        });
        document
            .getElementById("workout-name")
            .classList.remove("bg-gray-700", "text-white", "border-gray-600");
        document
            .getElementById("workout-type")
            .classList.remove("bg-gray-700", "text-white", "border-gray-600");
        document
            .getElementById("workout-duration")
            .classList.remove("bg-gray-700", "text-white", "border-gray-600");
        document
            .getElementById("workout-frequency")
            .classList.remove("bg-gray-700", "text-white", "border-gray-600");
        document
            .getElementById("workout-comment")
            .classList.remove("bg-gray-700", "text-white", "border-gray-600");
        document.querySelectorAll(".container").forEach((div) => {
            div.classList.remove("bg-gray-900");
        });
    }
    // После изменения стилей перезагружаем список тренировок, чтобы для динамических элементов учесть режим
    loadWorkouts();
}

function addWorkout() {
    let name = document.getElementById("workout-name").value.trim();
    let type = document.getElementById("workout-type").value;
    let duration = document.getElementById("workout-duration").value.trim();
    let intensity = document.querySelector(
        'input[name="intensity"]:checked'
    )?.value;
    let frequency = document.getElementById("workout-frequency").value.trim();
    let comment = document.getElementById("workout-comment").value;
    let completed = false;

    if (!name || !type || !duration || !intensity || !frequency) {
        alert("Пожалуйста, заполните все обязательные поля.");
        return;
    }

    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
    workouts.push({
        name,
        type,
        duration,
        intensity,
        frequency,
        comment,
        completed,
    });
    localStorage.setItem("workouts", JSON.stringify(workouts));

    loadWorkouts();
}

function loadWorkouts(filter = "") {
    let workoutList = document.getElementById("workout-list");
    workoutList.innerHTML = "";
    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

    let filteredWorkouts = filter
        ? workouts.filter((workout) => workout.type === filter)
        : workouts;

    filteredWorkouts.forEach((workout, index) => {
        let workoutElement = document.createElement("div");
        // Используем глобальную переменную darkModeEnabled для назначения классов
        let baseClasses =
            "workoutblacklist mb-5 p-4 rounded-lg flex justify-between items-center";
        let modeClasses = darkModeEnabled
            ? "bg-gray-700 text-white border-gray-600"
            : "bg-gray-200";
        workoutElement.className = `${baseClasses} ${modeClasses}`;

        workoutElement.innerHTML = `
            <div>
                <h3 class='text-lg font-semibold'>${workout.name}</h3>
                <p>${workout.type}, ${workout.duration} мин, Интенсивность: ${
            workout.intensity
        }, ${workout.frequency} раз в неделю</p>
                <p class='${
                    darkModeEnabled ? "text-gray-300" : "text-gray-500"
                }'>${workout.comment}</p>
                <label><input type='checkbox' onchange='toggleCompletion(${index})' ${
            workout.completed ? "checked" : ""
        }> Завершено</label>
            </div>
            <button onclick='deleteWorkout(${index})' class='bg-red-500 text-white p-2 rounded'>Удалить</button>
        `;
        workoutList.appendChild(workoutElement);
    });

    updateStats();
}

function deleteWorkout(index) {
    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
    workouts.splice(index, 1);
    localStorage.setItem("workouts", JSON.stringify(workouts));
    loadWorkouts();
}

function toggleCompletion(index) {
    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
    workouts[index].completed = !workouts[index].completed;
    localStorage.setItem("workouts", JSON.stringify(workouts));
    loadWorkouts();
}

function updateStats() {
    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
    let totalWorkouts = workouts.length;
    let avgDuration =
        totalWorkouts > 0
            ? (
                  workouts.reduce((sum, w) => sum + Number(w.duration), 0) /
                  totalWorkouts
              ).toFixed(1)
            : 0;
    document.getElementById(
        "stats"
    ).innerHTML = `Всего тренировок: ${totalWorkouts}, Средняя длительность: ${avgDuration} мин`;
}

function filterWorkouts(type) {
    loadWorkouts(type);
}
