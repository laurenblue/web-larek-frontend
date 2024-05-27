/*интерфейс данных карточки, которые подтягиваются с сервера*/
export interface IProductItem {
	id: string;
	description?: string;
	image: string;
	title: string;
	category: string[];
	price: number;
}

/*интерфейс состояния для работы с элементами страницы*/
export interface IAppState {
	catalog: IProductItem[];
	basket: string;
	preview: string | null;
	order: IOrder | null;
}

/*интерфейс заказа*/
export interface IOrder extends IOrderForm {
	items: string[];
}

/*тип способ оплаты*/
type Payment = 'онлайн' | 'при получении';

/*валидация формы*/
export interface IValidation {
	valid: boolean;
	errors: string | null;
}

/*интерфейс формы заказа*/
export interface IOrderForm {
	payment: Payment;
	address: string;
}

/*интерфейс формы заполнения контактов заказчика*/
export interface IContactForm {
	email: string;
	phone: string;
}

/*success!*/
export interface ISuccessfulOrder {
	id: string;
	total: number;
}

/*интерфейс корзины покупок*/
export interface IBasket {
	data: IProductItem[];
	price: number;
}

/*интерфейс счетчика суммы заказов в корзине*/
export interface IBasketSum {
	sum: number;
}
