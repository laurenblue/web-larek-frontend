import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { WebLarekApi } from './components/WebLarekApi';
import { cloneTemplate, ensureElement } from './utils/utils';
import { AppState } from './components/AppState';
import { Page } from './components/Page';
import { Card, CardPreview, CardBasket } from './components/Card';
import { Modal } from './components/Modal';
import { Basket } from './components/Basket';
import { Order } from './components/OrderForm';
import { Contacts } from './components/ContactForm';
import { Success } from './components/SuccessForm';
import { IOrderForm, IProductItem } from './types';

const events = new EventEmitter();
const api = new WebLarekApi(CDN_URL, API_URL);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const appState = new AppState({}, events);
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const delivery = new Order(cloneTemplate(orderTemplate), events);
const contact = new Contacts(cloneTemplate(contactsTemplate), events);

// Запрос списка товаров с сервера и установка каталога в состоянии приложения
api.getitemList().then(appState.setCatalog.bind(appState)).catch(console.log);

// Подписка на различные события и привязка обработчиков
events.on('items:changed', renderCatalog);
events.on('card:select', handleCardSelect);
events.on('preview:changed', renderCardPreview);
events.on('card:add', handleCardAdd);
events.on('basket:open', renderBasket);
events.on('card:remove', handleCardRemove);
events.on('order:open', renderOrderForm);
events.on('payment:change', handlePaymentChange);
events.on(/^order\..*:change/, handleOrderFieldChange);
events.on('formErrors:change', handleFormErrorsChange);
events.on('order:submit', handleOrderSubmit);
events.on(/^contacts\..*:change/, handleContactsFieldChange);
events.on('contacts:submit', handleContactsSubmit);

// Отрисовка каталога товаров
function renderCatalog() {
	page.catalog = appState.itemList.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			category: item.category,
			title: item.title,
			image: item.image,
			price: item.price,
		});
	});
}

// Обработчик выбора карточки товара
function handleCardSelect(item: IProductItem) {
	appState.setPreview(item);
}

// Отрисовка превью карточки товара
function renderCardPreview(item: IProductItem) {
	const card = new CardPreview(cloneTemplate(cardPreviewTemplate), {
		onClick: () => events.emit('card:add', item),
	});
	modal.render({
		content: card.render({
			title: item.title,
			image: item.image,
			description: item.description,
			price: item.price,
			category: item.category,
		}),
	});
}

// Обработчик добавления товара в корзину
function handleCardAdd(item: IProductItem) {
	appState.addToBasket(item);
	page.counter = appState.basketList.length;
	modal.close();
}

// Отрисовка содержимого корзины
function renderBasket() {
	basket.setDisabled(basket.button, appState.isBasketEmpty);
	basket.total = appState.getTotal();
	let i = 1;
	basket.items = appState.basketList.map((item) => {
		const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
			onClick: () => events.emit('card:remove', item),
		});
		return card.render({
			title: item.title,
			price: item.price,
			index: i++,
		});
	});
	modal.render({ content: basket.render() });
}

// Обработчик удаления товара из корзины
function handleCardRemove(item: IProductItem) {
	appState.removeFromBasket(item);
	page.counter = appState.basketList.length;
	updateBasket();
}

// Обновление содержимого корзины
function updateBasket() {
	basket.setDisabled(basket.button, appState.isBasketEmpty);
	basket.total = appState.getTotal();
	let i = 1;
	basket.items = appState.basketList.map((item) => {
		const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
			onClick: () => events.emit('card:remove', item),
		});
		return card.render({
			index: i++,
			title: item.title,
			price: item.price,
		});
	});
	modal.render({ content: basket.render() });
}

// Отрисовка формы заказа
function renderOrderForm() {
	modal.render({
		content: delivery.render({
			payment: '',
			address: '',
			valid: false,
			errors: [],
		}),
	});
	appState.order.items = appState.basketList.map((item) => item.id);
}

// Обработчик изменения метода оплаты
function handlePaymentChange(item: HTMLButtonElement) {
	appState.order.payment = item.name;
}

// Обработчик изменения полей формы заказа
function handleOrderFieldChange(data: {
	field: keyof IOrderForm;
	value: string;
}) {
	appState.setOrderField(data.field, data.value);
}

// Обработчик изменения ошибок формы
function handleFormErrorsChange(errors: Partial<IOrderForm>) {
	const { email, phone, address, payment } = errors;
	delivery.valid = !address && !payment;
	contact.valid = !email && !phone;
	delivery.errors = Object.values({ address, payment })
		.filter((i) => !!i)
		.join('; ');
	contact.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
}

// Обработчик отправки заказа
function handleOrderSubmit() {
	appState.order.total = appState.getTotal();
	modal.render({
		content: contact.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
}

// Обработчик изменения полей формы контактов
function handleContactsFieldChange(data: {
	field: keyof IOrderForm;
	value: string;
}) {
	appState.setContactsField(data.field, data.value);
}

// Обработчик отправки формы контактов и завершения заказа
function handleContactsSubmit() {
	api
		.orderCard(appState.order)
		.then(() => {
			appState.clearBasket();
			page.counter = appState.basketList.length;
			const success = new Success(cloneTemplate(successTemplate), {
				onClick: () => modal.close(),
			});
			modal.render({
				content: success.render({
					total: appState.getTotal(),
				}),
			});
		})
		.catch(console.error);
}

//создаю прокручивание до модального окна в случае клика на товары внизу списка 
events.on('modal:open', () => {
    document.body.style.overflow = 'hidden';

    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) {
        modalContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

events.on('modal:close', () => {
    document.body.style.overflow = '';
});
