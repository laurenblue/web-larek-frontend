import { Component } from './base/Component';
import { createElement, ensureElement } from '../utils/utils';
import { IBasket } from '../types';
import { EventEmitter } from './base/Events';

const EMPTY_BASKET_MESSAGE = 'Корзина пуста';
const CURRENCY_UNIT = 'синапсов';

export class Basket extends Component<IBasket> {
	protected _list: HTMLElement;
	button: HTMLButtonElement | null;
	protected _total: HTMLElement | null;
	private itemsList: HTMLElement[] = [];

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this.button =
			this.container.querySelector<HTMLButtonElement>('.basket__button');
		this._total = this.container.querySelector<HTMLElement>('.basket__price');
		// Инициализация кнопки оформления заказа
		this.initializeButton();
		this.updateBasket();
	}
	// Инициализация события нажатия кнопки оформления заказа
	initializeButton(): void {
		if (this.button) {
			this.button.addEventListener('click', () =>
				this.events.emit('order:open')
			);
		}
	}

	// Установка списка товаров и обновление корзины
	set items(items: HTMLElement[]) {
		this.itemsList = items;
		this.updateBasket();
	}

	// Обновление содержимого корзины
	updateBasket(): void {
		if (this.itemsList.length > 0) {
			this._list.replaceChildren(...this.itemsList);
			this.setButtonState(false);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: EMPTY_BASKET_MESSAGE,
				})
			);
			this.setButtonState(true);
		}
	}

	// Установка общей суммы корзины
	set total(total: number) {
		if (this._total) {
			this.setText(this._total, `${total.toString()} ${CURRENCY_UNIT}`);
		}
	}

	// Установка состояния кнопки оформления заказа
	setButtonState(disabled: boolean): void {
		if (this.button) {
			this.setDisabled(this.button, disabled);
		}
	}
}
