import { useState, useEffect } from 'react';

export function useIsTablet() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(('(max-width: 1024px)'))
		setIsMobile(mediaQuery.matches);

		const mediaHandler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
		mediaQuery.addEventListener("change", mediaHandler);

		return () => mediaQuery.removeEventListener("change", mediaHandler);
	}, [])

	return isMobile;
}