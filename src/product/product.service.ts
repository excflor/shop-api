import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductService {
    private product: any[] = [];

    getProducts(title: string, price: number): any[] {
        const product = this.product.filter((product) => {
            let isMatch = true;
            if (title && product.title != title) {
                isMatch = false;
            }
            if (price && product.price != price) {
                isMatch = false;
            }
            return isMatch;
        })
        return product;
    }

    getProductById(id: string) {
        const product = this.findProductById(id);
        return this.product[product];
    }

    createProduct(title: string, description: string, price: number) {
        this.product.push({
            id: uuidv4(),
            title,
            description,
            price,
        });
    }

    updateProduct(id: string, title: string, description: string, price: number) {
        const product = this.findProductById(id);
        this.product[product].title = title;
        this.product[product].description = description;
        this.product[product].price = price;
    }

    findProductById(id: string) {
        const product = this.product.findIndex((product) =>  product.id === id);
        if (product === -1) {
            throw new NotFoundException(`Product with id ${id} is not found`);
        }
        return product;
    }

    deleteProduct(id: string) {
        const product = this.findProductById(id);
        this.product.splice(product, 1);
    }
}
