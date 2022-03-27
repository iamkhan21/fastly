import React, { FC, ReactElement } from "react";

type Props = {
  icon: string;
  content: ReactElement<any, any>;
};

const InfoSection: FC<Props> = React.memo(({ icon, content }) => (
  <section className="flex items-center space-x-2">
    <figure className="px-2">
      <i className={`icon ${icon} text-3xl`} />
    </figure>
    {content}
  </section>
));

export default InfoSection;
