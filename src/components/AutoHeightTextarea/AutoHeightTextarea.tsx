import React, { FC, useEffect, useRef, useState} from "react";
import CSS from 'csstype';

const defaultStyle: CSS.Properties = {
    display: "block",
    overflow: "hidden",
    resize: "none",
    width: "100%",
    fontSize: (12 + (18 - 12) * (window.innerWidth - 200) / (1920 - 200)) + 'px',
};

interface AutoHeightTextareaProps {
    value: string
    onChange: (value: string) => void
    style: {}
    placeholder: string
    onKeyPress: (key: string) => void
} 

const AutoHeightTextarea:FC<AutoHeightTextareaProps> = ({ style = defaultStyle, value, onChange, placeholder, onKeyPress }) => {
    const textareaRef = useRef<null | HTMLTextAreaElement>(null);

    useEffect(() => {
        if(textareaRef.current) {
            textareaRef.current.style.height = "0px";
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = scrollHeight + "px";
        }
    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            style={style}
            value={value}
            placeholder={placeholder}
            onChange={e => onChange(e.target.value)}
            onKeyPress={e => onKeyPress(e.code)}
        />
    );
};

export default AutoHeightTextarea;