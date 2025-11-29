import { Octokit } from "@octokit/rest";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function deployToGitHub() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error("GITHUB_TOKEN not set");
    process.exit(1);
  }

  const octokit = new Octokit({ auth: token });
  const owner = "royalmewAlt";
  const repo = "sakalla-font-editor";

  try {
    console.log("Getting repository info...");
    const { data: repoData } = await octokit.repos.get({ owner, repo });
    console.log(`✓ Connected to ${repoData.full_name}`);

    // Get the current main branch commit
    const { data: refData } = await octokit.git.getRef({
      owner,
      repo,
      ref: "heads/main",
    });
    console.log(`✓ Current main branch SHA: ${refData.object.sha.substring(0, 7)}`);

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
    console.log(`✓ Found ${files.length} files to deploy`);

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

    console.log(`Creating tree with ${tree.length} files...`);
    const { data: treeData } = await octokit.git.createTree({
      owner,
      repo,
      tree: tree,
      base_tree: refData.object.sha,
    });
    console.log(`✓ Tree created: ${treeData.sha.substring(0, 7)}`);

    // Create commit
    console.log("Creating commit...");
    const { data: commitData } = await octokit.git.createCommit({
      owner,
      repo,
      message: "Deploy Sakalla Font Editor - automated deployment",
      tree: treeData.sha,
      parents: [refData.object.sha],
    });
    console.log(`✓ Commit created: ${commitData.sha.substring(0, 7)}`);

    // Update ref
    console.log("Pushing to main branch...");
    await octokit.git.updateRef({
      owner,
      repo,
      ref: "heads/main",
      sha: commitData.sha,
    });
    console.log(`✓ Main branch updated!`);

    console.log("\n✅ SUCCESS! Your code has been pushed to GitHub!");
    console.log(`📍 Repository: https://github.com/${owner}/${repo}`);
    console.log(`🚀 Render should start deploying automatically...`);
  } catch (error) {
    console.error("Error:", error.message);
    if (error.response?.data) {
      console.error("GitHub API response:", error.response.data);
    }
    process.exit(1);
  }
}

deployToGitHub();
