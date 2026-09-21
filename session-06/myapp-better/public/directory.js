const search = document.querySelector('#search');
const sort = document.querySelector('#sort');
const grid = document.querySelector('#cards');
const cards = Array.from(grid.children);

function updateDirectory() {
    const query = search.value.trim().toLowerCase();
    const ordered = [...cards].sort((a, b) => {
        if (sort.value === 'name') return a.dataset.name.localeCompare(b.dataset.name);
        if (sort.value === 'worth') return Number(b.dataset.worth) - Number(a.dataset.worth);
        return Number(a.dataset.order) - Number(b.dataset.order);
    });
    let visible = 0;
    ordered.forEach(card => {
        card.hidden = !card.dataset.name.toLowerCase().includes(query);
        if (!card.hidden) visible++;
        grid.append(card);
    });
    document.querySelector('#empty').hidden = visible !== 0;
    document.querySelector('#results').textContent = query
        ? `Showing ${visible} of ${cards.length} profiles`
        : `Showing all ${cards.length} profiles`;
}

search.addEventListener('input', updateDirectory);
sort.addEventListener('change', updateDirectory);
