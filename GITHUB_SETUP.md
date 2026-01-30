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

---

## Ongoing work: how to push future updates

Whenever you change files in the agency folder and want to save those changes to GitHub:

### Option A: Quick three commands (most of the time)

In PowerShell, from your agency folder:

```powershell
cd "c:\Users\nikalys\Desktop\agency"

git add -A
git commit -m "Brief description of what you changed"
git push
```

- **`git add -A`** — stages every change (new, edited, and deleted files).
- **`git commit -m "..."`** — saves a snapshot with a short message (e.g. `"Update nav bar"` or `"Add Raw Frame gallery buttons"`).
- **`git push`** — uploads your commits to GitHub.

### Option B: Check first, then commit

If you want to see what changed before committing:

```powershell
cd "c:\Users\nikalys\Desktop\agency"

git status          # See which files changed
git add -A          # Stage everything (or use git add path/to/file for one file)
git status          # Confirm what will be committed
git commit -m "Your message"
git push
```

### Option C: Pull before you push (when others edit the repo)

If you ever edit the same repo from another machine or with someone else:

```powershell
cd "c:\Users\nikalys\Desktop\agency"

git pull            # Get latest from GitHub first
# … make your changes …
git add -A
git commit -m "Your message"
git push
```

### Handy commands

| What you want              | Command              |
|----------------------------|----------------------|
| See what’s changed         | `git status`         |
| See commit history         | `git log --oneline`  |
| Undo last commit (keep files) | `git reset --soft HEAD~1` |
| See your remote (GitHub URL) | `git remote -v`    |

You only need to run `git remote add origin ...` and `git push -u origin main` once. After that, **add → commit → push** is your normal workflow.
