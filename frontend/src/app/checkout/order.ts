/**
 * Created by 11206 on 2017/5/29.
 */
import { Product } from '../product/product';
import { User } from '../user/user';
export class Order {
    id: number;
    userId: number;
    product: Product;
}