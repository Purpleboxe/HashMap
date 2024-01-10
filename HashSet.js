class HashSet {
    constructor(capacity = 16, loadFactor = 0.75) {
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

    add (key) {
        const index = this.hash(key) % this.buckets.length;

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }

        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        const bucket = this.buckets[index];
        if (!bucket.includes(key)) {
            bucket.push(key);

            if (this.length() > this.buckets.length * this.loadFactor) {
                this.resize();
            }
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
                const newIndex = this.hash(item) % newCapacity;

                if (!newBuckets[newIndex]) {
                    newBuckets[newIndex] = [];
                }

                newBuckets[newIndex].push(item);
            }
        }

        this.buckets = newBuckets;
    }

    has (key) {
        const index = this.hash(key) % this.buckets.length;
        const bucket = this.buckets[index];

        if (bucket.includes(key)) {
            return true;
        } else {
            return false;
        }
    }

    remove (key) {
        const index = this.hash(key) % this.buckets.length;
        const bucket = this.buckets[index];

        if (bucket) {
            const keyIndex = bucket.indexOf(key);
            if (keyIndex !== -1) {
                bucket.splice(keyIndex, 1);
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
                result.push(...bucket);
            }
        }
        return result;
    }
}

// Example usage
const hashSet = new HashSet();

hashSet.add('poopy');
console.log(hashSet.has('poopy')); // true
console.log(hashSet.has('poop')); // false
hashSet.remove('poopy');
console.log(hashSet.has('poopy')); // false
hashSet.add('hello');
console.log(hashSet.length()); // 1
hashSet.clear();
console.log(hashSet.length()); // 0
hashSet.add('sophia');
hashSet.add('john');
console.log(hashSet.keys()); // ['sophia', 'john']