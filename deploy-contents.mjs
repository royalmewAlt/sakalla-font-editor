import { Octokit } from "@octokit/rest";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function deployViaContents() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error("GITHUB_TOKEN not set");
    process.exit(1);
  }

  const octokit = new Octokit({ auth: token });
  const owner = "royalmewAlt";
  const repo = "sakalla-font-editor";

  try {
    console.log("Deploying using GitHub Contents API...");
    
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
    console.log(`Found ${files.length} files to deploy`);

    let deployed = 0;
    for (const file of files) {
      try {
        const content = fs.readFileSync(file.fullPath, "utf-8");
        const message = `Add ${file.path}`;

        await octokit.repos.createOrUpdateFileContents({
          owner,
          repo,
          path: file.path,
          message: message,
          content: Buffer.from(content).toString("base64"),
        });
        
        deployed++;
        if (deployed % 10 === 0) {
          console.log(`✓ Deployed ${deployed}/${files.length} files...`);
        }
      } catch (err) {
        console.error(`Failed to deploy ${file.path}: ${err.message}`);
      }
    }

    console.log(`\n✅ Deployed ${deployed} files to GitHub!`);
    console.log(`📍 Repository: https://github.com/${owner}/${repo}`);
    console.log(`🚀 Render should start deploying automatically...`);
  } catch (error) {
    console.error("Error:", error.message);
    if (error.response?.data) {
      console.error("Details:", error.response.data);
    }
    process.exit(1);
  }
}

deployViaContents();
