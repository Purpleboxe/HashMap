class HashMap {
    constructor (capacity = 16, loadFactor = 0.75) {
        this.buckets = new Array(capacity);
        this.loadFactor = loadFactor;
    }

    hash (s) {
        let hashCode = 0;
        for (let i = 0; i < s.length; i++) {
            hashCode += s.charCodeAt(i);
        }

        return hashCode;
    }

    set(key, value) {
        const index = this.hash(key) % this.buckets.length;
    
        // Index has to be in buckets length
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
    
        if (!this.buckets[index]) {
            this.buckets[index] = []; // Initialize the bucket if it's undefined
        }
    
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket[i].value = value;
                return;
            }
        }
    
        bucket.push({ key, value });
    
        if (this.size() > this.buckets.length * this.loadFactor) {
            this.resize();
        }
    }

    size () {
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
}

const hash = new HashMap();

hash.set('poopy', 'key');
console.log(hash.get('poopy'));
console.log(hash.has('poopy'));
console.log(hash.has('poop'));