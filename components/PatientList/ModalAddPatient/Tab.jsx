const Tab = ({ index, currentIndex, children }) => {
    return currentIndex === index ? children : <></>;
};

export default Tab;
