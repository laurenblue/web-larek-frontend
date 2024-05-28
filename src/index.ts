import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { WebLarekApi } from './components/WebLarekApi';
import { CDN_URL, API_URL } from './utils/constants';
import { ensureElement } from './utils/utils';
import { AppState } from './components/AppState';
import { Page } from './components/Page';
import { Card } from './components/Card';
import { cloneTemplate } from './utils/utils';

const events = new EventEmitter();
const api = new WebLarekApi(CDN_URL, API_URL);
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const appState = new AppState({}, events);
const page = new Page(document.body, events);

//обновление списка товаров
events.on('items:changed', () => {
	page.catalog = appState.catalog.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
		});
	});
});

// Получение и отображение списка товаров при загрузке страницы
api
	.getCatalog()
	.then(appState.setCatalog.bind(appState))
	.catch((err) => {
		console.log(err);
	});
