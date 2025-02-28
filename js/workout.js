document.addEventListener("DOMContentLoaded", () => {
    let workoutContent = document.getElementById("workout-content");
    workoutContent.innerHTML = `
        <h2 class='text-2xl font-semibold mb-4'></h2>
        <button id='toggle-dark-mode' class='bg-gray-800 text-white p-2 rounded mb-4'>Тёмный режим</button>
        <form id='workout-form' class='bg-white p-4 shadow-md rounded-lg mb-6'>
            <input type='text' id='workout-name' placeholder='Название тренировки' class='border p-2 w-full mb-2' required>
            <select id='workout-type' class='border p-2 w-full mb-2'>
                <option value='Силовая'>Силовая</option>
                <option value='Кардио'>Кардио</option>
                <option value='Йога'>Йога</option>
            </select>
            <input type='number' id='workout-duration' placeholder='Длительность (мин)' class='border p-2 w-full mb-2' required>
            <div class='mb-2'>
                <label><input type='radio' name='intensity' value='Низкая'> Низкая</label>
                <label><input type='radio' name='intensity' value='Средняя'> Средняя</label>
                <label><input type='radio' name='intensity' value='Высокая'> Высокая</label>
            </div>
            <input type='number' id='workout-frequency' placeholder='Частота в неделю' class='border p-2 w-full mb-2' required>
            <textarea id='workout-comment' placeholder='Комментарий (необязательно)' class='border p-2 w-full mb-2'></textarea>
            <button type='submit' class='bg-blue-500 text-white p-2 w-full rounded'>Добавить тренировку</button>
        </form>
        <div id='filters' class='mb-4'>
            <button onclick='filterWorkouts("Силовая")' class='bg-green-500 text-white p-2 rounded'>Силовые</button>
            <button onclick='filterWorkouts("Кардио")' class='bg-yellow-500 text-white p-2 rounded'>Кардио</button>
            <button onclick='filterWorkouts("Йога")' class='bg-purple-500 text-white p-2 rounded'>Йога</button>
            <button onclick='filterWorkouts("")' class='bg-gray-500 text-white p-2 rounded'>Все</button>
        </div>
        <div id='workout-list' class='bg-white p-4 shadow-md rounded-lg mb-6'></div>
        <div id='stats' class='mt-4 text-lg'></div>
        <button id='clear-workouts' class='bg-red-500 text-white p-2 rounded mt-4'>Удалить все тренировки</button>
    `;

    loadWorkouts();

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
            document.body.classList.toggle("bg-gray-900");
            document.querySelectorAll("h1").forEach((h2) => {
                h2.classList.toggle("text-white");
            });
            document.querySelectorAll("h2").forEach((h2) => {
                h2.classList.toggle("text-white");
            });
            document
                .getElementById("workout-content")
                .classList.toggle("bg-gray-900");
            document
                .getElementById("workout-form")
                .classList.toggle("bg-gray-900");
            document
                .getElementById("workout-list")
                .classList.toggle("bg-gray-900");

            document.querySelectorAll(".container").forEach((div) => {
                div.classList.toggle("bg-gray-900");
            });
            document.getElementById("stats").classList.toggle("bg-gray-900");
            document.getElementById("stats").classList.toggle("text-white");

            document.querySelectorAll("label").forEach((label) => {
                label.classList.toggle("text-white");
            });

            document
                .querySelectorAll('input[type="radio"]')
                .forEach((input) => {
                    input.classList.toggle("bg-gray-700");
                    input.classList.toggle("border-gray-600");
                });
            document
                .getElementById("workout-name")
                .classList.toggle("bg-gray-700");
            document
                .getElementById("workout-name")
                .classList.toggle("text-white");
            document
                .getElementById("workout-name")
                .classList.toggle("border-gray-600");

            document
                .getElementById("workout-type")
                .classList.toggle("bg-gray-700");
            document
                .getElementById("workout-type")
                .classList.toggle("text-white");
            document
                .getElementById("workout-type")
                .classList.toggle("border-gray-600");

            document
                .getElementById("workout-duration")
                .classList.toggle("bg-gray-700");
            document
                .getElementById("workout-duration")
                .classList.toggle("text-white");
            document
                .getElementById("workout-duration")
                .classList.toggle("border-gray-600");

            document
                .getElementById("workout-frequency")
                .classList.toggle("bg-gray-700");
            document
                .getElementById("workout-frequency")
                .classList.toggle("text-white");
            document
                .getElementById("workout-frequency")
                .classList.toggle("border-gray-600");

            document
                .getElementById("workout-comment")
                .classList.toggle("bg-gray-700");
            document
                .getElementById("workout-comment")
                .classList.toggle("text-white");
            document
                .getElementById("workout-comment")
                .classList.toggle("border-gray-600");
        });
});

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
        workoutElement.classList.add(
            "bg-gray-200",
            "p-4",
            "rounded-lg",
            "flex",
            "justify-between",
            "items-center"
        );
        workoutElement.innerHTML = `
            <div>
                <h3 class='text-lg font-semibold'>${workout.name}</h3>
                <p>${workout.type}, ${workout.duration} мин, Интенсивность: ${
            workout.intensity
        }, ${workout.frequency} раз в неделю</p>
                <p class='text-gray-500'>${workout.comment}</p>
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
