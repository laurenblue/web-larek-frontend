import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/Events';
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

		// Установка обработчиков событий
		this._initializeEventListeners();
	}

	_initializeEventListeners() {
		this._closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', this._stopPropagation);

		// Добавление события stopPropagation ко всем дочерним элементам внутри _content
		this._addStopPropagationToChildren(this._content);
	}

	_stopPropagation(event: Event): void {
		event.stopPropagation();
	}

	_addStopPropagationToChildren(element: HTMLElement) {
		const allChildren = element.querySelectorAll('*');
		allChildren.forEach((child) => {
			child.addEventListener('click', this._stopPropagation);
		});
	}

	// Установка содержимого модального окна
	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
		this._addStopPropagationToChildren(this._content);
	}

	// Метод для переключения модального окна
	_toggleModal(state: boolean = true) {
		this.toggleClass(this.container, 'modal_active', state);
	}

	// Обработчик Escape для закрытия модального окна
	_handleEscape = (evt: KeyboardEvent) => {
		if (evt.key === 'Escape') {
			this.close();
		}
	};

	// Открытие модального окна
	open() {
		this._toggleModal(true); // открываем
		document.addEventListener('keydown', this._handleEscape);
		this.events.emit('modal:open');
	}

	// Закрытие модального окна
	close() {
		this._toggleModal(false); // закрываем
		document.removeEventListener('keydown', this._handleEscape);
		this._content.innerHTML = ''; // Очистка содержимого вместо замены на null
		this.events.emit('modal:close');
	}

	// Отрисовка модального окна с данными
	render(data: IModalData): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
