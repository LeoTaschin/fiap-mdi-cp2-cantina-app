export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  color: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Coxinha da Cantina',
    category: 'Salgado',
    description: 'Salgadinho quente com recheio cremoso de frango e tempero especial da cantina.',
    price: 8.5,
    color: '#F59E0B',
  },
  {
    id: 'm2',
    name: 'Pastel de Queijo',
    category: 'Salgado',
    description: 'Pastel crocante recheado com queijo derretido.',
    price: 10.0,
    color: '#10B981',
  },
  {
    id: 'm3',
    name: 'Hambúrguer FIAP',
    category: 'Lanche',
    description: 'Pão macio, carne suculenta e molho especial da casa.',
    price: 18.0,
    color: '#E91E63',
  },
  {
    id: 'm4',
    name: 'Suco Natural de Laranja',
    category: 'Bebida',
    description: 'Suco fresco espremido na hora, sem adição de açúcar.',
    price: 7.0,
    color: '#F97316',
  },
  {
    id: 'm5',
    name: 'Açaí com Granola',
    category: 'Sobremesa',
    description: 'Açaí gelado com granola crocante, mel e fruta fresca da estação.',
    price: 15.0,
    color: '#8B5CF6',
  },
  {
    id: 'm6',
    name: 'Wrap Vegetariano',
    category: 'Saudável',
    description: 'Wrap leve com vegetais frescos e molho de iogurte.',
    price: 16.5,
    color: '#0EA5E9',
  },
];
