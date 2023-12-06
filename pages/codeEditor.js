import React, { useState, useRef, useEffect, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { FaRegTrashAlt, FaPlayCircle } from "react-icons/fa";


import { BsFillTerminalFill } from "react-icons/bs";

function CodeEditor() {
    const [valueState, setValueState] = useState("console.log('hello world!');");
    const [logsState, setLogsState] = useState([])
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
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
            <CodeMirror
                style={{ width: '100%', height: '50%' }}
                value={valueState}
                height="100%"
                extensions={[javascript({ jsx: true })]}
                theme={okaidia}
                onChange={onChange} />
            <div style={{ width: '100%', height: 40, position: 'relative', background: 'black', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                <div
                    style={{ borderRadius: 50, boxShadow: '0px 0px 13px 3px rgba(255,255,255,0.5)' }}
                    // style={{ position: 'absolute',padding:0, margin:0,outline:'none', top: -20, left: 20,width:40,height:40, background:'white',display:'flex', justifyContent:'center', alignItems:'center', borderRadius:50, border:'2px solid black' }}
                    onClick={() => runCode()}>
                    <FaPlayCircle color={'white'} size={45} />
                </div>
                <div style={{ display: 'flex', paddingRight: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: '100%', gap: 10 }}>
                    <div
                        //  style={{ position: 'absolute', top: 0, right: 0 }}
                        onClick={() => setToggleTerminal(prev => !prev)}
                    >
                        <BsFillTerminalFill color={"white"} size={25} />
                    </div>
                    <div
                        //  style={{ position: 'absolute', top: 0, right: 0 }}
                        onClick={() => setToggleTerminal(prev => !prev)}
                    >
                        <FaRegTrashAlt color={"white"} size={25} />
                    </div>

                </div>
            </div>
            {toggleTerminal &&
                <div style={{ display: 'flex', background: 'rgba(210,210,210,1)', width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center', }}>
                    <div style={{ width: '100%', background: 'rgba(230,230,230,1)', height: '100%', dispnterlay: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        {logsState.map(p => {
                            if (p.type == "info") {
                                return <div>{p.msg[0]}</div>
                            }
                        })}
                    </div>
                </div>
            }
        </div>
    );
}
export default CodeEditor;