import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineFile, AiOutlineFolder } from "react-icons/ai";
import { DiJavascript1, DiCss3Full, DiHtml5, DiReact } from "react-icons/di";
import CodeEditor from "./CodeEditor";
import "../static/styles.css";
import UseLocalStorage from "./UseLocalStorage";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5, faCss3, faJs } from "@fortawesome/free-brands-svg-icons";
import SaveCode from "./SaveCode";
const FILE_ICONS = {
  js: <DiJavascript1 />,
  css: <DiCss3Full />,
  html: <DiHtml5 />,
  jsx: <DiReact />,
};
const StyledTree = styled.div`
  line-height: 2;
`;
const StyledFile = styled.div`
  padding-left: 20px;
  display: flex;
  align-items: center;
  span {
    margin-left: 5px;
  }
`;
const StyledFolder = styled.div`
  padding-left: 20px;

  .folder--label {
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }
`;
const Collapsible = styled.div`
  height: ${(p) => (p.isOpen ? "0" : "auto")};
  overflow: hidden;
`;

const File = ({ name }) => {
  let ext = name.split(".")[1];

  return (
    <StyledFile>
      {/* render the extension or fallback to generic file icon  */}
      {FILE_ICONS[ext] || <AiOutlineFile />}
      <span className="ankers">{name}</span>
    </StyledFile>
  );
};
const Folder = ({ name, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <StyledFolder>
      <div className="folder--label" onClick={handleToggle}>
        <AiOutlineFolder />
        <span className="ankers">{name}</span>
      </div>
      <Collapsible isOpen={isOpen}>{children}</Collapsible>
    </StyledFolder>
  );
};
const Tree = ({ children }) => {
  return <StyledTree>{children}</StyledTree>;
};

Tree.File = File;
Tree.Folder = Folder;

function FileExplorer() {
  const [mode, setMode] = useState("");
  const [html, setHtml] = UseLocalStorage("html", "");
  const [css, setCss] = UseLocalStorage("css", "");
  const [js, setJs] = UseLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(
        `
            <html>
              <body>${html}</body>
              <style>${css}</style>
              <script>${js}</script>
            </html>
         `
      );
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  let comp;
  let name;
  let subtile;
  if (mode === "html") {
    comp = <CodeEditor language="xml" value={html} onChange={setHtml} />;
    name = "index.html";
    subtile = (
      <div className="col-2 subtile">
        <FontAwesomeIcon icon={faHtml5} /> {name}
      </div>
    );
  } else if (mode === "css") {
    comp = <CodeEditor language="css" value={css} onChange={setCss} />;
    name = "index.css";
    subtile = (
      <div className="col-2 subtile">
        <FontAwesomeIcon icon={faCss3} /> {name}
      </div>
    );
  } else {
    comp = <CodeEditor language="javascript" value={js} onChange={setJs} />;
    name = "index.js";
    subtile = (
      <div className="col-2 subtile">
        <FontAwesomeIcon icon={faJs} /> {name}
      </div>
    );
  }

  return (
    <div className="container-main">
      <div className="row">
        <div className="explorer col-2">Explorer</div>
        <div className="col-10 header">
          <div className="row editor-header">
            {subtile}
            <SaveCode />
          </div>
        </div>
      </div>
      <div className="row resizable" draggable="true">
        <div className="App col-2 row-custom">
          <Tree>
            <Tree.Folder name="src">
              <Tree.Folder name="Styles">
                <a onClick={() => setMode("css")}>
                  <Tree.File name="index.css" />
                </a>
              </Tree.Folder>
              <Tree.Folder name="Scripts">
                <a onClick={() => setMode("js")}>
                  <Tree.File name="index.js" />
                </a>
              </Tree.Folder>
              <Tree.Folder name="Views">
                <a onClick={() => setMode("html")}>
                  <Tree.File name="index.html" />
                </a>
              </Tree.Folder>
            </Tree.Folder>
            <Tree.File name="package.json" />
          </Tree>
        </div>
        <div className="col-10 margin-left">{comp}</div>
      </div>
      <div className="row live-view">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}
export default FileExplorer;
