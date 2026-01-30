# Put this project on GitHub

## 1. Create a new repo on GitHub

1. Go to [github.com](https://github.com) and sign in.
2. Click the **+** (top right) → **New repository**.
3. Choose a name (e.g. `agency` or `vaire-digital`).
4. Leave it **empty**: do **not** check "Add a README" or ".gitignore".
5. Click **Create repository**.

## 2. In your project folder (PowerShell)

Open PowerShell, go to your project, then run:

```powershell
cd "c:\Users\nikalys\Desktop\agency"

# Stage everything (including new/untracked files)
git add -A

# First commit
git commit -m "Initial commit: agency site and portfolio"

# Add GitHub as remote (replace YOUR_USERNAME and YOUR_REPO with your GitHub username and repo name)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push (main branch; use master if your branch is master)
git branch -M main
git push -u origin main
```

If your branch is already called `master` and you want to keep it:

```powershell
git push -u origin master
```

## 3. If GitHub asks you to sign in

- **HTTPS:** Use a [Personal Access Token](https://github.com/settings/tokens) as the password (not your GitHub password).
- **SSH:** If you use SSH keys, add the remote like this instead:
  ```powershell
  git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO.git
  ```

## 4. After the first push

- Your code will be at: `https://github.com/YOUR_USERNAME/YOUR_REPO`
- For later changes: `git add -A`, `git commit -m "Your message"`, `git push`.
