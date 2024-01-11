import { Body, State, Vertical, WebGen } from "webgen/mod.ts";
import '../../assets/css/main.css';
import { DynaNavigation } from "../../components/nav.ts";
import { RegisterAuthRefresh, changeThemeColor, renewAccessTokenIfNeeded, sheetStack } from "../_legacy/helper.ts";
import { state } from "./data.ts";
import { listFiles, liveUpdates, refreshState, startSidecarConnection } from "./loading.ts";
import { hostingMenu } from "./views/menu.ts";

import { LoadingSpinner } from "shared/components.ts";
import { API, stupidErrorAlert } from "shared/restSpec.ts";
import '../../assets/css/hosting.css';
import { path } from "./views/state.ts";
await RegisterAuthRefresh();

const url = new URLSearchParams(location.search);

const urlPath = url.get("path");

WebGen({
    events: {
        themeChanged: changeThemeColor()
    }
});

sheetStack.setDefault(hostingMenu);

Body(Vertical(DynaNavigation("Hosting"), state.$loaded.map(loaded => loaded ? sheetStack : LoadingSpinner()).asRefComponent()));

renewAccessTokenIfNeeded()
    .then(() => refreshState())
    .then(async () => {
        if (urlPath) {
            const [ source, serverId, subView ] = urlPath.split("/");
            if (source === "servers" && serverId) {
                const server = await API.hosting.serverId(serverId).get().then(stupidErrorAlert);
                if (!state.servers.find(s => s._id == serverId))
                    state.servers.push(State(server));
                startSidecarConnection(serverId);
                if (subView === "storage") {
                    await listFiles("/");
                    path.setValue("/");
                }
            }
            hostingMenu.path.setValue(urlPath);
        }
    })
    .then(() => liveUpdates())
    .then(() => state.loaded = true);