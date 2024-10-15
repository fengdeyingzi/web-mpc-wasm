import { useEffect, MutableRefObject, useState } from "react";


export function useClientHeight(
    ref: MutableRefObject<HTMLElement>,
    callback: (height: number) => void = null
) {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const resizeObserver = new ResizeObserver((entries) => {
                const newHeight = entries[0].target.clientHeight;
                setHeight(newHeight);
                if (callback) {
                    callback(newHeight);
                }
            });
            resizeObserver.observe(ref.current);
            return () => resizeObserver.disconnect();
        }
    }, [ref]);

    return height;
}
