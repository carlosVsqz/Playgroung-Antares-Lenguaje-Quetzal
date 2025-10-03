export const registerQuetzalLanguage = (monaco: any) => {
  // Registrar el lenguaje
  monaco.languages.register({id: "quetzal"});

  // Registrar un proveedor de tokens para el lenguaje
  monaco.languages.setMonarchTokensProvider("quetzal", {
    keywords: [
      'si', 'sino', 'sino si', 'selecciona', 'caso', 'defecto', 'para', 'mientras',
      'hacer', 'romper', 'continuar', 'retornar', 'funcion', 'clase', 'estructura',
      'enum', 'importar', 'exportar', 'publico', 'privado', 'protegido', 'estatico',
      'const', 'var', 'de', 'como', 'nuevo', 'esto', 'base', 'abstracto', 'sobreescribir',
      'virtual', 'interfaz', 'implementa', 'espacio_nombres', 'usando', 'nulo', 'consola'
    ],

    types: [
      'entero', 'largo', 'corto', 'byte', 'n&uacute;mero', 'numero' ,'doble', 'decimal', 'texto',
      'caracter', 'logico', 'booleano', 'lista', 'diccionario', 'tupla', 'rango',
      'fecha', 'hora', 'vacio', 'objeto', 'dinamico', 'auto', 'log'
    ],

    constants: [
      'verdadero', 'falso', 'nulo'
    ],

    operators: [
      '=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=', '&&', '||',
      '++', '--', '+', '-', '*', '/', '&', '|', '^', '%', '<<', '>>', '>>>',
      '+=', '-=', '*=', '/=', '&=', '|=', '^=', '%=', '<<=', '>>=', '>>>=',
      'y', 'o', 'no'
    ],

    tokenizer: {
      root: [
        // Palabras clave
        [
          /[a-zA-Z_$][\w$]*/,
          {
            cases: {
              '@keywords': 'keyword',
              '@types': 'type',
              '@constants': 'constant',
              '@operators': 'operator',
              '@default': 'identifier'
            }
          }
        ],

        // Números
        [/\d+/, 'number'],
        [/\d+\.\d+/, 'number'],

        // Strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'],
        [/"/, 'string', '@string_double'],
        [/'([^'\\]|\\.)*$/, 'string.invalid'],
        [/'/, 'string', '@string_single'],

        // Comentarios
        [/\/\/.*$/, 'comment'],
        [/\/\*/, 'comment', '@comment'],

        // Delimitadores
        [/[{}()\[\]]/, '@brackets'],
        [/[;,.]/, 'delimiter'],
      ],

      string_double: [
        [/[^\\"]+/, 'string'],
        [/\\./, 'string.escape'],
        [/"/, 'string', '@pop']
      ],

      string_single: [
        [/[^\\']+/, 'string'],
        [/\\./, 'string.escape'],
        [/'/, 'string', '@pop']
      ],

      comment: [
        [/[^\/*]+/, 'comment'],
        [/\/\*/, 'comment', '@push'],
        ["\\*/", 'comment', '@pop'],
        [/[\/*]/, 'comment']
      ],
    }
  });

  // Registrar un proveedor de elementos de completado
  monaco.languages.registerCompletionItemProvider("quetzal", {
    provideCompletionItems: (model: any, position: any) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };

      const suggestions = [
        // Estructuras de control
        {
          label: 'si',
          kind: monaco.languages.CompletionItemKind.Keyword,
          documentation: 'Declaración condicional',
          insertText: 'si (${1:condición}) {\n\t${2:// código}\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range
        },
        {
          label: 'sino si',
          kind: monaco.languages.CompletionItemKind.Keyword,
          documentation: 'Condición else-if',
          insertText: 'sino si (${1:condición}) {\n\t${2:// código}\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range
        },
        {
          label: 'sino',
          kind: monaco.languages.CompletionItemKind.Keyword,
          documentation: 'Condición else',
          insertText: 'sino {\n\t${1:// código}\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range
        },
        {
          label: 'para',
          kind: monaco.languages.CompletionItemKind.Keyword,
          documentation: 'Bucle for',
          insertText: 'para (${1:inicialización}; ${2:condición}; ${3:incremento}) {\n\t${4:// código}\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range
        },
        {
          label: 'mientras',
          kind: monaco.languages.CompletionItemKind.Keyword,
          documentation: 'Bucle while',
          insertText: 'mientras (${1:condición}) {\n\t${2:// código}\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range
        },

        // Tipos de datos
        {
          label: 'entero',
          kind: monaco.languages.CompletionItemKind.TypeParameter,
          documentation: 'Tipo de dato entero',
          insertText: 'entero ',
          range: range
        },
        {
          label: 'numero',
          kind: monaco.languages.CompletionItemKind.TypeParameter,
          documentation: 'Tipo de dato número decimal',
          insertText: 'número',
          range: range
        },
        {
          label: 'texto',
          kind: monaco.languages.CompletionItemKind.TypeParameter,
          documentation: 'Tipo de dato texto',
          insertText: 'texto ',
          range: range
        },
        {
          label: 'logico',
          kind: monaco.languages.CompletionItemKind.TypeParameter,
          documentation: 'Tipo de dato booleano',
          insertText: 'logico ',
          range: range
        },

        // Funciones
        {
          label: 'funcion',
          kind: monaco.languages.CompletionItemKind.Keyword,
          documentation: 'Definir una función',
          insertText: 'funcion ${1:nombre}(${2:parámetros}) {\n\t${3:// código}\n\tretornar ${4:valor}\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range
        },

        // Valores
        {
          label: 'verdadero',
          kind: monaco.languages.CompletionItemKind.Value,
          documentation: 'Valor booleano verdadero',
          insertText: 'verdadero',
          range: range
        },
        {
          label: 'falso',
          kind: monaco.languages.CompletionItemKind.Value,
          documentation: 'Valor booleano falso',
          insertText: 'falso',
          range: range
        },

        // Consola
        {
          label: 'consola.mostrar',
          kind: monaco.languages.CompletionItemKind.Function,
          documentation: 'Escribir en consola',
          insertText: 'consola.mostrar(${1:mensaje})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range
        },
        {
          label: 'consola.mostrar_exito',
          kind: monaco.languages.CompletionItemKind.Function,
          documentation: 'Escribir línea en consola, con exito',
          insertText: 'consola.mostrar_exito(${1:mensaje})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range
        }
      ];

      return {suggestions: suggestions};
    }
  });

  // Definir un tema personalizado (opcional)
  monaco.editor.defineTheme('quetzal', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      {token: 'keyword', foreground: 'C586C0'},
      {token: 'type', foreground: '4EC9B0'},
      {token: 'constant', foreground: '569CD6'},
      {token: 'operator', foreground: 'D4D4D4'},
      {token: 'number', foreground: 'B5CEA8'},
      {token: 'string', foreground: 'CE9178'},
      {token: 'comment', foreground: '6A9955'},
      {token: 'delimiter', foreground: 'D4D4D4'},
    ],
    // colors: {
    //   'editor.background': '#0d1117',
    //   'editor.foreground': '#e6edf3',
    //   'editor.lineHighlightBackground': '#161b22',
    //   'editor.selectionBackground': '#1c6b48',
    //   'editor.inactiveSelectionBackground': '#163a2a',
    //   'editorIndentGuide.background': '#21262d',
    //   'editorIndentGuide.activeBackground': '#30363d',
    // }
  });
};