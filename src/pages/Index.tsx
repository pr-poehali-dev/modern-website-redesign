import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  rating: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Дрель ударная',
    brand: 'Bosch',
    price: 5990,
    oldPrice: 7990,
    image: 'https://v3b.fal.media/files/b/penguin/XUHiHhwOAyPorGas1IEOn_output.png',
    category: 'Дрели',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Шуруповёрт аккумуляторный',
    brand: 'Makita',
    price: 8490,
    image: 'https://v3b.fal.media/files/b/penguin/XUHiHhwOAyPorGas1IEOn_output.png',
    category: 'Шуруповёрты',
    rating: 4.9
  },
  {
    id: 3,
    name: 'Перфоратор SDS-plus',
    brand: 'DeWalt',
    price: 12990,
    oldPrice: 15990,
    image: 'https://v3b.fal.media/files/b/penguin/XUHiHhwOAyPorGas1IEOn_output.png',
    category: 'Перфораторы',
    rating: 4.7
  },
  {
    id: 4,
    name: 'Болгарка УШМ 125мм',
    brand: 'Bosch',
    price: 4290,
    image: 'https://v3b.fal.media/files/b/penguin/XUHiHhwOAyPorGas1IEOn_output.png',
    category: 'Болгарки',
    rating: 4.6
  },
  {
    id: 5,
    name: 'Лобзик электрический',
    brand: 'Makita',
    price: 6790,
    image: 'https://v3b.fal.media/files/b/penguin/XUHiHhwOAyPorGas1IEOn_output.png',
    category: 'Лобзики',
    rating: 4.5
  },
  {
    id: 6,
    name: 'Циркулярная пила',
    brand: 'DeWalt',
    price: 9990,
    oldPrice: 11990,
    image: 'https://v3b.fal.media/files/b/penguin/XUHiHhwOAyPorGas1IEOn_output.png',
    category: 'Пилы',
    rating: 4.8
  }
];

const brands = ['Bosch', 'Makita', 'DeWalt'];
const categories = ['Дрели', 'Шуруповёрты', 'Перфораторы', 'Болгарки', 'Лобзики', 'Пилы'];

export default function Index() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 20000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('home');

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const filteredProducts = products.filter(product => {
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesCategory && matchesPrice && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg animate-gradient-x">
                <Icon name="Wrench" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  POWER TOOLS STORE
                </h1>
                <p className="text-xs text-muted-foreground">Профессиональное оборудование</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-1">
              {[
                { id: 'home', label: 'Главная', icon: 'Home' },
                { id: 'catalog', label: 'Каталог', icon: 'Grid3x3' },
                { id: 'about', label: 'О компании', icon: 'Info' },
                { id: 'delivery', label: 'Доставка', icon: 'Truck' },
                { id: 'contacts', label: 'Контакты', icon: 'MapPin' }
              ].map(item => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  onClick={() => setActiveSection(item.id)}
                  className={`gap-2 transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Icon name={item.icon as any} size={16} />
                  <span className="font-medium">{item.label}</span>
                </Button>
              ))}
            </nav>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300 hover:scale-105">
              <Icon name="ShoppingCart" size={18} />
              <Badge className="ml-2 bg-white text-primary">3</Badge>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-secondary via-primary to-secondary animate-gradient-x bg-[length:200%_200%]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm px-6 py-2">
              🔥 Специальное предложение
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Профессиональные<br />
              инструменты для работы
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Передовые технологии и надёжность от ведущих мировых брендов
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 shadow-2xl text-lg px-8 py-6 transition-all duration-300 hover:scale-105"
              >
                <Icon name="ShoppingBag" size={20} />
                Каталог товаров
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary shadow-2xl text-lg px-8 py-6 transition-all duration-300 hover:scale-105"
              >
                <Icon name="Phone" size={20} />
                Связаться с нами
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="md:col-span-1 p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm sticky top-24 h-fit animate-fade-in">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
                <Icon name="SlidersHorizontal" size={20} className="text-primary" />
                Фильтры
              </h3>

              <div className="mb-6">
                <label className="text-sm font-semibold mb-3 block text-foreground">Поиск</label>
                <Input
                  placeholder="Название или бренд..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-gray-200 focus:border-primary transition-all"
                />
              </div>

              <div className="mb-6">
                <label className="text-sm font-semibold mb-3 block text-foreground">
                  Цена: {priceRange[0]} - {priceRange[1]} ₽
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={20000}
                  step={100}
                  className="mb-2"
                />
              </div>

              <div className="mb-6">
                <label className="text-sm font-semibold mb-3 block text-foreground">Бренды</label>
                <div className="space-y-3">
                  {brands.map(brand => (
                    <div key={brand} className="flex items-center gap-2 group">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => toggleBrand(brand)}
                        className="border-gray-300 data-[state=checked]:bg-primary"
                      />
                      <label
                        htmlFor={brand}
                        className="text-sm cursor-pointer group-hover:text-primary transition-colors"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-3 block text-foreground">Категории</label>
                <div className="space-y-3">
                  {categories.map(category => (
                    <div key={category} className="flex items-center gap-2 group">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                        className="border-gray-300 data-[state=checked]:bg-primary"
                      />
                      <label
                        htmlFor={category}
                        className="text-sm cursor-pointer group-hover:text-primary transition-colors"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {(selectedBrands.length > 0 || selectedCategories.length > 0) && (
                <Button
                  variant="outline"
                  className="w-full mt-6 border-primary text-primary hover:bg-primary hover:text-white transition-all"
                  onClick={() => {
                    setSelectedBrands([]);
                    setSelectedCategories([]);
                    setPriceRange([0, 20000]);
                    setSearchQuery('');
                  }}
                >
                  <Icon name="X" size={16} />
                  Сбросить фильтры
                </Button>
              )}
            </Card>

            <div className="md:col-span-3">
              <div className="flex items-center justify-between mb-6 animate-fade-in">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Каталог товаров</h3>
                  <p className="text-muted-foreground">Найдено товаров: {filteredProducts.length}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <Card
                    key={product.id}
                    className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white animate-scale-in cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-56 object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.oldPrice && (
                        <Badge className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg">
                          -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                        </Badge>
                      )}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-secondary backdrop-blur-sm">
                          {product.brand}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <Badge variant="outline" className="mb-3 text-xs border-primary/30 text-primary">
                        {product.category}
                      </Badge>
                      <h4 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
                      </div>
                      <div className="flex items-end gap-2 mb-4">
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {product.price.toLocaleString()} ₽
                        </span>
                        {product.oldPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.oldPrice.toLocaleString()} ₽
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1 bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300 hover:scale-105">
                          <Icon name="ShoppingCart" size={16} />
                          В корзину
                        </Button>
                        <Button variant="outline" size="icon" className="border-gray-200 hover:border-primary hover:text-primary transition-all">
                          <Icon name="Heart" size={16} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <Card className="p-12 text-center border-0 shadow-lg bg-white">
                  <Icon name="SearchX" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-bold mb-2">Товары не найдены</h3>
                  <p className="text-muted-foreground mb-4">Попробуйте изменить параметры фильтрации</p>
                  <Button
                    onClick={() => {
                      setSelectedBrands([]);
                      setSelectedCategories([]);
                      setPriceRange([0, 20000]);
                      setSearchQuery('');
                    }}
                    className="bg-gradient-to-r from-primary to-secondary"
                  >
                    Сбросить фильтры
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Wrench" className="text-white" size={20} />
                </div>
                <h3 className="font-bold text-xl">POWER TOOLS</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Профессиональное оборудование для работы
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-primary cursor-pointer transition-colors">Главная</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Каталог</li>
                <li className="hover:text-primary cursor-pointer transition-colors">О компании</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Контакты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-primary cursor-pointer transition-colors">Доставка и оплата</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Гарантия</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Возврат товара</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Помощь</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} className="text-primary" />
                  <span>+7 (800) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} className="text-primary" />
                  <span>info@powertools.ru</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <span>г. Москва, ул. Примерная, 123</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 Power Tools Store. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}