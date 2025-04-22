import { useEffect, useState } from "react"
import axiosInstance from "../utils/axiosInstance";
import { useSnackbar } from "./useSnackbar";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(url);
                setData(response?.data);
                showSnackbar("Data fetched successfully!", "success");
            } catch (err) {
                setError(err.message || 'Something went wrong');
                showSnackbar("Error in fetching data.", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
}

export default useFetch;