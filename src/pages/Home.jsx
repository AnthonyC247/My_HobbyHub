import { useLocation } from "react-router-dom";
import Navbar_Login from "../components/Navbar_login";
import PostTile from "../components/PostTile";
import { useEffect, useState } from "react";
import Filters from "../components/Filters";
import SearchIcon from '@mui/icons-material/Search';

import "./Home.css";
const Home = ({navigate, supabase}) => {
    const userId = useLocation().state?.user_id;
    
    const [posts, setPosts] = useState({
        allPosts: [],
        displayedPosts: [],
    });
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*');
            if (error) {
                console.error(error);
                return;
            }

            const sortedData = sortByTime(data);
            setPosts((prevState) => ({
                ...prevState,
                allPosts: [...sortedData],
                displayedPosts: [...sortedData],
            }));
        }
        fetchPosts();
    }, []);

    const handleSort = (sortType) => {
        let sorted;
        if (sortType === 'time') {
            sorted = sortByTime(posts.displayedPosts);
        } else if (sortType === 'upvotes') {
            sorted = sortByUpvotes(posts.displayedPosts);
        }

        setPosts((prevState) => ({
            ...prevState,
            displayedPosts: [...sorted],
        
        }))
    }
    
    const sortByTime = (data) => {
        let sorted = [...data];
        sorted.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
        });
        return sorted;
    }

    const sortByUpvotes = (data) => {
        let sorted = [...data];
        sorted.sort((a, b) => {
            return b.upvotes - a.upvotes;
        });

        return sorted
    }

    // Update the posts shown when the search bar is used
    useEffect(() => {
        const filteredPosts = posts.allPosts.filter((post) => {
            return post.title.toLowerCase().includes(search);
        });

        // update the posts displayed
        if (filteredPosts.length === 0 || search === "") {
            setPosts((prevState) => ({
                ...prevState,
                displayedPosts: [...posts.allPosts],
            }));
        } else {
            setPosts((prevState) => ({
                ...prevState,
                displayedPosts: [...filteredPosts],
            }));
        }

    }, [search]);

    return (
        <div>
            <Navbar_Login 
                navigate={navigate} 
                supabase={supabase}
                userId= {userId}/>
            <div className="home-pg ">
                <Filters 
                    handlePopularity={() => handleSort('upvotes')}
                    handleTime={() => handleSort('time')}
                    handleSearch={(e) => setSearch(e.target.value.trim().toLowerCase())}
                    search={search}/>
                <div className="posts-container">
                    {posts.displayedPosts.map((post) => (
                        <>
                            <PostTile 
                                postId={post.id}
                                title={post.title}
                                image={post.image}
                                content={post.content}
                                user_id={userId}
                                upvotes={post.upvotes}
                                downvotes={post.downvotes}
                                timeCreated={post.created_at}
                                supabase={supabase}
                                navigate={navigate}
                                userId={userId}
                            />
                        </>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Home;