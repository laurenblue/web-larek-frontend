import { IProduct, IActions, IProductPreview } from '../types';
import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';

export class Card<T> extends Component<IProduct> {
	protected _image: HTMLImageElement;
	protected _title: HTMLElement;
	protected _category: HTMLElement;
	protected _price: HTMLElement;

	constructor(container: HTMLElement, actions?: IActions) {
		super(container);
		this._category = container.querySelector('.card__category');
		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._image = container.querySelector('.card__image');
		this._price = ensureElement<HTMLElement>('.card__price', container);
		if (actions?.onClick) container.addEventListener('click', actions.onClick);
	}
	set category(value: string) {
		this.setText(this._category, value);
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set price(value: number | null) {
		this.setText(
			this._price,
			value ? `${value.toString()} синапсов` : 'Бесценно'
		);
	}
}
export class CardPreview extends Card<IProductPreview> {
    protected _text: HTMLElement;
    protected _button: HTMLElement;
    
    constructor(container: HTMLElement, actions?: IActions) {
        super(container, actions)
        this._button = container.querySelector(`.card__button`);
        this._text = ensureElement<HTMLElement>(`.card__text`, container);
    if (actions?.onClick) {
        if (this._button) {
            container.removeEventListener('click', actions.onClick);
            this._button.addEventListener('click', actions.onClick);
            } 
        }
    }
  
    set text(value: string) {
      this.setText(this._text, value);
    }
}

