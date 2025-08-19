import React from "react";

/**
 * 文字列の改行コード(\n)を <br /> に変換して表示する汎用関数
 */
export function renderWithLineBreaks(text: string) {
  return text.split("\n").map((line, idx) => (
    <span key={idx}>
      {line}
  const lines = text.split("\n");
  return lines.map((line, idx) => (
    <span key={idx}>
      {line}
      {idx < lines.length - 1 && <br />}
    </span>
  ));
}
