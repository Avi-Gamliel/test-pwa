import React, { useLayoutEffect, useState, useRef, useEffect, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { github } from '@uiw/codemirror-theme-github';
import { abcdef } from '@uiw/codemirror-theme-abcdef'
import { createTheme } from '@uiw/codemirror-themes';
// import { eclipse } from '@uiw/codemirror-theme-eclipse';
// import { dracula  } from '@uiw/codemirror-theme-dracula ';
import { solarized } from '@uiw/codemirror-theme-solarized';
import { FaRegTrashAlt, FaPlayCircle } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";
import { tags as t } from '@lezer/highlight';
import { BsFillTerminalFill } from "react-icons/bs";
import { undo, historyField } from "@codemirror/commands"
function CodeEditor() {
    const [dimension, setDimension] = useState({ height: 0, width: 0 })
    const [valueState, setValueState] = useState("console.log('hello world!');");
    const [logsState, setLogsState] = useState([])
    const [drag, setDrag] = useState(false)
    const [selectTheme, setSelectTheme] = useState('okaidia')
    const [themeStyle, setThemeStyle] = useState("dark")
    const codeMirrorRef = useRef()
    const deferredPrompt = useRef()
    const [heightTerminal, setHeightTerminal] = useState()
    // console.log(navigator)
    const themes = [{ name: "okaidia", type: "dark" }, { name: "github", type: "bright" }]
    const [settings, setSetting] = useState(
        { fontSize: 16 }
    )
    const myTheme = createTheme({
        theme: 'dark',
        settings: {
            background: '#0f0e15',
            backgroundImage: '',
            foreground: '#75baff',
            caret: '#5d00ff',
            selection: '#036dd626',
            selectionMatch: '#036dd626',
            lineHighlight: '#0f0e15',
            gutterBorder: '1px solid #ffffff10',
            gutterBackground: '#0f0e15',
            gutterForeground: '#545454',
        },
        styles: [
            { tag: t.comment, color: '#545454' },
            { tag: t.variableName, color: '#eff' },
            { tag: [t.string, t.special(t.brace)], color: '#c3e88d' },
            { tag: t.number, color: '#ff5370' },
            { tag: t.bool, color: '#5c6166' },
            { tag: t.null, color: '#5c6166' },
            { tag: t.keyword, color: '#c792ea' },
            { tag: t.operator, color: '#89ddff' },
            { tag: t.className, color: '#5c6166' },
            { tag: t.definition(t.typeName), color: '#82aaff' },
            { tag: t.typeName, color: '#f07178' },
            { tag: t.angleBracket, color: '#5c6166' },
            { tag: t.tagName, color: '#ff5370' },
            { tag: t.attributeName, color: '#c792ea' },
        ],
    });

    console.log(dimension)
    const [toggleTerminal, setToggleTerminal] = useState(true)
    const logsRef = useRef([])
    const [statusInstall, setStatusInstall] = useState(false)
    // let deferredPrompt;
    useLayoutEffect(() => {
        // const getInstallStatus = async () => {
        //     const relatedApps = await navigator.getInstalledRelatedApps();
        //     console.log(relatedApps
        //     )
        //     return relatedApps.length > 0;
        // }
        // getInstallStatus().then(res => {
        console.log(window)
        setDimension({ height: window.innerHeight, width: window.innerWidth })
        setHeightTerminal((window.innerHeight - (50 * 2) - 40) / 2)
        window.addEventListener("DOMContentLoaded", event => {
            // we can move only if we are not in a browser's tab
            isBrowser = matchMedia("(display-mode: browser)").matches;
            if (!isBrowser) {
                window.moveTo(16, 16);
                window.resizeTo(800, 600);
            }
        });
        window.addEventListener('appinstalled', () => {
            // If visible, hide the install promotion
            setStatusInstall(true)
            hideInAppInstallPromotion();
            // Log install to analytics
            console.log('INSTALL: Success');
        });
        // })
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevents the default mini-infobar or install dialog from appearing on mobile
            e.preventDefault();
            // Save the event because you'll need to trigger it later.
            deferredPrompt.current = e;
            // Show yourcurrent. customized install prompt for your PWA
            // Your own UI doesn't have to be a single element, you
            // can have buttons in different locations, or wait to prompt
            // as part of a critical journey.
            showInAppInstallPromotion();
        });



    }, [])


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
        try {
            eval(valueState);
        } catch (error) {

        }
        console.log = originalLog
    };
    const onChange = useCallback((val, viewUpdate) => {
        setValueState(val);
    }, []);

    useEffect(() => {
        const a = 12


    }, [logsState])
    useEffect(() => {
        console.log(statusInstall)
    }, [statusInstall])
    return (
        <div style={{
            background: themeStyle == "bright" ? "white" : '#14131c',
            width: '100%', height: '100%', display: 'flex',
            paddingTop: 20,
            paddingRight: 20,
            paddingLeft: 20,
            flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'
        }}>
            <div style={{
                background: themeStyle == "bright" ? "rgba(240,240,240,1)" : null,
                width: '100%', height: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 10,
            }}>
                {/* <select
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
                </select> */}

                {!statusInstall && <div
                    onClick={async () => {
                        // deferredPrompt is a global variable we've been using in the sample to capture the `beforeinstallevent`
                        deferredPrompt.current.prompt();
                        // Find out whether the user confirmed the installation or not
                        const { outcome } = await deferredPrompt.userChoice;
                        // The deferredPrompt can only be used once.
                        deferredPrompt.current = null;
                        // Act on the user's choice
                        if (outcome === 'accepted') {
                            console.log('User accepted the install prompt.');
                        } else if (outcome === 'dismissed') {
                            console.log('User dismissed the install prompt');
                        }
                    }}
                    style={{ width: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 30, borderRadius: 25, background: 'orange' }} >
                    <span style={{
                        color: 'white'
                    }}
                    >
                        install
                    </span>

                </div>}
            </div>
            <div style={{
                width: '100%', borderRadius: 25, paddingTop: 20, paddingBottom: 20,
                //  height: 'calc(50% - 90px)',
                height: !toggleTerminal ? (dimension.height - 200) : (dimension.height - heightTerminal),

                // maxHeight: !toggleTerminal ? '100vh' : '50%',
                background: '#0f0e15', borderRadius: 25, display: 'block'
            }}>
                <CodeMirror
                    style={{
                        width: '100%', borderRadius: 25,
                        //  border: '2px solid #333740',
                        boxShadow: 'none', outline: 'none', height: '100%', fontSize: settings.fontSize
                    }}
                    value={valueState}
                    height="100%"
                    ref={codeMirrorRef}
                    extensions={[javascript({ jsx: true })]}
                    theme={myTheme}
                    // theme={selectTheme == "abcdef" ? abcdef : selectTheme == "okaidia" ? okaidia : selectTheme == "github" ? github : okaidia}
                    onChange={onChange} />
            </div>

            <div style={{ width: '100%', height: 50, position: 'relative', background: themeStyle == "bright" ? 'rgba(240,240,240,1)' : '', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* <div
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
                </div> */}
                <div style={{ display: 'flex', paddingRight: 10, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row', height: '100%', width: '100%', gap: 10 }}>


                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: 10 }}>
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
                    <div
                        //  style={{ position: 'absolute', top: 0, right: 0 }}
                        onClick={() => setToggleTerminal(prev => !prev)}
                    >
                        <BsFillTerminalFill color={!toggleTerminal ? "grey" : themeStyle == "bright" ? "black" : "white"} size={25} />
                    </div>
                    <div className='main-button' style={{
                        width: 50, height: 50,
                        //  background: 'red',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 50,
                        position: 'absolute',
                    }}>

                        <div
                            style={{
                                borderRadius: 50,
                                border: '10px solid #0f0e15'
                            }}
                            // style={{ position: 'absolute',padding:0, margin:0,outline:'none', top: -20, left: 20,width:40,height:40, background:'white',display:'flex', justifyContent:'center', alignItems:'center', borderRadius:50, border:'2px solid black' }}
                            onClick={() => runCode()}>
                            <FaPlayCircle color={themeStyle == "bright" ? "black" : 'white'} size={50} />
                        </div>
                    </div>
                </div>
            </div>
            {
                toggleTerminal &&
                <div style={{
                    display: 'flex',
                    // paddingRight: 20,
                    // paddingLeft: 20,
                    //  background: themeStyle == "bright" ? 'rgba(240,240,240,1)' : 'rgba(10,10,10,1)',
                    width: '100%',
                    // height: '100%',
                    height: heightTerminal - 140,
                    //   height: 'calc(50% - 90px)', 
                    // maxHeight: '50%',
                    justifyContent: 'center', alignItems: 'center',
                    //  position: 'absolute', bottom: 0, left: 0,
                    borderRadius: 25
                }}>
                    <div style={{ width: '100%', paddingLeft: 15, paddingRight: 15, borderRadius: 25, background: themeStyle == "bright" ? 'rgba(240,240,240,1)' : '#0f0e15', height: '100%', dispnterlay: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <div style={{ height: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                            <div style={{ width: 50, display: 'flex', justifyContent: 'center', gap: 10, flexDirection: 'row' }}>
                                <div
                                    //  style={{ position: 'absolute', top: 0, left: 0 }}
                                    onClick={() => setLogsState([])}
                                >
                                    <FaRegTrashAlt color={themeStyle == "bright" ? "black" : "white"} size={20} />
                                </div>

                            </div>
                            <div style={{ height: '100%', width: '100%',
                            
                            display: 'flex', justifyContent: 'center', alignItems: 'center'
                             }}
                                onMouseDown={(e) => setDrag(true)}
                                onMouseMove={(e) => drag && console.log(e.clientY)}
                                onMouseLeave={(e) => drag && console.log(e.clientY)}
                                onTouchStart={(e) => setDrag(true)}
                                onTouchMove={(e) => {
                                    // console.log(e.touches[0].clientY)
                                    setHeightTerminal(dimension.height + 100 + 40 - e.touches[0].clientY)
                                }
                                }
                            >

                                <div style={{ height: 5, width: 100, background: 'white', borderRadius: 25 }}

                                >

                                    {/* {drag && <div
                                    style={{ background: 'red', zIndex: 2, position: 'fixed', left: 0, top: 0, width: '100%', height: '100%' }}></div>} */}
                                </div>
                            </div>
                            <div style={{ width: 50, height: '100%' }}></div>
                        </div>
                        <div style={{
                            width: '100%', padding: 15, borderRadius: 25,
                            // boxShadow:'1px 3px 4px black',
                            // position:'absolute',
                            bottom: 0,
                            left: 0,
                            overflow: 'scroll',
                            boxShadow: 'inset 5px 2px 10px rgba(0,0,0,0.2)',
                            // background: themeStyle == "bright" ? 'rgba(240,240,240,1)' : 'rgba(255,255,255,0.09)', 
                            height: '100%', dispnterlay: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                        }}>
                            {logsState.map((p, i) => {
                                if (p.type == "info") {
                                    return <div key={i} style={{ color: themeStyle == "bright" ? "black" : "white" }}>{p.msg[0]}</div>
                                }
                            })}
                        </div>
                    </div>
                </div>
            }

            <div style={{ width: '100%', background:'#0f0e15',height:80, position: 'absolute', bottom: -10, left: 0 }}>

                <div style={{ width: '100%',height:'100%', display: 'flex',justifyContent:'space-around', alignItems:'center' }}>
                    {/* <div style={{ width: '50%', display: 'flex', flexDirection: 'row', boxShadow: "0px 0px 15px rgba(0,0,0,0.3)", height: 70, background: '#0f0e15', borderTopLeftRadius: 50 }} > */}
                        <div style={{ height: 40,display:'flex', justifyContent:'center', alignItems:'center', width: 30, borderRadius:5, background: 'rgba(255,255,255,0.09)', color:'white' }}>
                            <span >{"{"}</span>
                        </div>
                        <div style={{ height: 40,display:'flex', justifyContent:'center', alignItems:'center', width: 30, borderRadius:5, background: 'rgba(255,255,255,0.09)', color:'white' }}>
                            <span>{"("}</span>
                        </div>
                        <div style={{ height: 40,display:'flex', justifyContent:'center', alignItems:'center', width: 30, borderRadius:5, background: 'rgba(255,255,255,0.09)', color:'white' }}>
                            <span>{"["}</span>
                        </div>
                        <div style={{ height: 40,display:'flex', justifyContent:'center', alignItems:'center', width: 30, borderRadius:5, background: 'rgba(255,255,255,0.09)', color:'white' }}>
                            <span>{";"}</span>
                        </div>
                        <div style={{ height: 40,display:'flex', justifyContent:'center', alignItems:'center', width: 30, borderRadius:5, background: 'rgba(255,255,255,0.09)', color:'white' }}>
                            <span>{"."}</span>
                        </div>
                        <div style={{ height: 40,display:'flex', justifyContent:'center', alignItems:'center', width: 30, borderRadius:5, background: 'rgba(255,255,255,0.09)', color:'white' }}>
                            <span>{'"'}</span>
                        </div>
                        <div style={{ height: 40,display:'flex', justifyContent:'center', alignItems:'center', width: 30, borderRadius:5, background: 'rgba(255,255,255,0.09)', color:'white' }}>
                            <span>{"'"}</span>
                        </div>
                        <div style={{ height: 40,display:'flex', justifyContent:'center', alignItems:'center', width: 30, borderRadius:5, background: 'rgba(255,255,255,0.09)', color:'white' }}>
                            <span>{"`"}</span>
                        </div>
                        <div style={{ height: 40,display:'flex', justifyContent:'center', alignItems:'center', width: 30, borderRadius:5, background: 'rgba(255,255,255,0.09)', color:'white' }}>
                            <span>{"="}</span>
                        </div>
                    {/* </div> */}
                    {/* <div style={{ width: 100, height: 70, background: '', borderEndStartRadius: 50 }}></div> */}
                    {/* <div style={{ width: '50%', boxShadow: "0px 0px 15px rgba(0,0,0,0.3)", height: 70, background: '#0f0e15', borderTopLeftRadius: 50 }} ></div> */}
                </div>
                {/* <svg style={{ filter: 'drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.935))' }} width="100%" height="80px" viewBox="0 0 600 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M346.446 18.5513C339.078 36.9805 321.059 50 300 50C278.941 50 260.922 36.9805 253.554 18.5513C249.659 8.80762 241.493 0 231 0H19C8.50659 0 0 8.50659 0 19V47V81V100H19H581H600V81V47V19C600 8.50659 591.493 0 581 0H369C358.507 0 350.341 8.80762 346.446 18.5513Z" fill="#333740" />
                </svg> */}
            </div>
        </div >
    );
}
export default CodeEditor;