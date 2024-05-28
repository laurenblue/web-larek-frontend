import { Model } from './base/Model';
import { IAppState, IProductItem } from '../types';

export class AppState extends Model<IAppState> {
	catalog: IProductItem[];
	preview: string | null;

	setCatalog(items: IProductItem[]) {
		this.catalog = items;
		this.emitChanges('items:changed', { catalog: this.catalog });
	}
}
