class HashMap {
    constructor (capacity = 16, loadFactor = 0.75) {
        this.buckets = new Array(capacity);
        this.capacity = capacity;
        this.loadFactor = loadFactor;
    }

    hash (s) {
        let hashCode = 0;
        for (let i = 0; i < s.length; i++) {
            hashCode += s.charCodeAt(i);
        }

        return hashCode;
    }

    set (key, value) {
        const index = this.hash(key) % this.buckets.length;
    
        // Index has to be in buckets length
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
    
        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }
    
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket[i].value = value;
                return;
            }
        }
    
        bucket.push({ key, value });
    
        if (this.length() > this.buckets.length * this.loadFactor) {
            this.resize();
        }
    }

    length () {
        let count = 0;
        for (const bucket of this.buckets) {
            if (bucket) {
                count += bucket.length;
            }
        }

        return count;
    }

    resize () {
        const newCapacity = this.buckets.length * 2;
        const newBuckets = new Array(newCapacity);

        for (const item of this.buckets) {
            if (item) {
                const newIndex = this.hash(item.key) % newCapacity;

                if (!newBuckets[newIndex]) {
                    newBuckets[newIndex] = [];
                }
    
                newBuckets[newIndex].push(item);
            }
        }

        this.buckets = newBuckets;
    }

    get (key) {
        const index = this.hash(key) % this.buckets.length;
        const bucket = this.buckets[index];

        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i].key === key) {
                    return bucket[i].value;
                }
            }
        }
        
        return null;
    }

    has (key) {
        const index = this.hash(key) % this.buckets.length;
        const bucket = this.buckets[index];

        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i].key === key) {
                    return true;
                }
            }
        }

        return false;
    }

    remove (key) {
        const index = this.hash(key) % this.buckets.length;
        const bucket = this.buckets[index];
    
        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i].key === key) {
                    bucket.splice(i, 1);
                    return;
                }
            }
        }
    }

    clear () {
        this.buckets = new Array(this.capacity);
    }

    keys () {
        const result = [];
        for (const bucket of this.buckets) {
            if (bucket) {
                for (const item of bucket) {
                    result.push(item.key);
                }
            }
        }

        return result;
    }

    values () {
        const result = [];
        for (const bucket of this.buckets) {
            if (bucket) {
                for (const item of bucket) {
                    result.push(item.value);
                }
            }
        }

        return result;
    }

    entries () {
        const result = [];
        for (const bucket of this.buckets) {
            if (bucket) {
                for (const item of bucket) {
                    result.push([item.key, item.value]);
                }
            }
        }

        return result;      
    }
}

const hash = new HashMap();

hash.set('poopy', 'key');
console.log(hash.get('poopy')); // key
console.log(hash.has('poopy')); // true
console.log(hash.has('poop')); // false
hash.remove('poopy');
console.log(hash.has('poopy')); // false
hash.set('hello', 'hi');
console.log(hash.length()); // 1
hash.clear();
console.log(hash.length()); // 0
hash.set('sophia', 'name')
hash.set('john', 'name2');
console.log(hash.keys()); // [ 'sophia', 'john' ]
console.log(hash.values()); // [ 'name', 'name2' ]
console.log(hash.entries()); // [ [ 'sophia', 'name' ], [ 'john', 'name2' ] ]