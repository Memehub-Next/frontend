import { createStore, createTypedHooks } from "easy-peasy";
import { IImageModalStore, ImageModalStore } from "./imageModal.store";

interface IGlobalStore {
  imageModal: IImageModalStore;
}

export const GlobalStore = createStore<IGlobalStore>({
  imageModal: ImageModalStore,
});

const typedHooks = createTypedHooks<IGlobalStore>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
