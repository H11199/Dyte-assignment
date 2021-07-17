import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as ControlledEditor } from "react-codemirror2";
import "../static/styles.css";
export default function CodeEditor(props) {
  const { language, value, onChange } = props;
  function handleChange(editor, data, value) {
    onChange(value);
  }
  return (
    <div>
      <div className="ace_editor">
        <ControlledEditor
          onBeforeChange={handleChange}
          value={value}
          options={{
            lineWrapping: true,
            lint: true,
            mode: language,
            theme: "material",
            lineNumbers: true,
          }}
        />
      </div>
    </div>
  );
}
