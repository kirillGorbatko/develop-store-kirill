const tabs = (link, block) => {
	const linkSelector = document.querySelectorAll(link);
	const blockSelector = document.querySelectorAll(block);

	if (linkSelector.length && blockSelector.length) {
		linkSelector.forEach(item => item.addEventListener('click', (e) => {
			e.preventDefault();

			const currentData = item.dataset.tab;
			const prefix = '[data-tab="';
			const postfix = '"]';
			const selector = block + prefix + currentData + postfix;

			blockSelector.forEach(blockEl => blockEl.classList.remove('active_tab'));
			linkSelector.forEach(el => el.classList.remove('active_tab'));

			document.querySelectorAll(selector).forEach(selectorEl => selectorEl.classList.add('active_tab'));
			item.classList.add('active_tab');
		}));
	}
}

window.addEventListener('load', () => {
	tabs('.custom-tabs__btn', '.custom-tabs__block');
});