import { serve } from "https://deno.land/x/esbuild_serve@1.3.0/mod.ts";

const title = new Map(Object.entries({
    "admin": "BBN Admin Panel",
    "hosting": "BBN Hosting",
    "hosting/create": "BBN Hosting",
    "settings": "BBN One - Settings",
    "wallet": "BBN Wallet",
    "music": "BBN Music",
    "music/new-drop": "BBN Music - New Drop",
    "music/edit": "BBN Music - Edit Drop",
    "music/payout": "BBN Music - Payout",
    "p/privacy-policy": "BBN One - Privacy Policy",
    "p/terms-of-use": "BBN One - Terms of Use",
    "p/imprint": "BBN One - Imprint",
    "p/distribution-agreement": "BBN One - Distribution Agreement",
}));

serve({
    port: 6969,
    extraLoaders: {
        ".webp": "file",
        ".jpg": "file"
    },
    assets: {
        "sitemap.xml": "./static/sitemap.xml",
        "robots.txt": "./static/robots.txt",
        "favicon.ico": "./static/favicon.ico",
        "email-header.png": "./static/email-header.png",
        "app.webmanifest": "./static/app.webmanifest",
        "images/icons/icon-72x72.png": "./static/images/icons/icon-72x72.png",
        "images/icons/icon-96x96.png": "./static/images/icons/icon-96x96.png",
        "images/icons/icon-128x128.png": "./static/images/icons/icon-128x128.png",
        "images/icons/icon-144x144.png": "./static/images/icons/icon-144x144.png",
        "images/icons/icon-152x152.png": "./static/images/icons/icon-152x152.png",
        "images/icons/icon-192x192.png": "./static/images/icons/icon-192x192.png",
        "images/icons/icon-384x384.png": "./static/images/icons/icon-384x384.png",
        "images/icons/icon-512x512.png": "./static/images/icons/icon-512x512.png",
        "images/apple.png": "./static/images/apple.png",
    },
    pages: {
        "index": "./pages/holding/index.ts",
        "p/privacy-policy": "./pages/holding/privacyPolicy.ts",
        "p/terms-of-use": "./pages/holding/termsOfUse.ts",
        "p/imprint": "./pages/holding/imprint.ts",
        "p/distribution-agreement": "./pages/holding/distributionAgreement.ts",
        "signin": "./pages/user/signin.ts",
        "callback": "./pages/_legacy/misc/callback.ts",
        "oauth": "./pages/user/oauth.ts",

        "music": "./pages/music/main.ts",
        "music/new-drop": "./pages/_legacy/newDrop.ts",
        "music/edit": "./pages/_legacy/music/edit.ts",
        "music/payout": "./pages/payout/main.ts",

        "hosting": "./pages/hosting/main.ts",
        "hosting/create": "./pages/hosting/views/create.ts",

        "settings": "./pages/user/settings.ts",

        "admin": "./pages/admin/admin.ts",

        "wallet": "./pages/wallet/wallet.ts",
    },
    defaultTemplate: createTemplate,
    poylfills: [
        "./polyfill.ts",
        "./bug-reporter.ts",
        "https://unpkg.com/construct-style-sheets-polyfill@3.1.0",
        "https://unpkg.com/urlpattern-polyfill@8.0.2/"
    ]
});

function createTemplate(name: string, path: string) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <title>${title.get(path) ?? "BBN Holding"}</title>
    <link rel="manifest" href="/app.webmanifest">
    <meta charset='UTF-8'>
    <meta name="description" content="BBN Holding is a US-based holding company with a diverse portfolio of businesses including music and hosting services. BBN Music provides music streaming and hosting services, while BBN Hosting offers Minecraft hosting services.">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name='theme-color' content='black'>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="${title.get(path) ?? "BBN Holding"}">
    <link rel="apple-touch-icon" href="/images/apple.png">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="${name}.css">
    <script>(function (w, d, s, l, i) {
            w[ l ] = w[ l ] || []; w[ l ].push({
                'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
            }); var f = d.getElementsByTagName(s)[ 0 ],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-KMCWNVD');</script>
</head>

<body>
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KMCWNVD" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <script src="${name}.js" type="module"></script>
</body>

</html>
    `.trim();
}