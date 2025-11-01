import React from 'react';

function Xdebug({ size, color }: { size: number; color: string }) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
                top: 0,
                left: 0,
                position: 'absolute',
                pointerEvents: 'none',
                outline: `${size}px dashed ${color}`,
            }}
        >
            <line
                x1="0"
                y1="0"
                x2="100"
                y2="100"
                stroke={color}
                strokeWidth={size}
                vectorEffect="non-scaling-stroke"
            />
            <line
                x1="0"
                y1="100"
                x2="100"
                y2="0"
                stroke={color}
                strokeWidth={size}
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
}

export function DebugLayout({ children }: { children: React.JSX.Element }) {
    const debug: boolean | number = children?.props?.['data-debug'];
    const size = typeof debug === 'number' ? debug : 3;
    if (!debug) return <>{children}</>;

    const debugChildren = <Xdebug size={size} color="#f005" />;
    const newChildren = React.cloneElement(children, {
        ...children.props,
        children: children.props.children ? (
            <>
                {children.props.children}
                {debugChildren}
            </>
        ) : (
            debugChildren
        ),
        style: { ...children.props.style, position: 'relative' },
    });
    return newChildren;
}