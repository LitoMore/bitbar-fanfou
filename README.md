<img src="https://raw.githubusercontent.com/LitoMore/bitbar-fanfou/master/media/icon.svg?sanitize=true" align="right" />

# bitbar-fanfou

[![](https://badges.greenkeeper.io/LitoMore/bitbar-fanfou.svg)](https://greenkeeper.io)
[![](https://img.shields.io/travis/LitoMore/bitbar-fanfou/master.svg)](https://travis-ci.org/LitoMore/bitbar-fanfou)
[![](https://img.shields.io/github/license/LitoMore/bitbar-fanfou.svg)](https://github.com/LitoMore/bitbar-fanfou/blob/master/LICENSE)
[![](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

A Fanfou `/account/notification` tool with [BitBar](https://github.com/matryer/bitbar)

<div align="center"><img width="33%" height="33%" src="https://raw.githubusercontent.com/LitoMore/bitbar-fanfou/master/media/screenshot.png" /></div>

## Usage

1. Clone this repo

```bash
$ git clone git@github.com:LitoMore/bitbar-fanfou.git
```

2. Create your config file

```bash
$ cd bitbar-fanfou
$ cp config/settings.json.example config/settings.json
```

3. Link to your BitBar plugin path

```bash
$ ln -s "$PWD/app.js" /path/to/bitbar-fanfou.10s.js
```

---

<a href="https://www.patreon.com/LitoMore">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

### Settings

- `consumerKey`: Your consumer key
- `consumerSecret`: Your consumer secret
- `username`: Your Fanfou username
- `password`: Your Fanfou password
- `https`: Use HTTPS secure connection, default to `true`
- `rateLimitStatus`: Display rate limit status, default to `true`
- `notification`: Use macOS built-in notification, default to `false`

## Related

- [bitbar](https://github.com/matryer/bitbar) - Put the output from any script or program in your Mac OS X Menu Bar
- [fanfou-sdk](https://github.com/LitoMore/fanfou-sdk-node) - Fanfou SDK for Node.js

## License

MIT © [LitoMore](https://github.com/LitoMore)
