import * as monaco from "monaco-editor";

export const registerQuetzalLanguage = (monacoInstance: typeof monaco) => {
  // Registrar el lenguaje
  monacoInstance.languages.register({id: "quetzal"});

  // Registrar un proveedor de tokens para el lenguaje
  monacoInstance.languages.setMonarchTokensProvider("quetzal", {
    keywords: [
      'si', 'sino', 'sino si', 'selecciona', 'caso', 'defecto', 'para', 'mientras',
      'hacer', 'romper', 'continuar', 'retornar', 'funcion', 'clase', 'estructura',
      'enum', 'importar', 'exportar', 'publico', 'privado', 'protegido', 'estatico',
      'const', 'var', 'de', 'como', 'nuevo', 'esto', 'base', 'abstracto', 'sobreescribir',
      'virtual', 'interfaz', 'implementa', 'espacio_nombres', 'usando', 'nulo', 'consola',
      'imprimir', 'ambiente'
    ],

    types: [
      // num
      'entero', 'número', 'numero', 'doble', 'decimal',
      // texto
      'caracter', 'texto', 'largo', 'corto', 'byte',
      //logico
      'logico', 'booleano',
      // otros
      'lista', 'diccionario', 'tupla', 'rango', 'fecha', 'hora', 'vacio', 'objeto', 'dinamico', 'auto', 'log'
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
        [/[{}()[\]]/, '@brackets'],
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
        [/[^/*]+/, 'comment'],
        [/\/\*/, 'comment', '@push'],
        ["\\*/", 'comment', '@pop'],
        [/[/*]/, 'comment']
      ],
    }
  });

  // Registrar un proveedor de elementos de completado
  monacoInstance.languages.registerCompletionItemProvider("quetzal", {
    provideCompletionItems: (model, position) => {
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
          kind: monacoInstance.languages.CompletionItemKind.Keyword,
          documentation: 'Declaración condicional',
          insertText: 'si (${1:condición}) {\n\t${2:// código}\n}',
          insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range
        },
        {
          label: 'sino si',
          kind: monacoInstance.languages.CompletionItemKind.Keyword,
          documentation: 'Condición else-if',
          insertText: 'sino si (${1:condición}) {\n\t${2:// código}\n}',
          insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range
        },
        {
          label: 'sino',
          kind: monacoInstance.languages.CompletionItemKind.Keyword,
          documentation: 'Condición else',
          insertText: 'sino {\n\t${1:// código}\n}',
          insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range
        },
        {
          label: 'para',
          kind: monacoInstance.languages.CompletionItemKind.Keyword,
          documentation: 'Bucle for',
          insertText: 'para (${1:inicialización}; ${2:condición}; ${3:incremento}) {\n\t${4:// código}\n}',
          insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range
        },
        {
          label: 'mientras',
          kind: monacoInstance.languages.CompletionItemKind.Keyword,
          documentation: 'Bucle while',
          insertText: 'mientras (${1:condición}) {\n\t${2:// código}\n}',
          insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range
        },

        // Tipos de datos
        {
          label: 'entero',
          kind: monacoInstance.languages.CompletionItemKind.TypeParameter,
          documentation: 'Tipo de dato entero',
          insertText: 'entero ',
          range: range
        },
        {
          label: 'numero',
          kind: monacoInstance.languages.CompletionItemKind.TypeParameter,
          documentation: 'Tipo de dato número decimal',
          insertText: 'numero',
          range: range
        },
        {
          label: 'texto',
          kind: monacoInstance.languages.CompletionItemKind.TypeParameter,
          documentation: 'Tipo de dato texto',
          insertText: 'texto ',
          range: range
        },
        {
          label: 'logico',
          kind: monacoInstance.languages.CompletionItemKind.TypeParameter,
          documentation: 'Tipo de dato booleano',
          insertText: 'logico ',
          range: range
        },

        // Funciones
        {
          label: 'funcion',
          kind: monacoInstance.languages.CompletionItemKind.Keyword,
          documentation: 'Definir una función',
          insertText: 'funcion ${1:nombre}(${2:parámetros}) {\n\t${3:// código}\n\tretornar ${4:valor}\n}',
          insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range
        },

        // Valores
        {
          label: 'verdadero',
          kind: monacoInstance.languages.CompletionItemKind.Value,
          documentation: 'Valor booleano verdadero',
          insertText: 'verdadero',
          range: range
        },
        {
          label: 'falso',
          kind: monacoInstance.languages.CompletionItemKind.Value,
          documentation: 'Valor booleano falso',
          insertText: 'falso',
          range: range
        },

        // Consola
        {
          label: 'consola.mostrar',
          kind: monacoInstance.languages.CompletionItemKind.Function,
          documentation: 'Escribir en consola',
          insertText: 'consola.mostrar(${1:mensaje})',
          insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range
        },
        {
          label: 'consola.mostrar_exito',
          kind: monacoInstance.languages.CompletionItemKind.Function,
          documentation: 'Escribir línea en consola, con exito',
          insertText: 'consola.mostrar_exito(${1:mensaje})',
          insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range
        },
        {
          label: 'imprimir',
          kind: monacoInstance.languages.CompletionItemKind.Function,
          documentation: 'Imprime una línea en consola',
          insertText: 'imprimir(${1:mensaje})',
          insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range
        }
      ];

      return {suggestions: suggestions};
    }
  });

  // Definir un tema personalizado (opcional)
  monacoInstance.editor.defineTheme('quetzal', {
    base: 'hc-black',
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
    // Quetal custom colors
    colors: {
      // 'editor.background': '#0d1117',
      'editor.foreground': '#e6edf3',
      'editor.lineHighlightBackground': '#161b22',
      'editor.selectionBackground': '#1c6b48',
      'editor.inactiveSelectionBackground': '#163a2a',
      'editorIndentGuide.background': '#21262d',
      'editorIndentGuide.activeBackground': '#30363d',
    }
  });
};

export const setupQuetzalValidation = (monacoInstance: typeof monaco) => {
  monacoInstance.editor.onDidCreateModel((model) => {
    model.onDidChangeContent(() => {
      validateQuetzalSyntax(model, monacoInstance);
    });
  });
};

// Función de validación personalizada para Quetzal
const validateQuetzalSyntax = (model: monaco.editor.ITextModel, monacoInstance: typeof monaco) => {
  const value = model.getValue();
  const markers: monaco.editor.IMarkerData[] = [];

  // Detectar clases/objetos para excluir sus miembros de ciertas validaciones
  const classRanges: { start: number; end: number }[] = [];
  const classRegex = /objeto\s+(\w+)\s*\{/g;
  let classMatch;

  while ((classMatch = classRegex.exec(value))) {
    const start = classMatch.index;
    let braceCount = 1;
    let end = value.length;

    for (let i = start + classMatch[0].length; i < value.length; i++) {
      if (value[i] === '{') braceCount++;
      if (value[i] === '}') {
        braceCount--;
        if (braceCount === 0) {
          end = i;
          break;
        }
      }
    }

    classRanges.push({ start, end });
  }

  const isInsideClass = (index: number) => {
    return classRanges.some(range => index >= range.start && index <= range.end);
  };

  // --- REGLA 1: "si" debe ir seguido de paréntesis ---
  const regexIf = /\bsi\b(?!\s*\()/g;
  let match;
  while ((match = regexIf.exec(value))) {
    const pos = model.getPositionAt(match.index);
    markers.push({
      severity: monaco.MarkerSeverity.Error,
      message: "La palabra reservada 'si' debe ir seguida de una condición entre paréntesis",
      startLineNumber: pos.lineNumber,
      startColumn: pos.column,
      endLineNumber: pos.lineNumber,
      endColumn: pos.column + 2
    });
  }

  // --- REGLA 2: Balanceo de llaves ---
  const stack: number[] = [];
  for (let i = 0; i < value.length; i++) {
    if (value[i] === "{") stack.push(i);
    if (value[i] === "}") {
      if (stack.length === 0) {
        const pos = model.getPositionAt(i);
        markers.push({
          severity: monaco.MarkerSeverity.Error,
          message: "Llave de cierre '}' sin apertura",
          startLineNumber: pos.lineNumber,
          startColumn: pos.column,
          endLineNumber: pos.lineNumber,
          endColumn: pos.column + 1
        });
      } else {
        stack.pop();
      }
    }
  }
  // Si quedaron llaves abiertas
  for (const i of stack) {
    const pos = model.getPositionAt(i);
    markers.push({
      severity: monaco.MarkerSeverity.Error,
      message: "Llave de apertura '{' sin cierre",
      startLineNumber: pos.lineNumber,
      startColumn: pos.column,
      endLineNumber: pos.lineNumber,
      endColumn: pos.column + 1
    });
  }

  // --- REGLA 3: "mientras" debe ir seguido de paréntesis ---
  const regexWhile = /\bmientras\b(?!\s*\()/g;
  while ((match = regexWhile.exec(value))) {
    const pos = model.getPositionAt(match.index);
    markers.push({
      severity: monaco.MarkerSeverity.Error,
      message: "La palabra reservada 'mientras' debe ir seguida de una condición entre paréntesis",
      startLineNumber: pos.lineNumber,
      startColumn: pos.column,
      endLineNumber: pos.lineNumber,
      endColumn: pos.column + 8
    });
  }

  // --- REGLA 4: Validar funciones (ambos formatos) ---
  // Formato 1: "funcion nombre(...)" - debe tener paréntesis
  const regexFunction1 = /\bfuncion\s+(?!\w+\s*\()/g;
  while ((match = regexFunction1.exec(value))) {
    const pos = model.getPositionAt(match.index);
    markers.push({
      severity: monaco.MarkerSeverity.Error,
      message: "La palabra reservada 'funcion' debe ir seguida de un nombre y parámetros entre paréntesis",
      startLineNumber: pos.lineNumber,
      startColumn: pos.column,
      endLineNumber: pos.lineNumber,
      endColumn: pos.column + 7
    });
  }

  // --- REGLA 5: Validar estructura de "si-sino" ---
  const lines = value.split('\n');
  let inIfBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Detectar inicio de bloque si
    if (line.startsWith('si (')) {
      inIfBlock = true;
    }

    // Detectar "sino" fuera de bloque si
    if (line.startsWith('sino') && !inIfBlock) {
      const pos = model.getPositionAt(value.indexOf(line));
      markers.push({
        severity: monaco.MarkerSeverity.Error,
        message: "'sino' debe estar precedido por un bloque 'si'",
        startLineNumber: i + 1,
        startColumn: pos.column,
        endLineNumber: i + 1,
        endColumn: pos.column + 4
      });
    }

    // Detectar fin de bloque si
    if (line === '}' && inIfBlock) {
      const remainingText = value.substring(model.getOffsetAt({lineNumber: i + 1, column: 1}));
      const nextNonEmptyLine = remainingText.split('\n').find(l => l.trim().length > 0);

      if (nextNonEmptyLine && nextNonEmptyLine.trim().startsWith('sino')) {
        inIfBlock = false;
      } else {
        inIfBlock = false;
      }
    }
  }

  // --- REGLA 6: Validar que "retornar" solo aparezca dentro de funciones ---
  // Detectar funciones (ambos formatos) y métodos de clases
  const functionRegex = /\b(?:funcion\s+(\w+)|(entero|decimal|cadena|booleano|texto|vacio)\s+(\w+))\s*\([^)]*\)\s*\{/g;
  const functionPositions: { start: number, end: number }[] = [];
  let funcMatch;

  while ((funcMatch = functionRegex.exec(value))) {
    const functionStart = funcMatch.index;
    let braceCount = 1; // Ya tenemos la llave de apertura de la función
    let functionEnd = value.length;

    for (let i = functionStart + funcMatch[0].length; i < value.length; i++) {
      if (value[i] === '{') braceCount++;
      if (value[i] === '}') {
        braceCount--;
        if (braceCount === 0) {
          functionEnd = i;
          break;
        }
      }
    }

    functionPositions.push({ start: functionStart, end: functionEnd });
  }

  // Detectar constructores y métodos dentro de clases
  const classMethodRegex = /\b(?:entero|decimal|cadena|booleano|texto|vacio)\s+(\w+)\s*\([^)]*\)\s*\{/g;
  while ((funcMatch = classMethodRegex.exec(value))) {
    // Verificar si estamos dentro de una clase
    const classStart = value.lastIndexOf('objeto', funcMatch.index);
    if (classStart !== -1) {
      const classEnd = value.indexOf('}', classStart);
      if (classEnd > funcMatch.index) {
        const functionStart = funcMatch.index;
        let braceCount = 1;
        let functionEnd = value.length;

        for (let i = functionStart + funcMatch[0].length; i < value.length; i++) {
          if (value[i] === '{') braceCount++;
          if (value[i] === '}') {
            braceCount--;
            if (braceCount === 0) {
              functionEnd = i;
              break;
            }
          }
        }

        functionPositions.push({ start: functionStart, end: functionEnd });
      }
    }
  }

  // Validar retornar dentro de funciones
  const regexReturn = /\bretornar\b/g;
  while ((match = regexReturn.exec(value))) {
    const isInFunction = functionPositions.some(fp =>
      match!.index >= fp.start && match!.index <= fp.end
    );

    if (!isInFunction) {
      const pos = model.getPositionAt(match.index);
      markers.push({
        severity: monaco.MarkerSeverity.Error,
        message: "'retornar' solo puede usarse dentro de una función o método",
        startLineNumber: pos.lineNumber,
        startColumn: pos.column,
        endLineNumber: pos.lineNumber,
        endColumn: pos.column + 8
      });
    }
  }

  // --- REGLA 7: Validar estructura básica de declaraciones ---
  const regexInvalidDeclarations = /(?:^|\s)(entero|decimal|cadena|booleano|texto)\s+(?!\w+\s*=)/g;
  while ((match = regexInvalidDeclarations.exec(value))) {
    // Excluir declaraciones dentro de clases y parámetros de funciones
    const line = value.substring(match.index, value.indexOf('\n', match.index));

    // No marcar si está dentro de una clase o es un parámetro de función
    if (isInsideClass(match.index) ||
      (line.includes('(') && !line.includes('=')) ||
      line.trim().endsWith(')')) {
      continue;
    }

    // Excluir declaraciones que son parte de una función (parámetros)
    if (line.includes('(') && !line.includes('{')) {
      continue;
    }

    const pos = model.getPositionAt(match.index + (match[1] ? match[0].indexOf(match[1]) : 1));
    markers.push({
      severity: monaco.MarkerSeverity.Warning,
      message: `Declaración de variable '${match[1]}' sin asignación inicial`,
      startLineNumber: pos.lineNumber,
      startColumn: pos.column,
      endLineNumber: pos.lineNumber,
      endColumn: pos.column + match[1].length
    });
  }

  // --- REGLA 8: Validar paréntesis balanceados ---
  const parenStack: number[] = [];
  for (let i = 0; i < value.length; i++) {
    if (value[i] === '(') parenStack.push(i);
    if (value[i] === ')') {
      if (parenStack.length === 0) {
        const pos = model.getPositionAt(i);
        markers.push({
          severity: monaco.MarkerSeverity.Error,
          message: "Paréntesis de cierre ')' sin apertura",
          startLineNumber: pos.lineNumber,
          startColumn: pos.column,
          endLineNumber: pos.lineNumber,
          endColumn: pos.column + 1
        });
      } else {
        parenStack.pop();
      }
    }
  }
  // Si quedaron paréntesis abiertos
  for (const i of parenStack) {
    const pos = model.getPositionAt(i);
    markers.push({
      severity: monaco.MarkerSeverity.Error,
      message: "Paréntesis de apertura '(' sin cierre",
      startLineNumber: pos.lineNumber,
      startColumn: pos.column,
      endLineNumber: pos.lineNumber,
      endColumn: pos.column + 1
    });
  }

  // --- REGLA 9: Validar sintaxis de declaración de variables ---
  const regexVariableDeclaration = /\b(entero|decimal|cadena|booleano|texto)\s+(\w+)\s*=\s*(.+?)(?=;|\n|$)/g;
  while ((match = regexVariableDeclaration.exec(value))) {
    const type = match[1];
    const varName = match[2];
    const assignment = match[3].trim();

    // Validar que el nombre de variable sea válido
    if (!/^[a-zA-Z_]\w*$/.test(varName)) {
      const pos = model.getPositionAt(match.index + match[1].length + 1);
      markers.push({
        severity: monaco.MarkerSeverity.Error,
        message: `Nombre de variable '${varName}' inválido. Debe comenzar con letra o _`,
        startLineNumber: pos.lineNumber,
        startColumn: pos.column,
        endLineNumber: pos.lineNumber,
        endColumn: pos.column + varName.length
      });
    }

    // Validar tipos básicos (permitir nulo y expresiones complejas)
    if (type === 'entero' && !/^-?\d+$/.test(assignment) && !/^(nulo|\w+)$/.test(assignment) && !assignment.includes('+') && !assignment.includes('-') && !assignment.includes('*') && !assignment.includes('/')) {
      const pos = model.getPositionAt(match.index + match[0].indexOf(assignment));
      markers.push({
        severity: monaco.MarkerSeverity.Warning,
        message: `Asignación '${assignment}' puede no ser compatible con tipo 'entero'`,
        startLineNumber: pos.lineNumber,
        startColumn: pos.column,
        endLineNumber: pos.lineNumber,
        endColumn: pos.column + assignment.length
      });
    }

    if (type === 'decimal' && !/^-?\d*\.?\d+$/.test(assignment) && !/^(nulo|\w+)$/.test(assignment) && !assignment.includes('+') && !assignment.includes('-') && !assignment.includes('*') && !assignment.includes('/')) {
      const pos = model.getPositionAt(match.index + match[0].indexOf(assignment));
      markers.push({
        severity: monaco.MarkerSeverity.Warning,
        message: `Asignación '${assignment}' puede no ser compatible con tipo 'decimal'`,
        startLineNumber: pos.lineNumber,
        startColumn: pos.column,
        endLineNumber: pos.lineNumber,
        endColumn: pos.column + assignment.length
      });
    }

    if (type === 'booleano' && !/^(verdadero|falso|nulo|\w+)$/.test(assignment)) {
      const pos = model.getPositionAt(match.index + match[0].indexOf(assignment));
      markers.push({
        severity: monaco.MarkerSeverity.Warning,
        message: `Asignación '${assignment}' puede no ser compatible con tipo 'booleano'`,
        startLineNumber: pos.lineNumber,
        startColumn: pos.column,
        endLineNumber: pos.lineNumber,
        endColumn: pos.column + assignment.length
      });
    }

    if (type === 'texto' && !/^".*"$/.test(assignment) && !/^(nulo|\w+)$/.test(assignment) && !assignment.includes('+')) {
      const pos = model.getPositionAt(match.index + match[0].indexOf(assignment));
      markers.push({
        severity: monaco.MarkerSeverity.Warning,
        message: `Asignación '${assignment}' puede no ser compatible con tipo 'texto'`,
        startLineNumber: pos.lineNumber,
        startColumn: pos.column,
        endLineNumber: pos.lineNumber,
        endColumn: pos.column + assignment.length
      });
    }
  }

  // --- REGLA 10: Validar variables mutables (mut) ---
  const regexMutableDeclaration = /\bmut\s+(\w+)\s*=\s*(.+?)(?=;|\n|$)/g;
  while ((match = regexMutableDeclaration.exec(value))) {
    const varName = match[1];
    const assignment = match[2].trim();

    // Validar nombre de variable mutable
    if (!/^[a-zA-Z_]\w*$/.test(varName)) {
      const pos = model.getPositionAt(match.index + 4);
      markers.push({
        severity: monaco.MarkerSeverity.Error,
        message: `Nombre de variable mutable '${varName}' inválido`,
        startLineNumber: pos.lineNumber,
        startColumn: pos.column,
        endLineNumber: pos.lineNumber,
        endColumn: pos.column + varName.length
      });
    }

    // Validar que la asignación no esté vacía
    if (!assignment || assignment === '') {
      const pos = model.getPositionAt(match.index + match[0].length - 1);
      markers.push({
        severity: monaco.MarkerSeverity.Error,
        message: `Variable mutable '${varName}' debe tener una asignación inicial`,
        startLineNumber: pos.lineNumber,
        startColumn: pos.column,
        endLineNumber: pos.lineNumber,
        endColumn: pos.column + 1
      });
    }
  }

  // --- REGLA 11: Validar reasignación de variables mutables ---
  const regexReassignment = /^\s*(\w+)\s*=\s*(.+?)\s*;/gm;
  const declaredVariables = new Set<string>();
  const mutableVariables = new Set<string>();

  // Primera pasada: recolectar variables declaradas (excluyendo parámetros de funciones y miembros de clase)
  const linesWithVars = value.split('\n');
  for (let i = 0; i < linesWithVars.length; i++) {
    const line = linesWithVars[i].trim();
    const lineStart = model.getOffsetAt({ lineNumber: i + 1, column: 1 });

    // Detectar declaraciones de variables tipadas (no en parámetros de funciones)
    const typedVarMatch = line.match(/^\s*(entero|decimal|cadena|booleano|texto)\s+(\w+)\s*=/);
    if (typedVarMatch && !line.includes('(') && !isInsideClass(lineStart)) {
      declaredVariables.add(typedVarMatch[2]);
    }

    // Detectar variables mutables (no dentro de clases)
    const mutableVarMatch = line.match(/^\s*mut\s+(\w+)/);
    if (mutableVarMatch && !isInsideClass(lineStart)) {
      declaredVariables.add(mutableVarMatch[1]);
      mutableVariables.add(mutableVarMatch[1]);
    }
  }

  // Segunda pasada: validar reasignaciones
  while ((match = regexReassignment.exec(value))) {
    const varName = match[1];
    const assignment = match[2];

    // Ignorar asignaciones dentro de clases (como ambiente.nombre) y parámetros
    if (varName.includes('.') || isInsideClass(match.index)) {
      continue;
    }

    // Validar que la variable haya sido declarada
    if (!declaredVariables.has(varName)) {
      const pos = model.getPositionAt(match.index);
      markers.push({
        severity: monaco.MarkerSeverity.Error,
        message: `Variable '${varName}' no ha sido declarada`,
        startLineNumber: pos.lineNumber,
        startColumn: pos.column,
        endLineNumber: pos.lineNumber,
        endColumn: pos.column + varName.length
      });
    }

    // Validar que solo variables mutables puedan ser reasignadas
    if (declaredVariables.has(varName) && !mutableVariables.has(varName)) {
      const pos = model.getPositionAt(match.index);
      markers.push({
        severity: monaco.MarkerSeverity.Error,
        message: `Variable '${varName}' no es mutable. Use 'mut' para declarar variables reasignables`,
        startLineNumber: pos.lineNumber,
        startColumn: pos.column,
        endLineNumber: pos.lineNumber,
        endColumn: pos.column + varName.length
      });
    }

    // Validar que la reasignación no esté vacía
    if (!assignment.trim()) {
      const pos = model.getPositionAt(match.index + match[1].length + 1);
      markers.push({
        severity: monaco.MarkerSeverity.Error,
        message: `Reasignación de '${varName}' no puede estar vacía`,
        startLineNumber: pos.lineNumber,
        startColumn: pos.column,
        endLineNumber: pos.lineNumber,
        endColumn: pos.column + 1
      });
    }
  }

  // --- REGLA 12: Validar que no haya variables duplicadas ---
  const variableDeclarations = new Map<string, number>();
  const regexAllDeclarations = /\b(?:entero|decimal|cadena|booleano|texto|mut)\s+(\w+)/g;

  while ((match = regexAllDeclarations.exec(value))) {
    const varName = match[1];

    // Excluir parámetros de funciones y miembros de clase
    const line = value.substring(match.index, value.indexOf('\n', match.index));
    if ((line.includes('(') && !line.includes('=')) || isInsideClass(match.index)) {
      continue;
    }

    if (variableDeclarations.has(varName)) {
      const currentPos = model.getPositionAt(match.index + match[0].indexOf(varName));
      const previousLine = variableDeclarations.get(varName);

      markers.push({
        severity: monaco.MarkerSeverity.Error,
        message: `Variable '${varName}' ya fue declarada anteriormente (línea ${previousLine})`,
        startLineNumber: currentPos.lineNumber,
        startColumn: currentPos.column,
        endLineNumber: currentPos.lineNumber,
        endColumn: currentPos.column + varName.length
      });
    } else {
      const pos = model.getPositionAt(match.index + match[0].indexOf(varName));
      variableDeclarations.set(varName, pos.lineNumber);
    }
  }

  monacoInstance.editor.setModelMarkers(model, "quetzal", markers);
};