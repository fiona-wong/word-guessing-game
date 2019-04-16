const ConditionalComponent = ({ shouldRender, children }) => {
    let component = null;
    if (shouldRender) {
        component = children;
    }
    return component;
};

export default ConditionalComponent;
