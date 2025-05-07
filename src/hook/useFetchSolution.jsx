import { useState, useEffect, useCallback } from 'react';

export default function useFetchSolution(initialUrl) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState(initialUrl);

    const load = useCallback(async () => {
        setData(null);
        if (!url) {
            setError("No URL provided");
            setLoading(false);
            return;
        } else {
            setError(null);
        }
        setLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setData(json);
        } catch (error) {
            setError(error.message);
            setData(null);
        } 
         setLoading(false);
        
    }, [url]);

    useEffect(() => {
        load();
    }, [load]);

    return { url, loading, error, data, load, setUrl };
}