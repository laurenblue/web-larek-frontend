import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { WebLarekApi } from './components/WebLarekApi';
import { CDN_URL, API_URL } from './utils/constants';
import { ensureElement } from './utils/utils';
import { AppState } from './components/AppState';
import { Page } from './components/Page';
import { Card } from './components/Card';
import { cloneTemplate } from './utils/utils';
import { ProductItem } from './components/AppState';
import { CardPreview } from './components/Card';
import { Modal } from './components/Modal';

const events = new EventEmitter();
const api = new WebLarekApi(CDN_URL, API_URL);
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const appState = new AppState({}, events);
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Получение и отображение списка товаров при загрузке страницы
api
	.getCatalog()
	.then(appState.setCatalog.bind(appState))
	.catch((err) => {
		console.log(err);
	});

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

events.on('card:select', (item: ProductItem) => {
    appState.setPreview(item);
  });

events.on('preview:changed', (item: ProductItem) => {
    const card = new CardPreview(cloneTemplate(cardPreviewTemplate), {
        onClick: () => events.emit('card:add', item)
        });
    modal.render({
        content: card.render({
            title: item.title,
            image: item.image,
            description: item.description,
            price: item.price,
            category: item.category
        })
    });
});