import React, { useState, useRef, useEffect, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { github } from '@uiw/codemirror-theme-github';
import { abcdef } from '@uiw/codemirror-theme-abcdef'
// import { eclipse } from '@uiw/codemirror-theme-eclipse';
// import { dracula  } from '@uiw/codemirror-theme-dracula ';
import { solarized } from '@uiw/codemirror-theme-solarized';
import { FaRegTrashAlt, FaPlayCircle } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";

import { BsFillTerminalFill } from "react-icons/bs";

function CodeEditor() {
    const [valueState, setValueState] = useState("console.log('hello world!');");
    const [logsState, setLogsState] = useState([])
    const [selectTheme, setSelectTheme] = useState('okaidia')
    const [themeStyle, setThemeStyle] = useState("dark")

    const themes = [{ name: "okaidia", type: "dark" }, { name: "github", type: "bright" }]
    const [settings, setSetting] = useState(
        {
            fontSize: 20
        }
    )

    const [toggleTerminal, setToggleTerminal] = useState(false)
    const logsRef = useRef([])
    const runCode = () => {
        var originalLog = console.log;
        var logs = [];
        var lastlogs = [];
        // console.log(value)
        console.log = function (...value) {
            //    console.log(value)
            // logsRef.current.push({ msg: value, type: 'info' });
            setLogsState(prev => {
                const newPrev = [{ msg: value, type: 'info' }, ...prev]
                // logsRef.current = [];
                return [...newPrev]
            })

            originalLog.apply(console, value);
            return value;
        };


        const intev = setInterval(() => {
            if (logsRef.current.length > 0) {
                setLogsState(prev => {
                    debugger
                    const newPrev = [...logsRef.current, ...prev]
                    logsRef.current = [];
                    return [...newPrev]
                })

            }

        }, 50);
        eval(valueState);
        console.log = originalLog
    };
    const onChange = useCallback((val, viewUpdate) => {
        console.log('val:', val);
        setValueState(val);
    }, []);

    useEffect(() => {
        const a = 12
        debugger
        console.log(logsState)
    }, [logsState])
    return (
        <div style={{
            background: themeStyle == "bright" ? "white" : '#272822',
            width: '100%', height: '100%', display: 'flex',
            flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'
        }}>
            <div style={{
                background: themeStyle == "bright" ? "rgba(240,240,240,1)" : null,
                width: '100%', height: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center',padding:10,
            }}>
                <div style={{display:'flex', justifyContent:'center', flexDirection:'row', gap:10}}>
                    <div onClick={() => setSetting(prev => {
                        prev.fontSize = prev.fontSize - 1 < 0 ? 0 : prev.fontSize - 1
                        return { ...prev }
                    })}><FaMinus size={20} color={themeStyle == "bright" ? "black" : "white"} /></div>
                    <div
                        onClick={() => setSetting(prev => {
                            prev.fontSize = prev.fontSize + 1 > 50 ? 50 : prev.fontSize + 1
                            return { ...prev }
                        })}
                    ><FaPlus size={20} color={themeStyle == "bright" ? "black" : "white"} /></div>
                </div>
                <select
                    style={{ width: 100 }}
                    value={selectTheme}
                    defaultValue={selectTheme}
                    onChange={e => {
                        if (e.target.value == "okaidia") {
                            setThemeStyle("dark")
                        } else {
                            setThemeStyle("bright")
                        }
                        setSelectTheme(e.target.value)
                    }}
                >
                    {themes.map(t => {
                        return <option value={t.name}>{t.type}</option>
                    })}
                </select>
            </div>
            <CodeMirror
                style={{ width: '100%', height: 'calc(50% - 90px)', fontSize: settings.fontSize }}
                value={valueState}
                height="100%"

                extensions={[javascript({ jsx: true })]}
                theme={selectTheme == "abcdef" ? abcdef : selectTheme == "okaidia" ? okaidia : selectTheme == "github" ? github : okaidia}
                onChange={onChange} />

            <div style={{ width: '100%', height: 40, position: 'relative', background: themeStyle == "bright" ? 'rgba(240,240,240,1)' : 'black', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div
                >

                    <div
                        style={{
                            position: 'absolute',
                            top: -20, left: 20,
                            borderRadius: 50,
                            // boxShadow: '0px 0px 13px 3px rgba(255,255,255,0.5)'
                        }}
                        // style={{ position: 'absolute',padding:0, margin:0,outline:'none', top: -20, left: 20,width:40,height:40, background:'white',display:'flex', justifyContent:'center', alignItems:'center', borderRadius:50, border:'2px solid black' }}
                        onClick={() => runCode()}>
                        <FaPlayCircle color={themeStyle == "bright" ? "black" : 'white'} size={45} />
                    </div>
                </div>
                <div style={{ display: 'flex', paddingRight: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: '100%', gap: 10 }}>
                    <div
                        //  style={{ position: 'absolute', top: 0, right: 0 }}
                        onClick={() => setToggleTerminal(prev => !prev)}
                    >
                        <BsFillTerminalFill color={!toggleTerminal ? "grey" : themeStyle == "bright" ? "black" : "white"} size={25} />
                    </div>
                    <div
                        //  style={{ position: 'absolute', top: 0, right: 0 }}
                        onClick={() => setLogsState([])}
                    >
                        <FaRegTrashAlt color={themeStyle == "bright" ? "black" : "white"} size={25} />
                    </div>

                </div>
            </div>
            {
                toggleTerminal &&
                <div style={{ display: 'flex', background: themeStyle == "bright" ? 'rgba(240,240,240,1)' : 'rgba(10,10,10,1)', width: '100%', height: 'calc(50% - 90px)', justifyContent: 'center', alignItems: 'center', }}>
                    <div style={{ width: '100%', padding: 15, background: themeStyle == "bright" ? 'rgba(240,240,240,1)' : 'rgba(10,10,10,1)', height: '100%', dispnterlay: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        {logsState.map(p => {
                            if (p.type == "info") {
                                return <div style={{ color: themeStyle == "bright" ? "black" : "white" }}>{p.msg[0]}</div>
                            }
                        })}
                    </div>
                </div>
            }
        </div >
    );
}
export default CodeEditor;