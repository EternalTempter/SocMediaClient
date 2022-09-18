import { useEffect, useRef } from "react";

export const useObserver = (ref, isLoading, totalPages, page, callback) => {
    const observer = useRef<IntersectionObserver>();
    useEffect(() => {
        if(isLoading) return;
        if(totalPages === null) return
        if(observer.current) observer.current.disconnect(); 
        var options = {
            root: document.querySelector('.newsPageWrap'),
        }
        var cb = function(entries, observer) {
            if(entries[0].isIntersecting && (totalPages !== null) && (page < totalPages)) {
                callback();
            }
        };
        observer.current = new IntersectionObserver(cb, options);
        observer.current.observe(ref.current!)
    }, [isLoading, totalPages]);
}
