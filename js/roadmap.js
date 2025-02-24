let roadmapData = {};

fetch('data/roadmap.json')
    .then(response => response.json())
    .then(data => {
        roadmapData = data;
    });

function loadCategory(category) {
    let details = document.getElementById('roadmap-details');
    details.innerHTML = `<h2 class='text-2xl font-semibold mb-4'>${category}</h2>`;

    let roadmapSections = roadmapData[category];

    for (let section in roadmapSections) {
        let sectionElement = document.createElement('div');
        sectionElement.classList.add('bg-gray-100', 'p-4', 'rounded-lg', 'mb-4');

        let buttonsHTML = roadmapSections[section].map(item => {
            if (typeof item === 'object' && item.youtube) {
                return `<button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1' onclick='openModal("${item.name}", "${item.youtube}")'>${item.name}</button>`;
            } else {
                return `<button class='bg-gray-400 text-white font-bold py-2 px-4 rounded m-1 cursor-not-allowed' disabled>${item}</button>`;
            }
        }).join('');

        sectionElement.innerHTML = `<h3 class='text-lg font-semibold'>${section}</h3><div class='flex flex-wrap gap-2 mt-2'>${buttonsHTML}</div>`;
        details.appendChild(sectionElement);
    }
}

function openModal(title, youtubeUrl) {
    let modal = document.getElementById('modal');
    let modalTitle = document.getElementById('modal-title');
    let modalContent = document.getElementById('modal-content');
    let modalVideo = document.getElementById('modal-video');

    modalTitle.innerText = title;
    modalVideo.src = youtubeUrl.replace('watch?v=', 'embed/');
    modal.classList.remove('hidden');
}

function closeModal() {
    let modal = document.getElementById('modal');
    let modalVideo = document.getElementById('modal-video');
    modal.classList.add('hidden');
    modalVideo.src = '';
}