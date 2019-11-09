const scrollPage = () => {
  const height = document.documentElement.offsetHeight;
  const scroll = {
    top: height,
    left: 0,
    behavior: 'smooth',
  };

  window.scrollTo(scroll);
};

export default scrollPage;
