import { useState, useEffect } from 'react';

export function useIsTablet() {
	const [isTablet, setIsTablet] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(('(max-width: 1024px)'))
		setIsTablet(mediaQuery.matches);

		const mediaHandler = (e: MediaQueryListEvent) => setIsTablet(e.matches);
		mediaQuery.addEventListener("change", mediaHandler);

		return () => mediaQuery.removeEventListener("change", mediaHandler);
	}, [])

	return isTablet;
}