const isMobile = () => window.matchMedia('(max-width: 767px)').matches;
const isTablet = () => window.matchMedia('(max-width: 991px)').matches;

export { isMobile, isTablet };