class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor() {
    this.list = [];
  }

  get size() {
    return this.list.length;
  }

  get head() {
    return this.list[0];
  }

  get tail() {
    return this.list[this.size - 1];
  }

  append(value) {
    const newNode = new Node(value);

    if (this.tail) {
      this.tail.nextNode = newNode;
    }

    this.list.push(newNode);
  }

  prepend(value) {
    this.list.unshift(new Node(value, this.head));
  }

  at(index) {
    return this.list[index];
  }

  pop() {
    return this.list.pop();
  }

  contains(value) {
    return this.list.filter((node) => node.value === value).length > 0;
  }

  find(value) {
    return !!this.list.find(value);
  }

  toString() {
    const listString = this.list.reduce(
      (acc, node) => `${acc} ( ${node.value} ) ->`,
      ""
    );

    return `${listString} null`;
  }

  insert(value, index) {
    this.list.splice(index, 0, value);
  }

  delete(index) {
    this.list.splice(index, 1);
  }
}

export { LinkedList, Node };
