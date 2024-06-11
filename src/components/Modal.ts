import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { IModalData } from '../types';

export class Modal extends Component<IModalData> {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		// Инициализация кнопки закрытия и содержимого
		this._closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this._content = ensureElement<HTMLElement>('.modal__content', container);

		// Установка обработчиков событий на кнопке закрытия и контейнере
		this._closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	// Установка содержимого модального окна
	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	// Открытие модального окна
	open() {
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	// Закрытие модального окна
	close() {
		this.container.classList.remove('modal_active');
		this.content = null;
		this.events.emit('modal:close');
	}

	// Отрисовка модального окна с данными
	render(data: IModalData): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
