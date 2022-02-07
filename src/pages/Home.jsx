import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Box, Fab, Pagination } from '@mui/material';
import PostCard from '../components/PostCard';
import usePosts from '../hook/usePost/usePost';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    let navigate = useNavigate();
    const userId = useSelector(state => state.user)

    useEffect(() => {
        userId == null ? (navigate('/login')) : console.log(userId); 
    },[userId]);

    const {page, setPage, totalPages, posts} = usePosts();

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    }
    const handleCreatePost = () => {
        navigate('/post/new');
    }
    
    return <Box sx={{
            width: 800,
            minWidth: 320,
            maxWidth: '100vw',
            margin: '40px auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            padding: 2
        }}>
        {posts.map(data => <PostCard data={data}/>)}
        <Pagination 
            count={totalPages} 
            variant='outlined' 
            page={page} 
            onChange={handlePageChange}
            color='primary'
            sx={{
            margin: '24px auto'
            }}
        />

        <Fab 
            aria-label='create post'
            sx={{
            position: 'fixed',
            bottom: 16,
            right: 16
            }}
            color="primary"
            onClick={handleCreatePost}
        >
            <AddIcon />
        </Fab>
    </Box>
};
