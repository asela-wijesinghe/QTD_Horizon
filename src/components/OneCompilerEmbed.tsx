import React, { useEffect } from 'react';

const OneCompilerEmbed = () => {
  useEffect(() => {
    // Function to handle messages from the iframe
    const handleMessage = (event) => {
      if (event.data && event.data.eventType === 'codeRunResult') {
        console.log('Execution Result:', event.data);
        // Handle the execution result as needed
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <iframe
      id="onecompiler-embed"
      src="https://onecompiler.com/embed/python?listenToEvents=true&hideLanguageSelection=true&hideNew=true&hideNewFileOption=true&hideTitle=true&theme=dark&hideRun=true"
      frameBorder="0"
      width="100%"
      height="450px"
      title="OneCompiler Python Editor"
     
    ></iframe>
  );
};

export default OneCompilerEmbed;
