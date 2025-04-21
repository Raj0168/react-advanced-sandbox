import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const usePaginationFetch = (url, page, isInfiniteScroll) => {
    const [data, setData] = useState([]);
    const [paginationInfo, setPaginationInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`${url}?page=${page}`);
            const { results, info } = response.data;

            if (page === 1) {
                setData(results);
            } else {
                setData(prev => isInfiniteScroll ? [...prev, ...results] : results);
            }
            setPaginationInfo(info);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [url, page, isInfiniteScroll]);

    return { data, loading, error, paginationInfo };
}

export default usePaginationFetch;