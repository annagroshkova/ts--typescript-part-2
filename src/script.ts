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
        const index = this.items.findIndex(item => item.id === id)
        if (index >= 0) {
            this.items.splice(index, 1)
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

// productRepo.update ('464duief', {inStock: false, price: 1699})
productRepo.delete('464duief')

console.log(productRepo)

