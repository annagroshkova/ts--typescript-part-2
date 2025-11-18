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
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: string): T | undefined {
    const itemById = this.items.find((item) => item.id === id);
    return itemById;
  }

  findAll() {
    return this.items;
  }

  update(id: string, updated: Partial<T>): void {
    const currentItem = this.findById(id);
    const index = this.items.findIndex((item) => item.id === id);
    if (currentItem) {
      const newItem = {
        ...currentItem,
        ...updated,
      };

      this.items.splice(index, 1, newItem);
    }
  }

  delete(id: string | undefined): void {
    const index = this.items.findIndex((item) => item.id === id);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }
}

type CreateProductInput = Omit<Product, "id">;
type UpdateProductInput = Partial<CreateProductInput>;

type ProductPreview = Pick<Product, "id" | "name" | "price">;
type RequiredProduct = Required<Product>;

// for testing only
class ProductRepository extends Repository<Product> {
  createProductInput(newProduct: CreateProductInput) {
    this.add({
      ...newProduct,
      id: crypto.randomUUID(),
    });
  }
  updateProduct(id: string, updates: UpdateProductInput) {
    this.update(id, updates);
  }

  productPreview(productId: string): ProductPreview | string {
    const product = this.findById(productId);
    if (product) {
      const { id, name, price } = product;

      return { id, name, price };
    }
    return "Not found";
  }
}
const productRepo = new ProductRepository();

productRepo.createProductInput({
  category: "footwear",
  description: "Black leather boots",
  inStock: true,
  name: "Skorett",
  price: 199,
  tags: ["black", "elegant", "casual"],
});

const products = productRepo.findAll();
const firstProduct = products?.[0];

if (firstProduct) {
  productRepo.updateProduct(firstProduct.id, { inStock: false, price: 1599 });
  productRepo.productPreview(firstProduct.id)
}


console.log(productRepo);
