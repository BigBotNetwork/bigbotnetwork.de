import { CenterV, Grid, Icon, MediaQuery, PlainText, Spacer } from "webgen/mod.ts";

export function Entry(text: string, subtext?: string, action?: () => void) {
    return MediaQuery("(max-width: 520px)", (small) =>
        Grid(
            CenterV(
                PlainText(text)
                    .setFont(small ? 1.3 : 1.5, 700),
                ...subtext ? [
                    Spacer(),
                    PlainText(subtext)
                        .setFont(small ? .8 : 1, 700)
                        .addClass("subtitle")
                ] : []
            )
                .addClass("meta-data"),
            action ? CenterV(Icon("arrow_forward_ios")) : Spacer()
        )
            .setRawColumns("auto max-content")
            .onClick((() => { action?.(); }))
            .setPadding(small ? "10px 18px" : "18px 24px")
            .addClass("list-entry", action ? "action" : "no-actions", "limited-width")
    );
}
