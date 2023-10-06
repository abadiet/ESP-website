document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
window.addEventListener('resize', () => {
    document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
});