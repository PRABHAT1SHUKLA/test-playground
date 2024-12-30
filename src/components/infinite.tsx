import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

type Item = {
  id: number;
  title: string;
};

const InfiniteScrollComponent: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]); // State to hold items
  const [page, setPage] = useState<number>(1); // State to track the current page
  const [loading, setLoading] = useState<boolean>(false); // State to show loading indicator
  const [hasMore, setHasMore] = useState<boolean>(true); // State to check if more items are available

  const observer = useRef<IntersectionObserver | null>(null); // Ref for observer
  const lastItemRef = useRef<HTMLDivElement | null>(null); // Ref for the last item

  // Fetch items (simulating an API call)
  const fetchItems = useCallback(async (page: number) => {
    setLoading(true);
    const newItems = Array.from({ length: 10 }, (_, i) => ({
      id: (page - 1) * 10 + i + 1,
      title: `Item ${(page - 1) * 10 + i + 1}`,
    }));

    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setItems((prev) => [...prev, ...newItems]);
    setHasMore(newItems.length > 0); // Simulate no more data if no new items
    setLoading(false);
  }, []);

  // Use Effect to fetch initial items
  useEffect(() => {
    fetchItems(page);
  }, [page, fetchItems]);

  // Intersection observer callback
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        setPage((prev) => prev + 1); // Increment page to fetch more items
      }
    },
    [hasMore, loading]
  );

  // Set up intersection observer
  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (lastItemRef.current) observer.current.observe(lastItemRef.current);
  }, [handleObserver]);

  // Memoized JSX to render items
  const renderedItems = useMemo(
    () =>
      items.map((item, index) => (
        <div
          key={item.id}
          ref={index === items.length - 1 ? lastItemRef : null} // Attach ref to the last item
          style={{ padding: '10px', borderBottom: '1px solid #ccc' }}
        >
          {item.title}
        </div>
      )),
    [items]
  );

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: '#f9f9f9', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Infinite Scroll</h2>
      <div style={{ border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden' }}>{renderedItems}</div>
      {loading && <p style={{ textAlign: 'center', marginTop: '10px' }}>Loading...</p>}
      {!hasMore && <p style={{ textAlign: 'center', marginTop: '10px' }}>No more items to load</p>}
    </div>
  );
};

export default InfiniteScrollComponent;