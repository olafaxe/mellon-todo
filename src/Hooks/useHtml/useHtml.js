import React from "react";

export const useHtml = async (url, method, body) => {
  let response = await fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" } // *GET, POST, PUT, DELETE, etc.
  });
  let data = await response.json();
  if (method === "GET") {
    return [...data];
  } else if (method === "POST") {
    return data;
  }
};
