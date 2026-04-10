import React, { useEffect, useRef } from "react";
import "./index.css";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const onTouch = (e) => {
      if (e.touches && e.touches[0]) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    const render = () => {
      // simple linear interpolation for smooth lag
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.18;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    // start at center so it doesn't jump
    posRef.current.x = window.innerWidth / 2;
    posRef.current.y = window.innerHeight / 2;
    mouseRef.current.x = posRef.current.x;
    mouseRef.current.y = posRef.current.y;

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // optional: add hover class when over interactive elements
  useEffect(() => {
    const addHover = () => cursorRef.current && cursorRef.current.classList.add("cursor-hover");
    const removeHover = () => cursorRef.current && cursorRef.current.classList.remove("cursor-hover");

    // target common interactive elements
    const selector = "a, button, input, textarea, [data-cursor-hover]";
    const els = Array.from(document.querySelectorAll(selector));
    els.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      els.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}
