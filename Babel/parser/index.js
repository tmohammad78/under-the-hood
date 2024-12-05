const generate = require('@babel/generator').default;
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');

const code = `
let fname = 'Mohammad';
let lname = 'Taheri';
const greet = (name) => {
    return 'Hello ' + name;
};
`

const ast = parser.parse(code)
let depth = 0;

traverse(ast, {
    Identifier(path) {
        if(path.isIdentifier({ name: 'fname' })) {
            path.node.name = 'fName'
        }
    },
    VariableDeclaration(path) {
        path.node.declarations.forEach(declaration => {
            if (t.isArrowFunctionExpression(declaration.init)) {
                const arrowFunction = declaration.init;
                const functionDeclaration = t.functionDeclaration(
                    declaration.id,
                    arrowFunction.params,
                    arrowFunction.body,
                    arrowFunction.generator,
                    arrowFunction.async
                );
                path.replaceWith(functionDeclaration);
            }
        });
    },
    enter(path) {
        console.log(`enter ${path.type}(${path.key})`);
        depth++;
      },
      exit(path) {
        depth--;
        console.log(`  exit ${path.type}(${path.key})`);
      },
})

const resultCode = generate(ast).code

console.log(resultCode);