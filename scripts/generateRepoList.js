require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const util = require('util');

const GITHUB_USERNAME = "sxn4y";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  throw new Error("GITHUB_TOKEN not found in .env.local");
}

async function fetchRepos() {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to fetch: ${error}`);
  }

  return await res.json();
}

async function generateFile() {
  const repos = await fetchRepos();
  const filePath = path.resolve("lib/repoList.ts");

  const reposString = util.inspect(repos, { depth: null, compact: false });

  const fileContent = `// hehe do not edit
import { rList } from "@/types/github";

export const repoList: rList[] = ${reposString};
`;

  fs.writeFileSync(filePath, fileContent, "utf-8");
  console.log(`✅ repoList.ts generated with ${repos.length} repos.`);
}

generateFile().catch((err) => {
  console.error("❌ Error generating repo list:", err);
  process.exit(1);
});