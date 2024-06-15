import { ISuccessActions, ISuccess } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
export class Success extends Component<ISuccess> {
	protected _close: HTMLElement;
	protected _total: HTMLElement;
	private _amount: number | string;

	constructor(container: HTMLElement, actions?: ISuccessActions) {
		super(container);

		this._close = ensureElement<HTMLElement>(
			'.order-success__close',
			this.container
		);
		this._total = ensureElement<HTMLElement>(
			'.order-success__description',
			this.container
		);
		// Установка обработчика события на кнопку закрытия, если он передан
		if (actions?.onClick) {
			this._close.addEventListener('click', actions.onClick);
		}
	}

	set total(amount: number | string) {
		this._amount = amount;
		this.setText(this._total, `Списано ${amount} синапсов`);
	}

	get total() {
		return this._amount;
	}

	render() {
		this.setText(this._total, `Списано ${this._amount} синапсов`);
		return this.container;
	}
}
