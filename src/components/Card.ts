import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { IProduct, IProductPreview, IProductBasket, IActions } from '../types';

export class Card<T> extends Component<IProduct> {
	protected _category: HTMLElement;
	protected _title: HTMLElement;
	protected _image: HTMLImageElement;
	protected _price: HTMLElement;
	protected _button?: HTMLButtonElement;
	protected _colors: Record<string, string> = {
		'софт-скил': 'soft',
		другое: 'other',
		дополнительное: 'additional',
		кнопка: 'button',
		'хард-скил': 'hard',
	};

	constructor(container: HTMLElement, actions?: IActions) {
		super(container);
		this._category = ensureElement<HTMLElement>('.card__category', container);
		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._image = ensureElement<HTMLImageElement>('.card__image', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);

		// Установка обработчика события клика по карточке
		if (actions?.onClick) {
			container.addEventListener('click', actions.onClick);
		}
	}

	// Установка категории товара и соответствующего CSS-класса
	set category(value: string) {
		this.setText(this._category, value);
		this._category.className = `card__category card__category_${
			this._colors[value] || 'default'
		}`;
	}

	// Установка заголовка товара
	set title(value: string) {
		this.setText(this._title, value);
	}

	// Установка изображения товара
	set image(value: string) {
		this.setImage(this._image, value, this._title.textContent || '');
	}

	// Установка цены товара
	set price(value: string) {
		if (value === null) {
			this.setText(this._price, 'Бесценно');
			this.setDisabled(this._button, true);
		} else {
			this.setText(this._price, `${value} синапсов`);
			this.setDisabled(this._button, false);
		}
	}
}

// Класс для управления превью карточкой товара
export class CardPreview extends Card<IProductPreview> {
	protected _text: HTMLElement; // Элемент для текста описания товара

	// Конструктор принимает контейнер и действия
	constructor(container: HTMLElement, actions?: IActions) {
		super(container, actions);
		this._text = ensureElement<HTMLElement>('.card__text', container);
		this._button = container.querySelector('.card__button');

		// Установка обработчика события клика по кнопке
		if (actions?.onClick && this._button) {
			this._button.addEventListener('click', (event: MouseEvent) => {
				event.stopPropagation();
				actions.onClick(event);
			});
		}
	}

	// Установка текста описания товара
	set text(value: string) {
		this.setText(this._text, value);
	}

	// Обновление состояния кнопки (добавить/удалить)
	updateButtonState(isInBasket: boolean): void {
		if (isInBasket) {
			this._button.textContent = 'Удалить из корзины';
		} else {
			this._button.textContent = 'Добавить в корзину';
		}
		this.toggleClass(this._button, 'remove-button', isInBasket);
		this.toggleClass(this._button, 'add-button', !isInBasket);
	}
}

export class CardBasket extends Component<IProductBasket> {
	protected _index: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLElement | null;

	constructor(container: HTMLElement, actions?: IActions) {
		super(container);
		this._index = ensureElement<HTMLElement>('.basket__item-index', container);
		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._button = container.querySelector('.card__button');
		// Установка обработчика события клика по кнопке удаления
		if (actions?.onClick && this._button) {
			this._button.addEventListener('click', (event: MouseEvent) => {
				event.stopPropagation();
				actions.onClick(event);
			});
		}
	}

	// Установка индекса товара в корзине
	set index(value: number) {
		this.setText(this._index, value.toString());
	}

	// Установка заголовка товара
	set title(value: string) {
		this.setText(this._title, value);
	}

	// Установка цены товара
	set price(value: number | null) {
		this.setText(
			this._price,
			value ? `${value.toString()} синапсов` : 'Бесценно'
		);
	}
}
