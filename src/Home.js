import Feed from './Feed';
import DataContext from "./context/DataContext";
import { useContext } from 'react';

const Home = () => {
    const {posts} = useContext(DataContext);
    return (
        <main className="Home">
            {posts.length ? (
                <Feed posts={posts} />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    No posts to display.
                </p>
            )}
        </main>
    )
}

export default Home