export interface IPage {
	itemList: HTMLElement[];
}

export interface IProduct {
	category: string;
	title: string;
	description: string;
	image: string;
	price: number;
}

export interface IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export interface IAppState {
	itemList: IProductItem[];
	basket: string;
	preview: string | null;
	order: IOrder | null;
	formErrors: FormErrors;
}

export interface IProductPreview {
	text: string;
}

export interface IProductBasket {
	index: number;
	title: string;
	price: number;
}

export interface IActions {
	onClick: (event: MouseEvent) => void;
}

export interface IBasket {
	items: HTMLElement[];
	total: number;
}

export interface IValidation {
	valid: boolean;
	errors: string[];
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IOrderForm {
	payment?: string;
	address?: string;
	phone?: string;
	email?: string;
	total?: string | number;
}

export interface IOrder extends IOrderForm {
	items: string[];
}

export interface ISuccess {
	total: number;
}

export interface ISuccessActions {
	onClick: () => void;
}

export interface IModalData {
	content: HTMLElement;
}

export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

export interface ISuccessfulForm {
	id: string;
}
