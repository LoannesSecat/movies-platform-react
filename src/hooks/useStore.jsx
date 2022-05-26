import store from "../store";

const useStore = ({ reducer, value }) => {
  if (value === undefined) {
    return store.getState()[reducer];
  }

  return store.getState()[reducer][value];
};

export default useStore;
