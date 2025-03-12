// exercise 1

export type Item = { id: string, title: string; };

let data: Readonly<Item[]> = Object.freeze([]);

export function get_items(): readonly Item[] {
    return data;
}

export function add_item(new_item: Item): boolean {
  if (data.find(item => item.id === new_item.id)) {
    return false;
  }
  // let data allows us to re-assign.
  // since data is read only, data.push(new_item) wont work
  data = [...data, new_item];
  return true;
}

export function update_item_title_by_id(id: string, new_title: string): boolean {
    const item = data.find(item => item.id === id);

    if (!item) {
        return false;
    }
    // item.id === id ? (item.title = new_title, item) : item); not ideal in immutable arrays
    data = data.map(item =>
      item.id === id ? { ...item, title: new_title } : item
    );

    return true;
}

export function delete_item_by_id(id: string): boolean {
    const item = data.find(item => item.id === id);

    if (!item) {
        return false;
    }else {
        data = data.filter(item => item.id !== id);
    }
    return true;
}

export function get_item_title_by_id(id: string): string {
    const item = data.find(item => item.id === id);

    return item ? item.title : 'Item not found';
}

console.log(get_items()); // []
console.log(add_item({ id: '1', title: 'item 1' })); // true
console.log(add_item({ id: '2', title: 'item 2' })); // true
console.log(get_items()); // [ { id: '1', title: 'item 1' }, { id: '2', title: 'item 2' } ]
console.log(update_item_title_by_id('1', 'new item 1')); // true
console.log(get_items()); // [ { id: '1', title: 'new item 1' }, { id: '2', title: 'item 2' } ]
console.log(delete_item_by_id('2')); // true
console.log(get_item_title_by_id('1')); // new item 1
console.log(get_item_title_by_id('2')); // Item not found
console.log(get_items()); // [ { id: '1', title: 'new item 1' } ]
console.log(add_item({ id: '1', title: 'item 1' })); // false
