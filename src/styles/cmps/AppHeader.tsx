import { Link } from "react-router-dom"

export function AppHeader() {
    return (
        <header>
            <ul>
                <Link to='/'>Home</Link> |
                <Link to='/board'>Boards</Link> 
            </ul>
            
        </header>
    )
}
