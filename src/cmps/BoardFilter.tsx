import { useCallback, useEffect, useMemo, useRef } from "react";
import { useFormRegister } from "../hooks/useFormRegister";
import { BoardFilterBy } from "../models/boardFilterBy.model";
import { utilService } from "../services/util.service";

export default function BoardFiter({ filter }: { filter: (filterBy: BoardFilterBy) => void }) {
    // Better to use useMemo here over useCallback because it will only reassign filterDebounced value when dep changes
    const filterDebounced = useMemo(
        () => utilService.debounce(filter, 300)
        , []);

    const [filterBy, register] = useFormRegister({ title: '' }, filterDebounced)


    return (
        <form onSubmit={(ev) => { ev.preventDefault(); filter(filterBy) }}>
            <input type="text" placeholder="Fitler" {...register('title')} />
        </form>
    )
}