"use client";

import { useTheme } from "next-themes";
import React  from "react";

import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
interface IProps {
  markdown: string;
}
const CodeBlock = ({ markdown }: IProps) => {
  const { theme = 'dark' } = useTheme();

  return (
    <Markdown
      children={markdown}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              PreTag="pre"
              children={String(children).replace(/\n$/, "")}
              language={match[1]}
              style={['dark', 'system'].includes(theme) ? oneDark : oneLight}
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};
export default CodeBlock;
