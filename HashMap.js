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
}

const hash = new HashMap();