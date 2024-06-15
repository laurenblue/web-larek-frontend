import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { IProduct, IProductPreview, IActions, IProductBasket } from '../types';

function setPrice(
	element: HTMLElement,
	button: HTMLButtonElement | null,
	value: string | number | null,
	setDisabled: (element: HTMLElement, state: boolean) => void
) {
	if (value === null) {
		element.textContent = 'Бесценно';
		if (button) {
			button.textContent = 'Нельзя купить';
			setDisabled(button, true);
		}
	} else {
		element.textContent = `${value} синапсов`;
		if (button) {
			button.textContent = 'Добавить в корзину';
			setDisabled(button, false);
		}
	}
}

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

		if (actions?.onClick) {
			container.addEventListener('click', actions.onClick);
		}
	}

	set category(value: string) {
		this.setText(this._category, value);
		this._category.className = `card__category card__category_${
			this._colors[value] || 'default'
		}`;
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set image(value: string) {
		this.setImage(this._image, value, this._title.textContent || '');
	}

	set price(value: string | number | null) {
		setPrice(
			this._price,
			this._button || null,
			value,
			this.setDisabled.bind(this)
		);
	}
}

export class CardPreview extends Card<IProductPreview> {
	protected _text: HTMLElement;

	constructor(container: HTMLElement, actions?: IActions) {
		super(container, actions);
		this._text = ensureElement<HTMLElement>('.card__text', container);
		this._button = container.querySelector<HTMLButtonElement>('.card__button');

		if (actions?.onClick && this._button) {
			this._button.addEventListener('click', (event: MouseEvent) => {
				event.stopPropagation();
				actions.onClick!(event);
			});
		}
		if (actions?.onClick) {
			container.addEventListener('click', (event: MouseEvent) => {
				if (!(event.target as HTMLElement).closest('.card__button')) {
					actions.onClick!(event);
				}
			});
		}
	}

	set text(value: string) {
		this.setText(this._text, value);
	}

	updateButtonState(isInBasket: boolean): void {
		if (this._button) {
			if (this._price.textContent === 'Бесценно') {
				this._button.textContent = 'Нельзя купить';
				this.setDisabled(this._button, true);
			} else {
				this._button.textContent = isInBasket
					? 'Удалить из корзины'
					: 'Добавить в корзину';
				this.toggleClass(this._button, 'remove-button', isInBasket);
				this.toggleClass(this._button, 'add-button', !isInBasket);
			}
		}
	}
}

export class CardBasket extends Component<IProductBasket> {
	protected _index: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement | null;

	constructor(container: HTMLElement, actions?: IActions) {
		super(container);
		this._index = ensureElement<HTMLElement>('.basket__item-index', container);
		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._button = container.querySelector<HTMLButtonElement>('.card__button');

		if (actions?.onClick && this._button) {
			this._button.addEventListener('click', (event: MouseEvent) => {
				event.stopPropagation();
				actions.onClick!(event);
			});
		}
		if (actions?.onClick) {
			container.addEventListener('click', (event: MouseEvent) => {
				if (!(event.target as HTMLElement).closest('.card__button')) {
					actions.onClick!(event);
				}
			});
		}
	}

	set index(value: number) {
		this.setText(this._index, value.toString());
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set price(value: number | null) {
		setPrice(this._price, this._button, value, this.setDisabled.bind(this));
	}
}
