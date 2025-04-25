import './NotFound.css';
import Navbar_Login from '../components/Navbar_login';

const NotFound = ({navigate, supabase}) => {
    return (
        <>
            <Navbar_Login 
                navigate={navigate} 
                supabase={supabase} />
            <div className="not-found-container row">
                <div className="txt-container">
                    <h1>404</h1>
                    <h2>Page Not Found</h2>
                    <p>Oops! Looks like the Dice Goblins got you because we can't find the page you're looking for</p>
                </div>
                <img 
                    src="https://i0.wp.com/nerdarchy.com/wp-content/uploads/2020/05/goblin-loot.png?fit=1843%2C2762&ssl=1" 
                    alt="Goblin holding a D20"
                    className='dice-goblin' />
            </div>
        </>
    );
};

export default NotFound;