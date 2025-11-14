# 🤖 TypeScript i praktiken - TypeScript Part 2

### 🎯 Generics och Utility Types - E-commerce Inventory System

Denna uppgift är en fortsättning på [ts--intro](https://github.com/chas-academy/ts--intro) och introducerar mer avancerade koncept och mönster. Dessa uppgifter är designade för att ge er djupare förståelse för hur TypeScript kan användas för att skapa robust, typsäker och skalbär kod. **Rekommenderas att göras i grupp så att ni tillsammans lär er hur ni ska jobba med TypeScript i framtida projekt**.

## 📋 Förutsättningar

Innan du börjar med dessa uppgifter bör du ha:

- Genomfört den grundläggande TypeScript-uppgiften: [ts--intro](https://github.com/chas-academy/ts--intro)
- Förståelse för interfaces, union types, och grundläggande typer

### Mål

Lära er använda generics, utility types (`Partial`, `Pick`, `Omit`, `Required`) och skapa återanvändbara typer för ett lagersystem.

### Bakgrund

Bygg ett system för att hantera produkter i en e-handelsbutik. Systemet ska vara flexibelt och typsäkert, och använda TypeScript:s avancerade typsystem för att säkerställa dataintegritet.

### Steg

1. **Förberedelser**

   - Installera NPM-paketet `typescript` som dev dependency.
   - Initiera TypeScript för att skapa en `tsconfig.json` eller skapa filen manuellt och klistra in er egna konfiguration.

2. **Skapa grundläggande typer**

   - Skapa en `Product` interface med följande egenskaper:
     - `id, name, category, description`som alla är strängar. `description` ska vara valfri (optional)
     - `price` som är ett nummer och `inStock` som är en boolean
     - Samt `tags`som är en array av strängar

3. **Implementera en Generic Repository**

   - Skapa en generic `Repository<T>` class som kan hantera vilken typ av entitet som helst
   - `extends { id: string }`innebär att parametern `T` måste vara ett objekt som måste innehålla propertyn `id`

     ```ts
     class Repository<T extends { id: string }> {
       private items: T[] = [];

       // Implementera följande metoder/funktioner: add, findById, findAll, update, delete i denna klass
     }
     ```

   - Metoderna ska hantera innehållet i `items`. Utforma logiken utifrån metodens namn och vad ni tror den ska åstadkomma.
   - Använd generics så att alla metoder returnerar korrekta typer baserat på `T`
   - Nyckelordet `private` triggar ett TS error om man direkt försöker komma åt `items` utanför klassen, exempelvis:

     ```ts
     const repository = new Repository();
     repository.items; // triggar felmeddelande
     ```

4. **Använd Utility Types**

   - Skapa en `CreateProductInput` typ som använder `Omit<Product, 'id'>`
   - Skapa en `UpdateProductInput` typ som använder `Partial<Omit<Product, 'id'>>`
   - Skapa en `ProductPreview` typ som använder `Pick<Product, 'id' | 'name' | 'price'>`
   - Skapa en `RequiredProduct` typ som använder `Required<Product>` (gör `description` obligatorisk)
   - När du hovrar över namnet på varje ny typ bör du kunna se hur de skiljer sig från varandra. Reflektera över vad olika utility types har för funktionalitet.

5. **Skapa en child class**

   - Skapa en ny klass specifikt för `Product` som `extends` den generiska klassen och tar `Product` som parameter.

6. **Implementera metoder (funktioner inuti den nya klassen) med Utility Types**

   - `createProduct(input: CreateProductInput): Product` - skapar en produkt med auto-genererat ID. Exempelvis med `crypto.randomUUID()`.
   - `updateProduct(id: string, updates: UpdateProductInput): Product | null` - uppdaterar en produkt
   - `getProductPreview(id: string): ProductPreview | null` - returnerar en förhandsvisning
   - `searchProducts(query: string, filters?: Partial<Pick<Product, 'category' | 'inStock'>>): Product[]`

7. **Testa ditt system**
   - Skapa några produkter med olika kategorier
   - Testa uppdateringar med partiella data
   - Verifiera att TypeScript fångar upp fel när du försöker använda felaktiga typer
   - Det kommer fortfarande gå att konsollogga `items` i.o.m att `private` inte har någon effekt vid runtime

### Förväntat resultat

- En fungerande `Repository<T>` generic class
- En fungerande `ProductRepository extends Repository<Product>` child class
- Flera utility types som används korrekt
- Typsäkra funktioner för CRUD-operationer
- Inga TypeScript-fel

### Bonus

Lägg till en `findBy`-metod i `Repository` som tar en predicate function som callback. En "predicate function" är en funktion som returnerar en boolean:

```ts
  findBy(predicate: (item: T) => boolean): T[] {
    // använd exempelvis .filter() här och passa in predicate som callback
  }
```

- Skapa några funktioner som använder `findBy` och passar in en callback som gör en
  - Inkludera in-operatorn - Alltså `"key" in object`, exempelvis `"price" in item`. Operatorn returnerar en boolean och genom att kontrollera att en property finns i ett objekt förfinas typen. Detta kallas för "type narrowing".
