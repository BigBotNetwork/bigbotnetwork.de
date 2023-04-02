import { Box, Button, ButtonStyle, Color, Horizontal, Icon, PlainText, Spacer, Vertical } from "webgen/mod.ts";

export type Link = {
    title: string;
    onclick: () => Promise<void> | void;
};

export function ActionBar(title: string,
    categories?: { title: string, selected: boolean, onclick: () => void, hide?: boolean; }[],
    action?: Link,
    history?: Link[]) {
    return Horizontal(
        Vertical(
            Horizontal(
                ...(history ?? []).map(x =>
                    Box(
                        PlainText(x.title)
                            .setFont(2.260625, 700),
                        Icon("arrow_forward_ios")
                    ).addClass("history-entry").onClick(x.onclick)
                ),
                PlainText(title)
                    .setFont(2.260625, 700),
                Spacer()
            ).setMargin("0 0 18px"),
            categories && categories.length != 0 ?
                Horizontal(
                    ...categories.map(x =>
                        !x.hide ? Button(x.title)
                            .setColor(Color.Colored)
                            .addClass("tag")
                            .setStyle(x.selected ? ButtonStyle.Normal : ButtonStyle.Secondary)
                            .onClick(x.onclick) : null
                    ),
                    Spacer()
                ).setGap("10px") : null,
            PlainText("")
                .addClass("error-message", "hidden-message")
                .setId("error-message-area")
        ),
        Spacer(),
        action ?
            Vertical(
                Spacer(),
                Button(action.title)
                    .onPromiseClick(async () => { await action.onclick(); }),
                Spacer()
            ) : null,
    )
        .setPadding("5rem 0 0 0")
        .addClass("action-bar")
        .addClass("limited-width");
}