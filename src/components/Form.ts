import { Component } from './base/Component';
import { IEvents } from './base/Events';
import { ensureElement } from '../utils/utils';
import { IValidation } from '../types';

export class Form<T> extends Component<IValidation> {
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);

		// Инициализация кнопки отправки и элемента ошибок
		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

		// Обработчик события ввода в поля формы
		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.InInputChange(field, value);
		});

		// Обработчик события отправки формы
		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});
	}

	// Обработчик изменения значения поля ввода
	protected InInputChange(field: keyof T, value: string) {
		this.events.emit(`${this.container.name}.${String(field)}:change`, {
			field,
			value,
		});
	}

	// Установка состояния валидности формы
	set valid(value: boolean) {
		this.setDisabled(this._submit, !value);
	}

	// Установка текста ошибок формы
	set errors(value: string) {
		this.setText(this._errors, value);
	}

	// Отрисовка состояния формы
	render(state: Partial<T> & IValidation) {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}
