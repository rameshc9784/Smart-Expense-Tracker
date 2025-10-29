import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
    const [state, setState] = useState(() => {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : initialValue;
        } catch (err) {
            console.error(err);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch (err) {
            console.error(err);
        }
    }, [key, state]);

    return [state, setState];
}
