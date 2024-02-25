import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SyntaxzHighlighter = () => {
    const codeString = 'import sklearn';
    return (
      <SyntaxHighlighter language="python" style={docco}>
        {codeString}
      </SyntaxHighlighter>
    );
}

export default SyntaxzHighlighter;