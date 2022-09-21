import { createStore, action } from "easy-peasy";
import { Action, createTypedHooks } from "easy-peasy";
import { SongWithArtistList } from "../components/SongTable";

export type ActiveSongsModel = {
  activeSongs: SongWithArtistList;
  activeSong: SongWithArtistList[0] | null;
  playing: boolean;
  changePlaying: Action<ActiveSongsModel, boolean>;
  changeActiveSongs: Action<ActiveSongsModel, SongWithArtistList>;
  changeActiveSong: Action<ActiveSongsModel, SongWithArtistList[0]>;
};

const typedHooks = createTypedHooks<ActiveSongsModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export const store = createStore<ActiveSongsModel>({
  activeSongs: [],
  activeSong: null,
  playing: false,
  changePlaying: action((state: any, payload) => {
    state.playing = payload;
  }),
  changeActiveSongs: action((state: any, payload) => {
    state.activeSongs = payload;
  }),
  changeActiveSong: action((state: any, payload) => {
    state.activeSong = payload;
  }),
});
