import React, { FC } from "react";
import { useStore } from "effector-react";
import style from "./style.module.pcss";
import { loadJobDetailsFx } from "@application/jobs";

interface Props {
  loadData: (...data: any) => any;
  loader?: "default" | "rectangle";
}

const DefaultLoader = () => <span>Loading...</span>;
const RectangleLoader = () => (
  <span className={`inline-block min-w-12rem rounded ${style.rectangle}`} />
);

const loaders = {
  default: DefaultLoader,
  rectangle: RectangleLoader,
};

const InfoLoader: FC<Props> = ({ loadData, loader = "rectangle" }) => {
  const isLoading = useStore(loadJobDetailsFx.pending);
  const Loader = loaders[loader];
  return loadData() ?? (isLoading && <Loader />);
};

export default React.memo(InfoLoader);
