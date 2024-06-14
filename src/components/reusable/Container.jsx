import React from 'react'

export default function Container({ children, maxWidth, maxHeight }) {

    const customMaxWidth = maxWidth || '800px';
    const customMaxHeight = maxHeight || '100vh';
    return (
        <>
            <div className={`p-50 max-w-[${customMaxWidth}] max-h-[${customMaxHeight}] bg-black`}>
                {children}
            </div>
        </>
    )
}
