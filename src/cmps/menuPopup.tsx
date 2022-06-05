import { LegacyRef, ReactElement, useRef } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

export default function MenuPopup({ body, toggleMenu }: { body: ReactElement, toggleMenu: () => void }) {
    const popupRef = useRef<HTMLElement | null>(null)

    useOnClickOutside(popupRef, toggleMenu)

    return (
        <section ref={popupRef} className="menu-popup">
            {body && <main>{body}</main>}
        </section>
    )
}