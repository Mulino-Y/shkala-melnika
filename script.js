// Функция для генерации звёзд.
function generateStars(rating) {
		const maxRating = 5;
		let starsHtml = '';
		for (let i = 0; i < maxRating; i++) {
				if (i < rating) {
						starsHtml += '<span class="filled">⭐</span>';
				} else {
						starsHtml += '<span class="empty">⭐</span>';
				}
		}
		return `<div class="char-stars">${starsHtml}</div>`;
}

// System
const productItems = document.querySelectorAll('.item');
const container = document.querySelector('.container');
const sortButtons = document.querySelectorAll('.sort-button');
const sidebar = document.querySelector('.sidebar');
const menuToggle = document.getElementById('menu-toggle');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});
const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalFullDescription = document.getElementById('modalFullDescription');
const modalCharacteristics = document.querySelector('.modal-characteristics');
const modalPrice = document.getElementById('modalPrice');
const closeButton = document.querySelector('.close-button');


// Обработчики для модального окна
productItems.forEach(item => {
		item.addEventListener('click', () => {
				const name = item.dataset.name;
				const image = item.dataset.image;
				const fullDescription = item.dataset.fullDescription;
				const price = item.dataset.price;
						
				const cloyingSweetness = parseInt(item.dataset.cloyingSweetness);
				const sweetness = parseInt(item.dataset.sweetness);
				const nutty = parseInt(item.dataset.nutty);
				const bitterness = parseInt(item.dataset.bitterness);
				const softness = parseInt(item.dataset.softness);
				const style = parseInt(item.dataset.style);
				const richness = parseInt(item.dataset.richness);
				const highlight = item.dataset.highlight;

				modalImage.src = image;
				modalTitle.textContent = name;
				modalFullDescription.textContent = fullDescription;

				if (price) {
						modalPrice.textContent = `Цена: ${price}`;
				} else {
						modalPrice.textContent = '';
				}

				modalCharacteristics.innerHTML = '';
				if (!isNaN(cloyingSweetness)) {
						modalCharacteristics.innerHTML += `<li><strong>Приторная сладость:</strong> ${generateStars(cloyingSweetness)}</li>`;
				}
				if (!isNaN(sweetness)) {
						modalCharacteristics.innerHTML += `<li><strong>Сладость:</strong> ${generateStars(sweetness)}</li>`;
				}
				if (!isNaN(nutty)) {
						modalCharacteristics.innerHTML += `<li><strong>Орешность:</strong> ${generateStars(nutty)}</li>`;
				}
				if (!isNaN(bitterness)) {
						modalCharacteristics.innerHTML += `<li><strong>Горькость:</strong> ${generateStars(bitterness)}</li>`;
				}
				if (!isNaN(softness)) {
						modalCharacteristics.innerHTML += `<li><strong>Мягкость:</strong> ${generateStars(softness)}</li>`;
				}
				if (!isNaN(style)) {
						modalCharacteristics.innerHTML += `<li><strong>Стиль:</strong> ${generateStars(style)}</li>`;
				}
				if (!isNaN(richness)) {
						modalCharacteristics.innerHTML += `<li><strong>Насыщенность:</strong> ${generateStars(richness)}</li>`;
				}
				if (highlight) {
						modalCharacteristics.innerHTML += `<li><strong>Изюминка:</strong> ${highlight}</li>`;
				}

				modal.style.display = 'flex';
		});
});

closeButton.addEventListener('click', () => {
		modal.style.display = 'none';
});

modal.addEventListener('click', (event) => {
		if (event.target === modal) {
				modal.style.display = 'none';
		}
});

document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
				modal.style.display = 'none';
		}
});
// Функция для сортировки конфет
function sortProducts(sortBy) {
    let sortedItems = Array.from(productItems);

    if (sortBy !== 'none') {
        sortedItems.sort((a, b) => {
            const valA = parseInt(a.dataset[sortBy.replace(/-./g, match => match.toUpperCase()[1])]) || 0;
            const valB = parseInt(b.dataset[sortBy.replace(/-./g, match => match.toUpperCase()[1])]) || 0;
            return valB - valA;
        });
    }

    container.innerHTML = '';
    sortedItems.forEach(item => container.appendChild(item));
}

// Обработчики событий на кнопки сортировки
sortButtons.forEach(button => {
    button.addEventListener('click', () => {
        sortButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const sortBy = button.dataset.sortBy;
        sortProducts(sortBy);
    });
});