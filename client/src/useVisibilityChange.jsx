import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function useVisibilityChange(onChange, options = { triggerOnce: false }) {
    const { ref, inView } = useInView({
        threshold: 0.1, 
        triggerOnce: options.triggerOnce, 
    });

    useEffect(() => {
        onChange(inView);
    }, [inView, onChange]);

    return ref;
}

export default useVisibilityChange;
