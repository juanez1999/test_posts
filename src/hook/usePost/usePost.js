import {useEffect, useState} from 'react';
import { BASE_URL } from '../../utils/baseConfig';

export default function usePosts() {
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(async () => {
        if(loading) return;

        try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}posts?page=${page}`);
        const {data, meta: {last_page: lastPage}} = await response.json();

        if(lastPage !== totalPages) setTotalPages(lastPage);
        setPosts(data);
        } catch(error) {
        console.error(error.message);
        } finally {
        setLoading(false);
        }
    }, [page]);

    return {page, setPage, posts, totalPages};
}