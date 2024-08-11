import { API } from "shared/mod.ts";
import { asState, Box, Button, CenterV, createFilePicker, Empty, getErrorMessage, Grid, Horizontal, Label, Spacer, Validate } from "webgen/mod.ts";
import { zod } from "webgen/zod.ts";
import { Drop, song } from "../../../spec/music.ts";
import { uploadSongToDrop } from "../../music/data.ts";
import { ManageSongs } from "../../music/views/table.ts";
import { allowedAudioFormats } from "../helper.ts";

export function ChangeSongs(drop: Drop) {
    const state = asState({
        uploadingSongs: <string[]> [],
        validationState: <zod.ZodError | undefined> undefined,
    });

    const { data, error, validate } = Validate(
        asState(drop),
        zod.object({
            songs: song.array().min(1, { message: "At least one song is required" }),
        }),
    );

    return Grid(
        Horizontal(
            Box(
                state.$validationState.map((error) =>
                    error
                        ? CenterV(
                            Label(getErrorMessage(error))
                                .addClass("error-message")
                                .setMargin("0 0.5rem 0 0"),
                        )
                        : Empty()
                ).asRefComponent(),
            ),
            Spacer(),
            Button("Save")
                .onClick(async () => {
                    const validation = validate();
                    if (error.getValue()) return state.validationState = error.getValue();
                    if (validation) await API.music.id(data._id!).update(validation);
                    location.reload(); // Handle this Smarter => Make it a Reload Event.
                }),
        ),
        ManageSongs(data.$songs, state.$uploadingSongs, data.primaryGenre),
        Horizontal(
            Spacer(),
            Button("Add a new Song")
                .onClick(() => createFilePicker(allowedAudioFormats.join(",")).then((file) => uploadSongToDrop(data.$songs, drop.artists, drop.language, drop.primaryGenre, drop.secondaryGenre, state.$uploadingSongs, file))),
        ),
    )
        .setGap("15px")
        .setPadding("15px 0 0 0");
}
