import { action, Action } from "easy-peasy";

export interface IImageModalStore {
  isOpen: boolean;
  url: string;
  openModal: Action<IImageModalStore, { url: string }>;
  closeModal: Action<IImageModalStore>;
}

export const ImageModalStore: IImageModalStore = {
  isOpen: false,
  url: "",
  openModal: action((state, { url }) => {
    state.url = url;
    state.isOpen = true;
  }),
  closeModal: action((state) => {
    state.isOpen = false;
  }),
};
