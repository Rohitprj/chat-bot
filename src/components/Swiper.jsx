"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const pages = ["/", "/book", "/follow", "/meet", "/chat"];

export default function SwipeNavigator({ childrenMap, children }) {
    const router = useRouter();
    const pathname = usePathname();

    const x = useMotionValue(0);
    const startX = useRef(0);
    const ignoreStartRef = useRef(false);
    const directionRef = useRef(null);
    const normalize = (p) => {
        if (!p) return p;
        if (p === "/") return "/";
        return p.replace(/\/$/, "");
    };

    const isPointerInsideIgnoreArea = (clientX, clientY) => {
        try {
            if (typeof document === 'undefined') return false;
            const els = document.querySelectorAll('[data-swipe-ignore]');
            for (const el of els) {
                const r = el.getBoundingClientRect();
                if (clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom) {
                    return true;
                }
            }
        } catch (err) {
        }
        return false;
    };

    const [currentPath, setCurrentPath] = useState(normalize(pathname));
    const [nextPath, setNextPath] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const currentIndex = pages.indexOf(currentPath);

    const getNextIndex = (dir) => {
        if (currentIndex === -1) return null;
        if (dir === "left" && currentIndex < pages.length - 1) return currentIndex + 1;
        if (dir === "right" && currentIndex > 0) return currentIndex - 1;             
        return null;
    };

    const handleSwipeEnd = () => {
        const nextIndex = getNextIndex(directionRef.current);
        const screenWidth = window.innerWidth;
        const currentX = x.get();
        const absDelta = Math.abs(currentX);
        const threshold = screenWidth * 0.3;

        if (absDelta < threshold || nextIndex === null) {
            animate(x, 0, {
                type: "spring",
                stiffness: 250,
                damping: 10,  
                mass: 0.1,    
            });
            setNextPath(null);
            directionRef.current = null;
            return;
        }

        setIsTransitioning(true);
        const target = directionRef.current === "left" ? -screenWidth : screenWidth;

        animate(x, target, { duration: 0.15, ease: "easeInOut" }).then(() => {
            const nextPagePath = pages[nextIndex];
            setCurrentPath(nextPagePath);
            router.push(nextPagePath);
            x.set(0);
            setNextPath(null);
            directionRef.current = null;
            setIsTransitioning(false);
        });
    };


    const handleTouchStart = (e) => {
        if (isTransitioning) return;
       let target = e.target;
    while (target && target.nodeType !== 1) target = target.parentNode;
   
    

    const touch = e.touches && e.touches[0];
    if (touch && isPointerInsideIgnoreArea(touch.clientX, touch.clientY)) {
        ignoreStartRef.current = true;
        return;
    }

    ignoreStartRef.current = false;
    startX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        if (isTransitioning) return;
               if (ignoreStartRef.current) return;
        if (currentIndex === -1) return;

        const delta = e.touches[0].clientX - startX.current;

        directionRef.current = delta < 0 ? "left" : "right";

        if ((currentIndex === 0 && directionRef.current === "right") ||
            (currentIndex === pages.length - 1 && directionRef.current === "left")) return;

        const nextIndex = getNextIndex(directionRef.current);
        if (nextIndex !== null) setNextPath(pages[nextIndex]);

        x.set(delta);
    };

    const handleTouchEnd = () => handleSwipeEnd();

    useEffect(() => {
        return () => {
            ignoreStartRef.current = false;
        };
    }, []);

    useEffect(() => {
        let isDown = false;

        const handleMouseDown = (e) => {
            if (isTransitioning) return;
            isDown = true;
            let target = e.target;
            while (target && target.nodeType !== 1) target = target.parentNode;
            if (isPointerInsideIgnoreArea(e.clientX, e.clientY)) {
                isDown = false;
                return;
            }

            startX.current = e.clientX;
        };

        const handleMouseMove = (e) => {
            if (!isDown || isTransitioning) return;
            if (ignoreStartRef.current) return;
            if (currentIndex === -1) return;

            const delta = e.clientX - startX.current;
            directionRef.current = delta < 0 ? "left" : "right";

            if ((currentIndex === 0 && directionRef.current === "right") ||
                (currentIndex === pages.length - 1 && directionRef.current === "left")) return;

            const nextIndex = getNextIndex(directionRef.current);
            if (nextIndex !== null) setNextPath(pages[nextIndex]);

            x.set(delta);
        };

        const handleMouseUp = () => {
            if (!isDown || isTransitioning) return;
            isDown = false;
            ignoreStartRef.current = false;
            handleSwipeEnd();
        };

    const touchOpts = { passive: true, capture: true };
    const mouseOpts = { capture: true };

    const handleNativeDragStart = (e) => {
        if (isPointerInsideIgnoreArea(e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX), e.clientY || (e.touches && e.touches[0] && e.touches[0].clientY))) {
            e.preventDefault();
        }
    };

    const handleWindowDragEnd = () => {
        isDown = false;
        ignoreStartRef.current = false;
    };

    window.addEventListener("touchstart", handleTouchStart, touchOpts);
    window.addEventListener("touchmove", handleTouchMove, touchOpts);
    window.addEventListener("touchend", handleTouchEnd, touchOpts);

    window.addEventListener("mousedown", handleMouseDown, mouseOpts);
    window.addEventListener("mousemove", handleMouseMove, mouseOpts);
    window.addEventListener("mouseup", handleMouseUp, mouseOpts);

    window.addEventListener('dragstart', handleNativeDragStart, true);
    window.addEventListener('mouseleave', handleWindowDragEnd, true);
    window.addEventListener('dragend', handleWindowDragEnd, true);

        return () => {
            window.removeEventListener("touchstart", handleTouchStart, touchOpts);
            window.removeEventListener("touchmove", handleTouchMove, touchOpts);
            window.removeEventListener("touchend", handleTouchEnd, touchOpts);

            window.removeEventListener("mousedown", handleMouseDown, mouseOpts);
            window.removeEventListener("mousemove", handleMouseMove, mouseOpts);
            window.removeEventListener("mouseup", handleMouseUp, mouseOpts);
            window.removeEventListener('dragstart', handleNativeDragStart, true);
            window.removeEventListener('mouseleave', handleWindowDragEnd, true);
            window.removeEventListener('dragend', handleWindowDragEnd, true);
        };
    }, [currentPath, isTransitioning]);

    useEffect(() => {
        if (pathname && pathname !== currentPath) setCurrentPath(pathname);
    }, [pathname]);

    const nextX = useTransform(x, (v) => {
        const w = typeof window !== "undefined" ? window.innerWidth : 0;
        if (!directionRef.current) return w;
        return directionRef.current === "left" ? w + v : -w + v;
    });

    return (
        <div style={{ position: "relative", overflow: "hidden", width: "100%", minHeight: "100vh" }}>
            {nextPath && (
                <motion.div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        x: nextX,
                    }}
                >
                    {childrenMap[nextPath]}
                </motion.div>
            )}

            <motion.div
                style={{
                    x,
                    position: "relative",
                    width: "100%",
                    minHeight: "100vh",
                }}
            >
                {childrenMap[currentPath] ?? children}
            </motion.div>
        </div>
    );
}
