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

    set (key, value) {
        const index = this.hash(key) % this.buckets.length;

        // Index has to be in buckets length
        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bound");
        }

        const bucket = this.buckets[index];
        for (let i = 0; i < this.buckets.length; i++) {
            if (bucket[i].key === key) {
                bucket[i].value = value;
                return;
            }
        }

        bucket.push({key, value});

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

        for (const bucket of this.buckets) {
            const newIndex = this.hash(bucket.key) % newCapacity;

            newBuckets[newIndex].push(bucket);
        }

        this.buckets = newBuckets;
    }
}

const hash = new HashMap();