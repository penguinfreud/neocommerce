/**
 * Created by 11206 on 2017/5/29.
 */
import { Product } from '../product/product';
import { User } from '../user/user';
export class Order {
    id: number;
    user_id: number;
    product: Product;
    selected: boolean;
}