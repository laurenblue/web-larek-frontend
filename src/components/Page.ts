import { IPage } from '../types';
import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/Events';

export class Page extends Component<IPage> {
	protected _counterBasket: HTMLElement;
	protected _itemList: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _basket: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		// Инициализация элементов страницы
		this._counterBasket = ensureElement<HTMLElement>('.header__basket-counter');
		this._itemList = ensureElement<HTMLElement>('.gallery');
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._basket = ensureElement<HTMLElement>('.header__basket');
		// Установка обработчика события на элемент корзины
		this._basket.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}
	// Установка значения счетчика корзины
	set counter(value: number) {
		this.setText(this._counterBasket, String(value));
	}
	// Обновление каталога товаров на странице
	set catalog(items: HTMLElement[]) {
		this._itemList.replaceChildren(...items);
	}
}
