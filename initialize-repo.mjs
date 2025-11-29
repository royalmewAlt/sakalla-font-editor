import { Octokit } from "@octokit/rest";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function initializeRepo() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error("GITHUB_TOKEN not set");
    process.exit(1);
  }

  const octokit = new Octokit({ auth: token });
  const owner = "royalmewAlt";
  const repo = "sakalla-font-editor";

  try {
    console.log("Initializing GitHub repository...");
    
    // Collect all files
    const excludeDirs = [".git", "node_modules", ".cache", ".output", "dist", ".next"];
    function collectFiles(dir, baseDir = "") {
      const files = [];
      const items = fs.readdirSync(dir);

      for (const item of items) {
        if (item.startsWith(".") && item !== ".gitignore") continue;
        if (excludeDirs.includes(item)) continue;

        const fullPath = path.join(dir, item);
        const relPath = baseDir ? `${baseDir}/${item}` : item;
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          files.push(...collectFiles(fullPath, relPath));
        } else {
          files.push({ path: relPath, fullPath });
        }
      }
      return files;
    }

    const files = collectFiles(".");
    console.log(`Found ${files.length} files`);

    // Create tree entries
    const tree = [];
    for (const file of files) {
      const content = fs.readFileSync(file.fullPath, "utf-8");
      tree.push({
        path: file.path,
        mode: "100644",
        type: "blob",
        content: content,
      });
    }

    console.log(`Creating initial commit with ${tree.length} files...`);
    
    // Create tree
    const { data: treeData } = await octokit.git.createTree({
      owner,
      repo,
      tree: tree,
    });
    console.log(`✓ Tree created: ${treeData.sha.substring(0, 7)}`);

    // Create initial commit
    const { data: commitData } = await octokit.git.createCommit({
      owner,
      repo,
      message: "Initial commit - Sakalla Font Editor",
      tree: treeData.sha,
    });
    console.log(`✓ Commit created: ${commitData.sha.substring(0, 7)}`);

    // Create main ref
    console.log("Creating main branch...");
    await octokit.git.createRef({
      owner,
      repo,
      ref: "refs/heads/main",
      sha: commitData.sha,
    });
    console.log(`✓ Main branch created!`);

    console.log("\n✅ Repository initialized and code pushed!");
    console.log(`📍 Repository: https://github.com/${owner}/${repo}`);
    console.log(`🚀 Render should start deploying automatically in a few moments...`);
  } catch (error) {
    console.error("Error:", error.message);
    if (error.response?.data) {
      console.error("Details:", error.response.data);
    }
    process.exit(1);
  }
}

initializeRepo();
