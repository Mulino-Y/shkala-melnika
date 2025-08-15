// Функция для генерации звёзд.
function generateStars(rating) {
		const maxRating = 5;
		let starsHtml = '';
		for (let i = 0; i < maxRating; i++) {
				if (i < rating) {
						starsHtml += '<span class="filled">★</span>';
				} else {
						starsHtml += '<span class="empty">☆</span>';
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
						
				
				const sweetness = parseInt(item.dataset.sweetness);
				const popularity = parseInt(item.dataset.popularity);
				const nutty = parseInt(item.dataset.nutty);
				const naturalness = parseInt(item.dataset.naturalness);
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
				if (!isNaN(sweetness)) {
						modalCharacteristics.innerHTML += `<li><strong>Сладость:</strong> ${generateStars(sweetness)}</li>`;
				}
				if (!isNaN(nutty)) {
						modalCharacteristics.innerHTML += `<li><strong>Орешность:</strong> ${generateStars(nutty)}</li>`;
				}
				if (!isNaN(naturalness)) {
						modalCharacteristics.innerHTML += `<li><strong>Натуральность:</strong> ${generateStars(naturalness)}</li>`;
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
				if (!isNaN(popularity)) {
						modalCharacteristics.innerHTML += `<li><strong>Популярность:</strong> ${generateStars(popularity)}</li>`;
				}
				if (highlight) {
						modalCharacteristics.innerHTML += `<li><strong>Изюминка:</strong> ${highlight}</li>`;
				}

				modal.classList.add('show-modal');
		});
});

closeButton.addEventListener('click', () => {
		modal.classList.remove('show-modal');
});

modal.addEventListener('click', (event) => {
		if (event.target === modal) {
				modal.classList.remove('show-modal');
		}
});

document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
				modal.classList.remove('show-modal');
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

function sortByDefault() {
		
		sortButtons.forEach(btn => btn.classList.remove('active'));
		let sortedItems = Array.from(productItems);
		sortedItems.sort((a, b) => {
				const ratingA = a.querySelector('.stars .filled').textContent.length;
				const ratingB = b.querySelector('.stars .filled').textContent.length;
				return ratingB - ratingA;
		});

		container.innerHTML = '';
		sortedItems.forEach(item => container.appendChild(item));
}


document.addEventListener('DOMContentLoaded', () => {
		sortByDefault();
});



sortButtons.forEach(button => {
		button.addEventListener('click', () => {
				sortButtons.forEach(btn => btn.classList.remove('active'));
				button.classList.add('active');
				const sortBy = button.dataset.sortBy;
				
				if (sortBy === 'none' || sortBy === 'rating') {
						sortByDefault();
				} else {

						sortProducts(sortBy);
				}
				
				sidebar.classList.remove('active');
		});
});

//Сортировка фабрик
$(document).ready(function() {
  $('.filter-item').click(function() {
    $('.filter-item').removeClass('active');
    $(this).addClass('active');

    const factory = $(this).data('factory');

    $('.candy-item').hide();

    $('.candy-item[data-factory="' + factory + '"]').show();
  });
});