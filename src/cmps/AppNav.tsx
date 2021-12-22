import { Link } from "react-router-dom"

export function AppNav() {
    return (
        <nav className="flex flex-col">
            <ul className=" flex flex-col">
                <Link to='/'>Home</Link> |
                <Link to='/board'>Boards</Link> 
            </ul>
            
        </nav>
    )
}
