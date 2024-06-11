import { Api } from './base/api';
import { IProduct, ApiListResponse, IOrder, ISuccessfulForm } from '../types';

export class WebLarekApi extends Api {
	readonly cdn: string;

	// Конструктор для инициализации API с базовым URL и CDN
	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	// Получение списка товаров с сервера и добавление CDN к изображению
	getitemList(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	// Получение данных конкретного товара по ID и добавление CDN к изображению
	getCardItem(id: string): Promise<IProduct> {
		return this.get(`/product/${id}`).then((item: IProduct) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	// Оформление заказа на сервере
	orderCard(order: IOrder): Promise<ISuccessfulForm> {
		return this.post(`/order`, order).then((data: ISuccessfulForm) => data);
	}
}
