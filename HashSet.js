class HashSet {
  constructor(capacity = 16, loadFactor = 0.8) {
    this.buckets = [];
    this.entries = 0;
    this.capacity = capacity;
    this.loadFactor = loadFactor;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode * primeNumber + key.charCodeAt(i)) % 16;
    }

    return hashCode;
  }

  addEntry() {
    this.entries += 1;

    if (Math.ceil(this.capacity * this.loadFactor) < this.entries) {
      this.capacity *= 2;
    }
  }

  removeEntry() {
    this.entries -= 1;
  }

  set(key, value) {
    const index = this.hash(key);
    const nodeValue = key;

    if (!this.buckets[index]) {
      const list = new LinkedList();

      list.append(nodeValue);
      this.buckets[index] = list;
      this.addEntry();

      return;
    }

    if (this.has(key)) {
      this.buckets[index].list.forEach((node, i) => {
        if (Object.keys(node.value) === key) {
          this.buckets[index].delete(i);
          this.buckets[index].insert(
            new Node(nodeValue, this.buckets[index].list[i]?.nextNode || null),
            i
          );

          return;
        }
      });

      return;
    }

    this.buckets[index].append(nodeValue);
    this.addEntry();
  }

  get(key) {
    const index = this.hash(key);
    this.bucketIndexCheck(index);
    const bucket = this.buckets[this.hash(key)];

    for (i = 0; i < bucket.length; i++) {
      if (bucket[i].value === key) {
        return bucket[i].value;
      }
    }

    return null;
  }

  has(key) {
    const bucket = this.buckets[this.hash(key)];

    if (bucket) {
      for (let i = 0; i < bucket.list.length; i++) {
        if (bucket.list[i].value === key) {
          return true;
        }
      }
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);
    const isThereElement = false;
    const bucket = this.buckets[index];

    if (bucket.size === 1 || bucket.size === 0) {
      this.buckets[index] = undefined;
      this.removeEntry();
    }

    for (i = 0; i < bucket.length; i++) {
      if (bucket[i].value === key) {
        this.buckets[index].delete(i);
        this.removeEntry();
        isThereElement = true;
      }
    }

    return isThereElement;
  }

  length() {
    return this.entries;
  }

  clear() {
    this.buckets = [];
    this.entries = 0;
    this.capacity = 0;
  }

  keys() {
    return this.entry().map((ent) => ent[0]);
  }

  values() {
    return this.entry().map((entry) => entry[1]);
  }

  entry() {
    const entriesList = [];

    this.buckets.forEach((bucket) => {
      if (!!bucket.size) {
        bucket.list.forEach((node) => {
          entriesList.push(...Object.entries(node.value));
        });
      }
    });

    return entriesList;
  }
}
