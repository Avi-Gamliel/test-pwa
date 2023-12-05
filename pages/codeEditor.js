import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
// import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
function CodeEditor() {
  const [value, setValue] = React.useState("console.log('hello world!');");
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setValue(val);
  }, []);
  return <CodeMirror 
  style={{width:'100%', height:'100vh'}}
  value={value} height="200px"
//    extensions={[javascript({ jsx: true 
theme={okaidia}
    onChange={onChange} />;
}
export default CodeEditor;