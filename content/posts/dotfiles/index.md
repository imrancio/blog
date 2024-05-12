---
title: 'dotfiles'
date: 2024-05-06
description: 'A guide on how to track your linux configuration .dotfiles on GitHub'
tags: ['automation', 'config', 'GitHub', 'linux', 'software', 'workflow']
---

> This post is adapted from an Atlassian [tutorial](https://www.atlassian.com/git/tutorials/dotfiles)

As you work in the Linux ecosystem across multiple devices, you may notice a repetitive process emerge. This is the process of setting up your new machine with similar setup as your previous machine. This might include your preferred shell setup and various app configurations you're used to having.

There are many tools available to automate this repetitive setup process, like Ansible playbooks comes to mind. However, I'd like to focus on a much simpler method that is repeatable across devices with same / similar Linux OS distributions.

This method involves tracking various user-level configuration files that are usually stored under your local `~/` directory as hidden .dotfiles, for example your `~/.zshrc` or `~/.bashrc`, on `git`. Once the desired config files are tracked in GitHub, setting up a new machine with the same config is a simple command.

## Initial setup

> **Info:** Replace `.zshrc` with `.bashrc` depending on your preferred shell.

You can start tracking your configuration files with the following:

```bash
git init --bare $HOME/.cfg
alias cfg='/usr/bin/git --git-dir=$HOME/.cfg/ --work-tree=$HOME'
cfg config --local status.showUntrackedFiles no
echo "alias cfg='/usr/bin/git --git-dir=$HOME/.cfg/ --work-tree=$HOME'" >> $HOME/.zshrc
```

- The first line creates a folder `~/.cfg` which is a [Git bare repository](https://www.saintsjd.com/2011/01/what-is-a-bare-git-repository/) that will track our files.
- Then we create an alias `cfg` which we will use instead of the regular `git` when we want to interact with our configuration repository.
- We set a flag - local to the repository - to hide files we are not explicitly tracking yet. This is so that when you type `cfg status` and other commands later, files you are not interested in tracking will not show up as `untracked`.
- Also you can add the alias definition by hand to your `.zshrc` or use the the fourth line provided for convenience.

You may now start committing your preferred dotfiles configs to GitHub like so:

```bash
cfg status
cfg add .zshrc
cfg commit -m "Add zshrc"
cfg push
```

If the `cfg push` command fails, link your bare repo files to a blank public GitHub repo you control:

```bash
cfg remote add origin https://github.com/imrancio/.cfg.git
```

## Restore setup (on new machine)

> Replace https://github.com/imrancio/.cfg.git with your public GitHub dotfiles repo URL

To restore your preferred config files on a new machine, simply follow steps from `~` directory:

```bash
git clone --bare https://github.com/imrancio/.cfg.git $HOME/.cfg
function cfg {
   /usr/bin/git --git-dir=$HOME/.cfg/ --work-tree=$HOME $@
}
mkdir -p .cfg-backup
cfg checkout
if [ $? = 0 ]; then
  echo "Checked out cfg.";
  else
    echo "Backing up pre-existing dot files.";
    cfg checkout 2>&1 | egrep "\s+\." | awk {'print $1'} | xargs -I{} mv {} .cfg-backup/{}
fi;
cfg checkout
cfg config status.showUntrackedFiles no
```

I have simplified the above steps with the following `bash` script:

```shell
curl -s https://cdn.imranc.io/static/cfg/clone | bash
# OR wget -qO- https://cdn.imranc.io/static/cfg/clone | bash
```
