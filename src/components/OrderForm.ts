import { Form } from './Form';
import { IOrderForm } from '../types';
import { ensureAllElements } from '../utils/utils';
import { IEvents } from './base/events';

export class Order extends Form<IOrderForm> {
	protected _buttons: HTMLButtonElement[];

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
		this._buttons = ensureAllElements<HTMLButtonElement>(
			'.button_alt',
			container
		);
		this.initializeButtonEvents();
	}

	// Инициализация событий для кнопок выбора способа оплаты
	initializeButtonEvents(): void {
		this._buttons.forEach((button) => {
			button.addEventListener('click', () => {
				this.payment = button.name; // Установка выбранного способа оплаты
				this.events.emit('payment:change', button); // Генерация события изменения оплаты
			});
		});
	}

	// Установка выбранного способа оплаты
	set payment(name: string) {
		this._buttons.forEach((button) => {
			this.toggleClass(button, 'button_alt-active', button.name === name); // Активирование выбранной кнопки
		});
	}

	// Установка значения адреса доставки
	set address(value: string) {
		const addressInput = this.container.elements.namedItem(
			'address'
		) as HTMLInputElement;
		if (addressInput) {
			addressInput.value = value; // Обновление значения поля адреса
		}
	}
}
