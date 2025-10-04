import {loader} from "@monaco-editor/react";

loader.config({
  "vs/nls": {
    availableLanguages: {
      "*": "es"
    }
  }
});

export default loader;