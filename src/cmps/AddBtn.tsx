import { useCallback } from "react";
import { useState } from "react";
import MenuPopup from './menuPopup'
export default function AddBtn({ onAddGroup, onAddNewItem }: { onAddGroup: () => void, onAddNewItem: () => void }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = useCallback(() => {
        // This useCallback is pretty unneseccary, because the only state here is - isMenuOpen
        // anyways, so doesnt help me save renders actually but i am cool.
        setIsMenuOpen(!isMenuOpen)
    }, [isMenuOpen])

    return (
        <section className="add-board-entity-button">
            <button onClick={onAddNewItem}>New Item</button>
            <button onClick={toggleMenu}>V</button>
            {isMenuOpen &&
                <MenuPopup toggleMenu={toggleMenu} body={
                    <div>
                        <button onClick={onAddGroup}>Add new group</button>
                        <button>Import items</button>
                    </div>
                } />
            }
        </section>
    )
}

