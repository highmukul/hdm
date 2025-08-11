import { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase/config';
import { collection, query, onSnapshot, where, orderBy, limit, startAfter, DocumentData, QueryDocumentSnapshot, QueryConstraint } from 'firebase/firestore';

interface Filters {
    category?: string;
    sortBy?: string;
    search?: string;
    isFeatured?: boolean;
    priceRange?: number[];
}

const PAGE_SIZE = 9;

export const useProducts = (filters: Filters, storeId?: string) => {
    const [products, setProducts] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
    const [hasMore, setHasMore] = useState(true);

    const buildQuery = useCallback((startAfterDoc: QueryDocumentSnapshot<DocumentData> | null = null) => {
        let productsQuery = collection(db, 'products');
        const { category, sortBy, search, isFeatured, priceRange } = filters;
        
        let queries: QueryConstraint[] = [];

        if (storeId) queries.push(where('storeId', '==', storeId));
        if (category) queries.push(where('category', '==', category));
        if (search) {
            queries.push(where('name', '>=', search));
            queries.push(where('name', '<=', search + '\uf8ff'));
        }
        if(isFeatured) queries.push(where('isFeatured', '==', true));
        if(priceRange) queries.push(where('salePrice', '<=', priceRange[1]));

        if (sortBy === 'price-asc') {
            queries.push(orderBy('salePrice', 'asc'));
        } else if (sortBy === 'price-desc') {
            queries.push(orderBy('salePrice', 'desc'));
        } else {
            queries.push(orderBy('createdAt', 'desc'));
        }
        
        queries.push(limit(PAGE_SIZE));

        if (startAfterDoc) {
            queries.push(startAfter(startAfterDoc));
        }

        return query(productsQuery, ...queries);
    }, [filters, storeId]);

    useEffect(() => {
        setLoading(true);
        setProducts([]);
        setLastDoc(null);
        setHasMore(true);

        const q = buildQuery();

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(fetchedProducts);
            setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
            setHasMore(snapshot.docs.length === PAGE_SIZE);
            setLoading(false);
        }, (err) => {
            console.error(err);
            setError('Failed to load products.');
            setLoading(false);
        });

        return () => unsubscribe();
    }, [filters, buildQuery]);

    const loadMore = useCallback(async () => {
        if (!lastDoc || !hasMore) return;

        setLoading(true);

        const q = buildQuery(lastDoc);
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(prev => [...prev, ...newProducts]);
            setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
            setHasMore(snapshot.docs.length === PAGE_SIZE);
            setLoading(false);
        }, (err) => {
            console.error(err);
            setError('Failed to load more products.');
            setLoading(false);
        });

        return () => unsubscribe();
    }, [lastDoc, hasMore, buildQuery]);

    return { products, loading, error, hasMore, loadMore };
};
