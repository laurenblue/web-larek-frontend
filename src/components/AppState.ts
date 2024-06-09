import { Model } from './base/Model';
import { IAppState, IProductItem } from '../types';

export class AppState extends Model<IAppState> {
	catalog: ProductItem[];
	preview: string | null;

	setCatalog(items: IProductItem[]) {
		this.catalog = items.map(item => new ProductItem(item, this.events));;
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

    setPreview(item: ProductItem) {
        this.preview = item.id;
        this.emitChanges('preview:changed', item);
    }
}

export class ProductItem extends Model<IProductItem> {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    price: number | null;
}