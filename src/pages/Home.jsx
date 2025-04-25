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
    const [loading, setLoading] = useState(true); // 👈 added loading state

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true); // 👈 show loading spinner
            const { data, error } = await supabase.from('posts').select('*');
            if (error) {
                console.error(error);
            } else {
                const sortedData = sortByTime(data);
                setPosts({
                    allPosts: sortedData,
                    displayedPosts: sortedData,
                });
            }
            setLoading(false); // 👈 hide loading spinner
        };

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
        }));
    };

    const sortByTime = (data) => {
        return [...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    };

    const sortByUpvotes = (data) => {
        return [...data].sort((a, b) => b.upvotes - a.upvotes);
    };

    useEffect(() => {
        const filteredPosts = posts.allPosts.filter((post) =>
            post.title.toLowerCase().includes(search)
        );

        setPosts((prevState) => ({
            ...prevState,
            displayedPosts: search === "" ? [...posts.allPosts] : [...filteredPosts],
        }));
    }, [search]);

    return (
        <div>
            <Navbar_Login 
                navigate={navigate} 
                supabase={supabase}
                userId={userId}
            />

            <div className="home-pg">
                <Filters 
                    handlePopularity={() => handleSort('upvotes')}
                    handleTime={() => handleSort('time')}
                    handleSearch={(e) => setSearch(e.target.value.trim().toLowerCase())}
                    search={search}
                />

                <div className="posts-container">
                    {loading ? (
                        <div className="spinner"></div> // 👈 spinner or "Loading..." text
                    ) : (
                        posts.displayedPosts.map((post) => (
                            <PostTile 
                                key={post.id}
                                postId={post.id}
                                title={post.title}
                                content={post.content}
                                image={post.image}
                                user_id={userId}
                                upvotes={post.upvotes}
                                downvotes={post.downvotes}
                                timeCreated={post.created_at}
                                supabase={supabase}
                                navigate={navigate}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;

