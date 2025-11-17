interface Product {
    id: string;
    name: string;
    category: string;
    description: any;
    price: number;
    inStock: boolean;
    tags: string[];
}
class Repository<T extends { id: string }> {
    private items: T[] = []

    add(item: T): void {
        this.items.push(item)
    }

    findById(id: string): T | undefined {
        const itemById = this.items.find((item) =>  item.id === id)
        return itemById
    }

    update(id: string, updated: Partial<T>): void {
        const currentItem = this.findById(id)
        console.log(currentItem)
        const index = this.items.findIndex((item) => item.id === id)
        if (currentItem) {
            const newItem = {
                ...currentItem,
                ...updated
            }

            this.items.splice(index, 1, newItem)
        }
    }

    delete(id: string | undefined): void {
        const index = this.items.findIndex((item) => item.id === id)
        if (index) {
            this.items.splice(index, 0)
        }
    }
}



// for testing only
class ProductRepository extends Repository<Product> {}

const productRepo = new ProductRepository()

productRepo.add({
    id: '464duief',
    category: 'footwear',
    description: 'Black leather boots',
    inStock: true,
    name: 'Skorett',
    price: 1999,
    tags: ['black', 'elegant', 'casual']
})

productRepo.update ('464duief', {inStock: false, price: 1699})

console.log(productRepo)


// const repo = new Repository()
// repo.items = repo.

// type Code = 'STUDENT' | 'VIP';

// function calcTotal(price: number, taxRate: number):number {
// return price + price * taxRate;
// }

// function applyDiscount(subtotal: number, code: Code):number {
// if (!code) return 0;

// if (code === "STUDENT") return Math.round(subtotal * 0.1);

// if (code === "VIP") return 50;

// return 0;
// }

// function printReceipt(customer: string, price: number, taxRate: number, discountCode: Code) {
// const subtotal = calcTotal(price, taxRate);
// const discount = applyDiscount(subtotal, discountCode);
// const total = subtotal - discount;

// console.log(
// "Tack " +
// customer.toUpperCase() +
// "! Att betala: " +
// total.toFixed(2) +
// " kr"
// );
// }

// printReceipt("alex", 199, 0.25, "STUDENT");

console.log('yo')
