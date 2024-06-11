import { Model } from './base/Model';
import {
	IAppState,
	IOrder,
	IProductItem,
	FormErrors,
	IOrderForm,
} from '../types';

export class AppState extends Model<IAppState> {
	itemList: IProductItem[];
	preview: string | null;
	basket: IProductItem[] = [];
	order: IOrder = {
		address: '',
		payment: '',
		email: '',
		total: 0,
		phone: '',
		items: [],
	};
	formErrors: FormErrors = {};

	// Установка каталога товаров
	setCatalog(items: IProductItem[]): void {
		this.itemList = items;
		this.emitChanges('items:changed', this.itemList);
	}

	// Установка превью товара
	setPreview(item: IProductItem): void {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	// Добавление товара в корзину
	addToBasket(item: IProductItem): void {
		this.basket.push(item);
		this.order.items.push(item.id);
	}

	// Получение списка товаров в корзине
	get basketList(): IProductItem[] {
		return this.basket;
	}

	// Проверка, пуста ли корзина
	get isBasketEmpty(): boolean {
		return this.basket.length === 0;
	}

	// Установка общей суммы заказа
	set total(value: number) {
		this.order.total = value;
	}

	// Получение общей суммы товаров в корзине
	getTotal(): number {
		return this.basket.reduce((acc, item) => acc + item.price, 0);
	}

	// Удаление товара из корзины
	removeFromBasket(item: IProductItem): void {
		this.basket = this.basket.filter((basketItem) => basketItem.id !== item.id);
		this.order.items = this.order.items.filter(
			(orderItemId) => orderItemId !== item.id
		);
	}

	// Очистка корзины
	clearBasket(): void {
		this.basket = [];
		this.order.items = [];
	}

	// Установка поля заказа
	setOrderField(field: keyof IOrderForm, value: string): void {
		this.order[field] = value;
		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	// Установка поля контактов
	setContactsField(field: keyof IOrderForm, value: string): void {
		this.order[field] = value;
		if (this.validateContacts()) {
			this.events.emit('order:ready', this.order);
		}
	}

	// Валидация данных заказа
	validateOrder(): boolean {
		const errors: FormErrors = {};
		const deliveryRegex = /^[а-яА-ЯёЁa-zA-Z0-9\s\/.,-]{7,}$/;

		if (!this.order.address || !deliveryRegex.test(this.order.address)) {
			errors.address = !this.order.address
				? 'Необходимо указать адрес'
				: 'Укажите действительный адрес';
		}

		if (!this.order.payment) {
			errors.payment = 'Выберите способ оплаты';
		}

		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);

		return Object.keys(errors).length === 0;
	}

	// Валидация данных контактов
	validateContacts(): boolean {
		const errors: FormErrors = {};
		const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
		const phoneRegex = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/;

		if (this.order.phone.startsWith('8')) {
			this.order.phone = '+7' + this.order.phone.slice(1);
		}

		if (!this.order.email || !emailRegex.test(this.order.email)) {
			errors.email = !this.order.email
				? 'Необходимо указать email'
				: 'Некорректный адрес электронной почты';
		}

		if (!this.order.phone || !phoneRegex.test(this.order.phone)) {
			errors.phone = !this.order.phone
				? 'Необходимо указать телефон'
				: 'Некорректный формат номера телефона';
		}

		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);

		return Object.keys(errors).length === 0;
	}

	// Очистка данных заказа
	clearOrder(): void {
		this.order = {
			address: '',
			payment: 'cash',
			email: '',
			total: 0,
			phone: '',
			items: [],
		};
	}
}
